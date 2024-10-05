import React from "react";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import HamburgerIcon from "../assets/icons/Hamburger.svg";

const NavBar = () => {
  return (
    <div className="flex content-center lg:justify-around justify-between px-4 lg:px-0 w-[100vw] bg-navy py-3 text-white">
      <div>BookNest</div>
      <div className="w-96 lg:block hidden">
        <SearchBar />
      </div>
      <div className="md:flex hidden lg:w-1/3 xl:w-1/4 w-1/2 justify-between font-semibold">
        <Link to={"/"} className="cursor-pointer">
          <li className="list-none">HOME</li>
        </Link>
        <li className="cursor-pointer list-none">CATEGORIES</li>
        <Link to={"/about"} className="cursor-pointer">
          <li className="list-none">ABOUT</li>
        </Link>
        <Link to={"/contact"} className="cursor-pointer">
          <li className="list-none">CONTACT</li>
        </Link>
      </div>
      <div className="md:hidden block">
        <img className="h-7 w-7" src={HamburgerIcon}></img>
      </div>
    </div>
  );
};

export default NavBar;
