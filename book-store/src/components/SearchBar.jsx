import React, { useCallback, useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"; // Using Heroicons
import useApi from "../hooks/useApi";
import { SUGGESTION_PATH } from "../constants/endpoints";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchSuggestation, setSearchSuggestation] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const { api } = useApi();

  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (bid) => {
      navigate(`/book-details/${bid}`);
    },
    [navigate]
  );

  const fetchSuggestion = useCallback(async () => {
    if (textInput?.length > 2) {
      const params = {
        search_text: textInput,
      };
      const response = await api.get(SUGGESTION_PATH, { params });
      if (response?.data) setSearchSuggestation(response.data.suggestions);
    } else {
      setSearchSuggestation([]);
    }
  }, [textInput]);

  useEffect(() => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const newTimeout = setTimeout(() => {
      fetchSuggestion();
    }, 300);
    setDebounceTimeout(newTimeout);
    return () => clearTimeout(newTimeout);
  }, [textInput]);

  const handleSearch = useCallback(() => {
    setSearchSuggestation([]);
    navigate(`/explore/?search_text=${textInput}`);
  }, [textInput, navigate]);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 border border-gray-300 rounded-full shadow-sm">
        <input
          type="text"
          placeholder="Search books by title, author, or genre..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="flex-1 px-4 py-2 text-sm text-gray-800 bg-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="p-2 text-blue-500 hover:text-blue-600"
        >
          <MagnifyingGlassIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Suggestion Dropdown */}
      {searchSuggestation?.length > 0 && (
        <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-2 max-h-60 overflow-y-auto z-50">
          {searchSuggestation.map((suggestion, index) => (
            <p
              key={index}
              className="px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-blue-100"
              onClick={() => handleNavigate(suggestion?.bid)}
            >
              {suggestion?.title}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
