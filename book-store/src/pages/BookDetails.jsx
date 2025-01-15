import React, { useCallback, useEffect, useMemo, useState } from "react";
import NavBar from "../components/NavBar";
import BookLoader from "../components/BookLoader";
import { calculateDiscount } from "../utils/commonFunctions";
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { BOOK_DETAILS_PATH } from "../constants/endpoints";
import { useAppContext } from "../context/AppContext";

const BookDetails = () => {
  const { bid } = useParams();
  const { api, loading } = useApi();
  const { cart, addToCart, showToast } = useAppContext();
  const [book, setBook] = useState({});
  const navigate = useNavigate();

  const discountedPrice = useMemo(() => {
    const { price, discount, is_on_discount } = book || {};
    if (!is_on_discount) return;
    return calculateDiscount(price, discount);
  }, [book]);

  const fetchBookDetails = useCallback(async () => {
    const response = await api.get(BOOK_DETAILS_PATH, { params: { bid } });
    if (response.data) setBook(response.data);
  }, [bid]);

  const navigateToCart = useCallback(() => {
    navigate("/cart");
  }, []);

  const handleAddToCart = useCallback(() => {
    if (cart[bid]) {
      navigateToCart();
    } else {
      addToCart({ [bid]: 1 });
      showToast("success", "Book Added To Cart Successfully!");
    }
  }, [bid, cart]);

  useEffect(() => {
    fetchBookDetails();
  }, [bid]);

  return (
    <>
      <NavBar />
      {loading ? (
        <div className="w-full h-[90vh]">
          <BookLoader text="Fetching Book Details..." />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-normal">
              <img
                src={book?.image}
                alt={book?.title}
                className="w-full max-w-sm rounded-md shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {book?.title}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  By <span className="font-semibold">{book?.author}</span>
                </p>
                <p className="text-gray-500 mb-4">{book?.description}</p>
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">Genre:</p>
                  <p className="text-gray-600">{book?.genre?.join(", ")}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-700 font-semibold">Publisher:</p>
                  <p className="text-gray-600">{book?.publisher}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">Published Date:</p>
                  <p className="text-gray-600">
                    {new Date(book?.publishDate).toDateString()}
                  </p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">Page Count:</p>
                  <p className="text-gray-600">{book?.pageCount}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">Language:</p>
                  <p className="text-gray-600">{book?.language}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">In Stock:</p>
                  <p className="text-gray-600">{book?.stock}</p>
                </div>
              </div>
              <div className="mt-8">
                {book?.is_on_discount ? (
                  <div className="flex items-center">
                    <p className="text-2xl text-red-600 font-bold mr-4">
                      ₹{discountedPrice}
                    </p>
                    <p className="text-gray-500 line-through">₹{book?.price}</p>
                    <p className="text-green-500 ml-2">
                      ({book?.discount}% off)
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl text-gray-800 font-bold">
                    ₹{book?.price}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="fixed bg-gray-100 bottom-0 left-0 shadow-lg p-4 sm:px-16 w-full flex justify-between items-center">
            <p className="text-xl font-bold text-navy">
              Total: ₹{book?.is_on_discount ? discountedPrice : book?.price}
            </p>
            <button
              onClick={handleAddToCart}
              className="bg-navy text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
            >
              {cart[bid] ? "Go To Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
