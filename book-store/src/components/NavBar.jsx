import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import SearchBar from "./SearchBar";
import {
  UserIcon,
  ShoppingCartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const NavBar = () => {
  const { user, cart } = useAppContext();
  const navigate = useNavigate();

  const handleAccountClick = () => {
    if (!user) {
      navigate("/login?path=dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  const cartItems = useMemo(() => {
    return Object.keys(cart)?.length;
  }, [cart]);

  return (
    <div className="bg-navy text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold tracking-wide">
          BookNest
        </Link>

        {/* Search Bar (hidden on small screens) */}
        <div className="hidden lg:block w-1/3">
          <SearchBar />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <div
            className="flex items-center space-x-2 cursor-pointer hover:text-gray-300"
            onClick={handleAccountClick}
          >
            <UserIcon className="h-6 w-6" />
            <span>{user ? user.name : "My Account"}</span>
          </div>
          <Link to="/cart" className="relative hover:text-gray-300">
            <ShoppingCartIcon className="h-6 w-6" />
            {cartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                {cartItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Bars3Icon className="h-6 w-6 cursor-pointer" />
        </div>
      </div>

      {/* Mobile Search Bar */}
      <div className="block lg:hidden mt-4">
        <SearchBar />
      </div>
    </div>
  );
};

export default NavBar;
