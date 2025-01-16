import React, { useMemo, useCallback, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { TrashIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import NavBar from "../components/NavBar";
import useApi from "../hooks/useApi";
import { BOOKS_PATH, USER_PATH } from "../constants/endpoints";
import AddressPopup from "../components/AddressPopup";

const Cart = () => {
  const { removeFromCart, cart, addToCart, user, setUser } = useAppContext();
  const { api } = useApi();
  const [cartItems, setCartItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.is_on_discount
        ? item.price - (item.price * item.discount) / 100
        : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const getCount = useCallback(
    (bid) => {
      return cart[bid] || 0;
    },
    [cart]
  );

  const handleRemoveItem = useCallback((id) => {
    removeFromCart(id);
    setCartItems((prev) => prev.filter((book) => book.bid !== id));
  }, []);

  const handleQuantityChange = useCallback(
    (id, increment = true) => {
      let count = getCount(id);
      if (count === 0 && !increment) return;
      count = increment ? count + 1 : count - 1;
      addToCart({ [id]: count });
    },
    [cart]
  );

  const getBooks = useCallback(async () => {
    let bids = { ...cart };
    bids = Object.keys(bids);
    if (!bids?.length) {
      const items = localStorage.getItem("cart") || {};
      bids = JSON.parse(items);
      bids = Object.keys(bids);
    }
    const response = await api.post(`${BOOKS_PATH}/list`, { bids });
    if (response.data) setCartItems(response.data);
  }, [cart]);

  useEffect(() => {
    getBooks();
  }, []);

  const handleProceedToCheckout = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSaveAddresses = async (updatedAddresses) => {
    if (!updatedAddresses) return;
    const userAddress = user?.address || [];
    if (!userAddress?.includes(updatedAddresses)) {
      await api.patch(USER_PATH, {
        address: [...userAddress, updatedAddresses],
      });
      setUser((prev) => ({
        ...prev,
        address: [...userAddress, updatedAddresses],
      }));
    }
    setShowPopup(false);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="col-span-2">
              {cartItems?.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between border-b py-4"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1 px-4">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-gray-500">{item.author}</p>
                    <p className="text-gray-700 font-bold">
                      ₹
                      {item.is_on_discount
                        ? item.price - (item.price * item.discount) / 100
                        : item.price}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.bid, false)}
                      className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
                    >
                      <MinusIcon className="h-5 w-5 text-gray-700" />
                    </button>
                    <span className="font-semibold">{getCount(item?.bid)}</span>
                    <button
                      onClick={() => handleQuantityChange(item.bid, true)}
                      className="bg-gray-200 p-2 rounded-md hover:bg-gray-300"
                    >
                      <PlusIcon className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.bid)}
                    className="bg-red-500 p-2 rounded-md hover:bg-red-600"
                  >
                    <TrashIcon className="h-5 w-5 text-white" />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-gray-100 p-6 rounded-md shadow-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold">₹{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600">Shipping</p>
                <p className="font-semibold">Free</p>
              </div>
              <div className="flex justify-between border-t pt-4">
                <p className="font-bold text-lg">Total</p>
                <p className="font-bold text-lg">₹{totalPrice.toFixed(2)}</p>
              </div>
              <button
                onClick={handleProceedToCheckout}
                className="bg-navy text-white w-full py-3 mt-6 rounded-md hover:bg-blue-800 transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      {showPopup && (
        <AddressPopup
          addresses={user?.address || []}
          onClose={handleClosePopup}
          onSave={handleSaveAddresses}
        />
      )}
    </>
  );
};

export default Cart;
