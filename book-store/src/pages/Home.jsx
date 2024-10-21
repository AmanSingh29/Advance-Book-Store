import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import CoverImage from "../assets/images/cover/CoverImage.webp";
import CoverImageLazy from "../assets/images/cover/CoverImageLazy.webp";
import useApi from "../hooks/useApi";
import { BOOKS_PATH } from "../constants/endpoints";
import HomePageSection from "../components/HomePageSection";
import BookLoader from "../components/BookLoader";

const Home = () => {
  const [backgroundImage, setBackgroundImage] = useState(CoverImageLazy);
  const [books, setBooks] = useState({ hotDeals: [], recentPublished: [] });
  const [loading, setLoading] = useState(false);
  const { api } = useApi();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [resHotDeals, resRecentPublished] = await Promise.all([
        api.get(BOOKS_PATH, { params: { is_on_discount: true } }),
        api.get(BOOKS_PATH),
      ]);
      if (resHotDeals.data)
        setBooks((prev) => ({ ...prev, hotDeals: resHotDeals.data.bookData }));
      if (resRecentPublished.data)
        setBooks((prev) => ({
          ...prev,
          recentPublished: resRecentPublished.data.bookData,
        }));
    } catch (error) {
      console.log("err in getting homepage data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const img = new Image();
    img.src = CoverImage;
    img.onload = () => setBackgroundImage(CoverImage);
  }, []);

  if (loading) {
    return <BookLoader fullPage />;
  }

  return (
    <div>
      <NavBar />
      <div
        className="relative w-full md:h-[75vh] h-[50vh] bg-cover bg-center flex flex-col md:gap-6 gap-3 items-center justify-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>{" "}
        <h1 className="relative text-center lg:text-6xl sm:text-4xl md:text-5xl text-2xl font-semibold text-white z-10">
          Discover Your Next Great Read.
        </h1>
        <p className="relative text-xs lg:text-xl md:text-lg sm:text-base text-center mx-3 text-white z-10 italic">
          “A room without books is like a body without a soul.” — Marcus Tullius
          Cicero
        </p>
        <button className="relative sm:text-lg text-sm z-10 sm:mt-6 mt-3 bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded">
          Browse Books
        </button>
      </div>
      {books?.hotDeals?.length && (
        <HomePageSection data={books?.hotDeals} heading={"Top Deals"} />
      )}
      {books?.recentPublished?.length && (
        <HomePageSection
          data={books?.recentPublished}
          heading={"Recent Published"}
        />
      )}
    </div>
  );
};

export default Home;
