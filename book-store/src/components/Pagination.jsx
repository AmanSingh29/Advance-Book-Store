import React from "react";

const Pagination = ({ onPageChange, pages, currentPage }) => {
  return (
    <div className="w-full p-4 flex justify-center items-center">
      {pages?.map((page, index) => (
        <button
          onClick={() => onPageChange(page)}
          className={`mx-2 px-8 py-1 border border-black rounded-md ${
            currentPage === page ? "bg-navy text-white" : ""
          }`}
          key={index}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
