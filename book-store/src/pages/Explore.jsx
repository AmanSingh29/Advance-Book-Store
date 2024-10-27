import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import BookLoader from "../components/BookLoader";
import useApi from "../hooks/useApi";
import { SearchIcon } from "../assets";
import { BOOKS_PATH } from "../constants/endpoints";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useLocation } from "react-router-dom";
import CommonDropdown from "../components/CommonDropdown";
import {
  BOOK_LANGUAGE_OPTIONS,
  GENRE_OPTIONS,
  SORT_BY_DROPDOWN,
  SortValueAndOrder,
} from "../constants";
import CheckboxFilter from "../components/CheckboxFilter";
import ToggleButton from "../components/ToggleFilter";

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [books, setBooks] = useState({});
  const [pages, setPages] = useState([]);
  const [filter, setFilter] = useState({
    page: 1,
    sort_by: "publish_date",
    sort_order: "descending",
    genre: "",
    language: "",
    is_on_discount: false,
    // in_stock: false,
  });
  const { api, loading } = useApi();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const search_text = useMemo(() => {
    return queryParams.get("search_text") || "";
  }, [queryParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchData = useCallback(async () => {
    try {
      const params = { ...filter, search_text };
      const response = await api.get(BOOKS_PATH, { params });
      if (response.data) {
        setBooks(response.data);
        const count = response.data.count;
        const pageLength = count % 10 === 0 ? count / 10 : count / 10 + 1;
        const arr = Array.from({ length: pageLength }, (_, i) => i + 1);
        setPages(arr);
      }
    } catch (error) {
      console.log("Error in getting books data", error);
    }
  }, [pages, filter, queryParams]);

  useEffect(() => {
    fetchData();
  }, [filter, search_text]);

  const handlePageChange = useCallback(
    (page) => {
      if (page === filter?.page) return;
      setFilter((prev) => ({ ...prev, page }));
    },
    [filter?.page]
  );

  const handleSortChange = useCallback(
    (val) => {
      const value = SortValueAndOrder[val];
      setFilter((prev) => ({ ...prev, ...value }));
    },
    [filter?.sort_by, filter?.sort_order]
  );

  const handleGenreChange = useCallback(
    (value) => {
      const val = value?.join(",");
      setFilter((prev) => ({ ...prev, genre: val }));
    },
    [filter?.genre]
  );

  const handleLanguageChange = useCallback(
    (value) => {
      setFilter((prev) => ({ ...prev, language: value }));
    },
    [filter?.language]
  );

  const handleToggleChange = useCallback(
    (key) => {
      setFilter((prev) => ({ ...prev, [key]: !prev[key] }));
      console.log("this is filter--------", filter, key);
    },
    [filter?.is_on_discount, filter?.in_stock]
  );

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        {/* Header with Item Count and Sorting */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{books?.count} Items</h2>
          <CommonDropdown
            options={SORT_BY_DROPDOWN}
            onSelect={handleSortChange}
          />
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar for filters */}
          <aside
            className={`bg-white shadow-lg p-4 transform transition-transform duration-300 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } fixed inset-y-0 left-0 w-64 z-40 lg:relative lg:translate-x-0 lg:w-60`}
          >
            <h2 className="text-xl font-semibold mb-4">Filters</h2>

            {/* Genre Filter */}
            <div className="w-full">
              <CheckboxFilter
                onChange={handleGenreChange}
                options={GENRE_OPTIONS}
              />
            </div>

            <div className="w-full">
              <CheckboxFilter
                singleSelect
                title="Language"
                onChange={handleLanguageChange}
                options={BOOK_LANGUAGE_OPTIONS}
              />
            </div>

            <div className="w-full">
              <ToggleButton
                isOn={filter?.is_on_discount}
                label={"Show with Discount"}
                onToggle={() => handleToggleChange("is_on_discount")}
              />
            </div>

            <div className="w-full">
              <ToggleButton
                isOn={filter?.in_stock}
                label={"Show only in Stock"}
                onToggle={() => handleToggleChange("in_stock")}
              />
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price Range</h3>
              <input type="range" min="0" max="10000" className="w-full" />
              <div className="flex justify-between text-sm mt-2">
                <span>₹0</span>
                <span>₹10,000+</span>
              </div>
            </div>
          </aside>

          {/* Books Listing */}
          <div className="flex-1 lg:ml-4">
            {/* Toggle Sidebar Button for Mobile */}
            <button
              className="lg:hidden p-3 bg-blue-600 text-white rounded-full fixed bottom-5 right-5 z-50"
              onClick={toggleSidebar}
            >
              <SearchIcon className="h-6 w-6" />
            </button>

            {/* Books Flex Layout */}
            <div className="flex flex-wrap gap-3 h-full">
              {loading && <BookLoader />}
              {!loading &&
                books?.bookData?.map((book) => (
                  <div key={book.bid}>
                    <BookCard book={book} />
                  </div>
                ))}
            </div>
            <div className="w-full">
              <Pagination
                currentPage={filter?.page}
                onPageChange={handlePageChange}
                pages={pages}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
