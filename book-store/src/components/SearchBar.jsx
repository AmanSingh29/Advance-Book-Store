import React, { useState } from "react";
import { SearchIcon } from "../assets";

const SearchBar = () => {
  const testArray = [];
  const [searchSuggestation, setSearchSuggestation] = useState(testArray);

  return (
    <div className="w-full relative flex">
      <input
        className="outline-none px-2 py-1 w-11/12 text-black rounded-sm"
        type="text"
        placeholder="Search by title, author or genre.."
      />
      <div className="w-1/12 bg-transparent border cursor-pointer border-l-white flex justify-center items-center">
        <SearchIcon className="h-5 w-5" />
      </div>
      {searchSuggestation?.length > 0 && (
        <div className="absolute top-full w-full border bg-white border-gray-600 border-t-0 rounded-sm max-h-[70vh] overflow-y-auto">
          {searchSuggestation?.map((suggestion, index) => (
            <p
              key={index}
              className="px-2 py-2 text-black cursor-pointer border-b border-gray-400 hover:bg-gray-200"
            >
              {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
