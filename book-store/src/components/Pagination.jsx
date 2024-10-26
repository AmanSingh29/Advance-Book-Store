import React from "react";
import { LeftArrowIcon, RightArrowIcon } from "../assets";

const Pagination = ({ onPageChange, pages, currentPage }) => {
  return (
    <div className="w-full p-4 flex justify-center items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-2 px-3 py-1 border disabled:bg-gray-200 border-navy disabled:border-gray-200"
      >
        <LeftArrowIcon className="h-5" />
      </button>
      {pages?.map((page, index) => (
        <button
          onClick={() => onPageChange(page)}
          className={`mx-2 px-3 py-1 border border-navy ${
            currentPage === page ? "bg-navy text-white" : ""
          } font-medium`}
          key={index}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pages[pages?.length - 1]}
        className="mx-2 px-3 py-1 border disabled:border-gray-200 disabled:bg-gray-200 border-navy"
      >
        <RightArrowIcon className="h-5" />
      </button>
    </div>
  );
};

export default Pagination;
