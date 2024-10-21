import React from "react";

const BookLoader = ({ fullPage = false }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        fullPage ? "h-screen w-screen" : "h-full w-full"
      }`}
    >
      <div className="relative w-20 h-30 md:w-24 md:h-36 lg:w-32 lg:h-48">
        {/* Main Book Body */}
        <div className="absolute inset-0 w-full h-full bg-navy animate-flip-book rounded-md shadow-lg shadow-blue-500"></div>

        {/* Flipping Pages */}
        <div className="absolute inset-0 w-full h-full bg-white transform rotateY-0 origin-right animate-flip-book delay-100 shadow-inner shadow-gray-400"></div>
        <div className="absolute inset-0 w-full h-full bg-gray-100 transform rotateY-180 origin-right animate-flip-book delay-200 shadow-inner shadow-gray-300"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-4 text-center text-navy font-bold animate-text-blink text-sm md:text-lg lg:text-xl">
        Finding your next great read...
      </p>
    </div>
  );
};

export default BookLoader;
