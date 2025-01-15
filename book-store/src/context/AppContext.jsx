import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import Toast from "../components/Toast";
import useApi from "../hooks/useApi";
import { USER_PATH } from "../constants/endpoints";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { api } = useApi();
  const [toasts, setToasts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState({});

  const showToast = (type, message, duration = 3000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, message, duration }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, duration);
  };

  const addToCart = (item) =>
    setCart((prev) => {
      const newData = { ...prev, ...item };
      updateCartDataInLocalStorage(newData);
      return newData;
    });

  const removeFromCart = (itemId) =>
    setCart((prev) => {
      const newData = { ...prev };
      delete newData[itemId];
      updateCartDataInLocalStorage(newData);
      return newData;
    });

  const clearCart = () => {
    setCart({});
    updateCartDataInLocalStorage({});
  };

  const setUserData = useCallback(async () => {
    const localStorateToken = localStorage.getItem("token");
    if (!localStorateToken) return;
    setToken(localStorateToken);
    const response = await api.get(USER_PATH);
    if (response.data && response.data.success) setUser(response.data.user);
  }, []);

  const setCartData = useCallback(async () => {
    const localStorateCart = localStorage.getItem("cart");
    if (!localStorateCart) return;
    setCart(JSON.parse(localStorateCart));
  }, []);

  const updateCartDataInLocalStorage = useCallback((newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
  }, []);

  useEffect(() => {
    setUserData();
    setCartData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showToast,
        user,
        setUser,
        token,
        setToken,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
      <div className="fixed top-5 right-5 space-y-4 z-50">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            type={toast.type}
            message={toast.message}
            duration={toast.duration}
          />
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
