import React, { useMemo } from "react";
import Image from "./Image";
import { calculateDiscount } from "../utils/commonFunctions";

const BookCard = ({ book }) => {
  const discountedPrice = useMemo(() => {
    const { price, discount, is_on_discount } = book || {};
    if (!is_on_discount) return;
    return calculateDiscount(price, discount);
  }, [book]);

  return (
    <div className="border rounded-lg shadow-lg p-3 flex flex-col w-[250px] bg-white relative font-sans">
      <div className="relative mb-4 w-full h-48 bg-gray-100 flex items-center justify-center rounded-md overflow-hidden">
        {book.image ? (
          <Image alt={book.title} src={book.image} />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
        {book.is_on_discount && (
          <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {book.discount}% Off
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold mb-2 text-gray-900 line-clamp-1">
        {book.title}
      </h3>
      <p className="text-gray-600 italic mb-1 line-clamp-1">By {book.author}</p>
      <p className="text-gray-700 text-sm mb-2 line-clamp-2">
        {book.description}
      </p>
      <div className="flex items-center">
        {book.is_on_discount ? (
          <>
            <p className="text-red-600 font-bold text-lg mr-2">
              ₹{discountedPrice}
            </p>
            <p className="text-gray-500 line-through text-sm">₹{book.price}</p>
          </>
        ) : (
          <p className="text-green-600 font-bold text-lg">₹{book.price}</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
