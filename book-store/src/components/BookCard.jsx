import React from "react";
// import DeleteBook from "./DeleteBook";
import Image from "./Image"; // Assuming you're using a common Image component

const BookCard = ({ book }) => {
  // Calculate discounted price if the book is on discount
  const discountedPrice = book.is_on_discount
    ? (book.price - (book.price * book.discount) / 100).toFixed(2)
    : null;

  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col w-full sm:w-[300px] md:w-[250px] lg:w-[300px] bg-white">
      {/* Book Image */}
      <div className="mb-4 w-full h-48 bg-gray-200 flex items-center justify-center">
        {book.image ? (
          <Image
            alt={book.title}
            src={book.image}
            srcLazy={book.image} // Can have a lower quality image for lazy loading
            lazyLoad={true}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </div>

      {/* Book Title */}
      <h3 className="text-xl font-bold mb-2 text-gray-800">{book.title}</h3>

      {/* Author */}
      <p className="text-gray-700 mb-1">By {book.author}</p>

      {/* Book Description (limited to 100 chars) */}
      <p className="text-gray-600 mb-2">
        {book.description.length > 100
          ? `${book.description.substring(0, 100)}...`
          : book.description}
      </p>

      {/* Price and Discount */}
      <div className="flex items-center mb-2">
        {book.is_on_discount ? (
          <>
            <p className="text-red-600 font-semibold text-lg mr-2">
              ₹{discountedPrice}
            </p>
            <p className="text-gray-500 line-through text-sm">₹{book.price}</p>
          </>
        ) : (
          <p className="text-green-600 font-semibold text-lg">₹{book.price}</p>
        )}
      </div>

      {/* Discount Badge */}
      {book.is_on_discount && (
        <span className="inline-block bg-red-200 text-red-800 px-2 py-1 text-xs rounded mb-2">
          {book.discount}% Off
        </span>
      )}

      {/* Delete Book Button (or any other action button) */}
      <div className="mt-auto">{/* <DeleteBook bookId={book._id} /> */}</div>
    </div>
  );
};

export default BookCard;
