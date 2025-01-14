import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { HamburgerIcon } from "../assets";

const NavBar = () => {
  return (
    <div className="flex content-center lg:justify-around justify-between px-4 lg:px-0 w-full bg-navy py-3 text-white">
      <Link to={"/"}>
        <div>BookNest</div>
      </Link>
      <div className="w-96 lg:block hidden">
        <SearchBar />
      </div>
      <div className="md:flex hidden lg:w-1/3 xl:w-1/4 w-1/2 justify-between font-semibold">
        <li className="cursor-pointer list-none">Categories</li>
        <Link to={"/login"} className="cursor-pointer">
          <li className="list-none">My Account</li>
        </Link>
        <Link to={"/contact"} className="cursor-pointer">
          <li className="list-none">Cart</li>
        </Link>
      </div>
      <div className="md:hidden block">
        <HamburgerIcon className={"h-7 w-7"} />
      </div>
    </div>
  );
};

export default NavBar;
