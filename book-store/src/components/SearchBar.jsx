import React, { useCallback, useEffect, useState } from "react";
import { SearchIcon } from "../assets";
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
    [searchSuggestation, textInput]
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
  }, [textInput, fetchSuggestion]);

  return (
    <div className="w-full relative flex">
      <input
        className="outline-none px-2 py-1 w-11/12 text-black rounded-sm"
        type="text"
        placeholder="Search by title, author or genre.."
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      />
      <div className="w-1/12 bg-transparent border cursor-pointer border-l-white flex justify-center items-center">
        <SearchIcon className="h-5 w-5" />
      </div>
      {searchSuggestation?.length > 0 && (
        <div className="absolute z-20 top-full w-full border bg-white border-gray-600 border-t-0 rounded-sm max-h-[70vh] overflow-y-auto">
          {searchSuggestation?.map((suggestion, index) => (
            <p
              key={index}
              className="px-2 py-2 text-black cursor-pointer border-b border-gray-400 hover:bg-gray-200"
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
