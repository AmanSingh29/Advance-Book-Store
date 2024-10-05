import React from "react";

const SearchBar = () => {
  const testArray = [
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
    "Test Book",
  ];

  return (
    <div className="w-full bg-red-400 relative">
      <input
        className="outline-none px-2 py-1 w-11/12 text-black rounded-sm"
        type="text"
        placeholder="Search by title, author or genre.."
      />
      <div className="absolute top-full w-full border bg-white border-gray-600 border-t-0 rounded-sm max-h-[70vh] overflow-y-auto">
        {testArray.map((suggestion, index) => (
          <p
            key={index}
            className="px-2 py-2 text-black cursor-pointer border-b border-gray-400 hover:bg-gray-200"
          >
            {suggestion}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
