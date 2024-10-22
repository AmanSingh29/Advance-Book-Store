import React from "react";
import Animation from "./Animation";
import BookLoad from "../assets/loaders/bookLoader.json";

const BookLoader = ({
  fullPage = false,
  text = "Finding your next great read...",
}) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        fullPage ? "h-[100vh] w-[100vw]" : "h-full w-full"
      }`}
    >
      <div className="w-[25%] sm:w-[10%]">
        <Animation bg={BookLoad} />
      </div>
      <p className="text-center text-navy font-bold text-sm md:text-lg lg:text-xl">
        {text}
      </p>
    </div>
  );
};

export default BookLoader;
