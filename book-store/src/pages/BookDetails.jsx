import React, { useMemo } from "react";
import NavBar from "../components/NavBar";
import BookLoader from "../components/BookLoader";
import { calculateDiscount } from "../utils/commonFunctions";

const BookDetails = () => {
  const book = {
    _id: {
      $oid: "6704a04943d2ae20d56d5eb8",
    },
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    description:
      "Even bad code can function. But if code isn't clean, it can bring a development organization to its knees. Clean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second consists of several case studies of increasing complexity. Each case study consists of cleaned up code and a description of the transformation.",
    genre: ["Programming", "Software Engineering"],
    price: 3599,
    publisher: "Prentice Hall",
    publishDate: {
      $date: "2008-08-11T00:00:00.000Z",
    },
    pageCount: 464,
    language: "English",
    stock: 25,
    image:
      "https://res.cloudinary.com/aman29/image/upload/v1728617485/Book%20Store/intoductin_to_algo_kfndpn.webp",
    is_on_discount: true,
    discount: 10,
    created_at: {
      $date: "2024-10-08T03:00:25.294Z",
    },
    updated_at: {
      $date: "2024-10-08T03:00:25.294Z",
    },
    __v: 0,
  };
  const discountedPrice = useMemo(() => {
    const { price, discount, is_on_discount } = book || {};
    if (!is_on_discount) return;
    return calculateDiscount(price, discount);
  }, [book]);

  return (
    <>
      <NavBar />
      {true ? (
        <div className="w-full h-[90vh]">
          <BookLoader text="Fetching Book Details..." />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center justify-normal">
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-w-sm rounded-md shadow-lg"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-4">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-2">
                  By <span className="font-semibold">{book.author}</span>
                </p>
                <p className="text-gray-500 mb-4">{book.description}</p>
                <div className="mb-4">
                  <p className="text-gray-700 font-semibold">Genre:</p>
                  <p className="text-gray-600">{book.genre.join(", ")}</p>
                </div>

                <div className="flex justify-between">
                  <p className="text-gray-700 font-semibold">Publisher:</p>
                  <p className="text-gray-600">{book.publisher}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">Published Date:</p>
                  <p className="text-gray-600">
                    {new Date(book.publishDate).toDateString()}
                  </p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">Page Count:</p>
                  <p className="text-gray-600">{book.pageCount}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">Language:</p>
                  <p className="text-gray-600">{book.language}</p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="text-gray-700 font-semibold">In Stock:</p>
                  <p className="text-gray-600">{book.stock}</p>
                </div>
              </div>
              <div className="mt-8">
                {book.is_on_discount ? (
                  <div className="flex items-center">
                    <p className="text-2xl text-red-600 font-bold mr-4">
                      ₹{discountedPrice}
                    </p>
                    <p className="text-gray-500 line-through">₹{book.price}</p>
                    <p className="text-green-500 ml-2">
                      ({book.discount}% off)
                    </p>
                  </div>
                ) : (
                  <p className="text-2xl text-gray-800 font-bold">
                    ₹{book.price}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="fixed bg-gray-100 bottom-0 left-0 shadow-lg p-4 sm:px-16 w-full flex justify-between items-center">
            <p className="text-xl font-bold text-navy">
              Total: ₹{book.is_on_discount ? discountedPrice : book.price}
            </p>
            <button className="bg-navy text-white px-6 py-2 rounded-md hover:bg-blue-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookDetails;
