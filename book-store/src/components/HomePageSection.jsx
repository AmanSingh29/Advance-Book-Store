import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const HomePageSection = ({ heading, data }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/book-details-d453de3");
  }, []);

  return (
    <div className="relative w-full my-8 px-6">
      <div className="flex items-center justify-between pb-4 px-6">
        <h2 className="font-semibold text-4xl">{heading}</h2>
        <Link
          className="text-blue-400 text-sm font-medium hover:underline"
          to={"#"}
        >
          See All
        </Link>
      </div>
      <div className="flex gap-5 overflow-x-scroll scrollbar-hide">
        {data?.map((book, index) => {
          return (
            <div onClick={handleNavigate} key={index}>
              <BookCard book={book} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePageSection;
