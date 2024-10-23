import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import BookLoader from "../components/BookLoader";
import useApi from "../hooks/useApi";
import { SearchIcon } from "../assets";
import { BOOKS_PATH } from "../constants/endpoints";
import BookCard from "../components/BookCard";

const Explore = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const { api, loading } = useApi();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await api.get(BOOKS_PATH);
      if (response.data) setBooks(response.data.bookData);
    } catch (error) {
      console.log("Error in getting books data", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        {/* Header with Item Count and Sorting */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{books.length} Items</h2>
          <div className="flex space-x-4 items-center">
            <p className="text-gray-500">Sort by:</p>
            <select className="border border-gray-300 rounded-md p-2">
              <option value="relevance">Relevance</option>
              <option value="low_to_high">Price: Low to High</option>
              <option value="high_to_low">Price: High to Low</option>
              <option value="best_selling">Best Selling</option>
            </select>
          </div>
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
            <div className="mb-6">
              <h3 className="font-medium mb-2">Genre</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Fiction
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Non-Fiction
                </label>
              </div>
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
                books?.map((book) => (
                  <div key={book.bid}>
                    <BookCard book={book} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Explore;
