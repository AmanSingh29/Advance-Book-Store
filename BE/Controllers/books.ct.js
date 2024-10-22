const mongoose = require("mongoose");
const { SORT_ORDER } = require("../constants/dbEnum");
const { getFilterByPriceStage, getFilterByDate } = require("../Utils/books.ut");
const { generateAlphanumericString } = require("../Utils/common.ut");
const Book = mongoose.model("books");

module.exports = {
  createBook,
  getBooks,
  getBookSuggestions,
  getBookDetails,
};

async function createBook(req, res, next) {
  try {
    const {
      title,
      author,
      description,
      genre,
      price,
      publisher,
      publish_date,
      page_count,
      language,
      stock,
      image,
      is_on_discount,
      discount,
    } = req.body;
    const bid = generateAlphanumericString();
    const bookData = await new Book({
      bid,
      title,
      author,
      description,
      genre,
      price,
      publish_date,
      publisher,
      page_count,
      language,
      stock,
      image,
      is_on_discount,
      discount,
    }).save();
    res.status(201).json({ message: "Book Created Successfully!", bookData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBooks(req, res, next) {
  try {
    let {
      page = 1,
      limit = 10,
      search_text = "",
      min_price,
      max_price,
      genre,
      language,
      start_date,
      end_date,
      publisher,
      is_on_discount,
      in_stock,
      sort_by = "publish_date",
      sort_order = SORT_ORDER.DESCENDING,
    } = req.query;
    const matchStage = {
      created_at: { $exists: true },
    };
    const pipeline = [];
    if (search_text) {
      search_text = search_text?.trim();
      const regexText = new RegExp(search_text, "i");
      matchStage.$or = [
        { title: { $regex: regexText } },
        { author: { $regex: regexText } },
        { genre: { $elemMatch: { $regex: regexText } } },
      ];
    }
    if (min_price || max_price)
      getFilterByPriceStage(matchStage, min_price, max_price);
    if (start_date || end_date)
      getFilterByDate(matchStage, start_date, end_date);
    if (genre) {
      genre = genre?.split(",");
      matchStage.genre = { $elemMatch: { $in: genre } };
    }
    if (language) matchStage.language = language;
    if (is_on_discount === "true") matchStage.is_on_discount = true;
    if (in_stock) matchStage.in_stock = { $gt: 0 };
    if (publisher) matchStage.publisher = publisher;
    pipeline.push({ $match: matchStage });
    pipeline.push({
      $facet: {
        count: [{ $count: "count" }],
        data: [
          {
            $sort: { [sort_by]: sort_order === SORT_ORDER.ASCENDING ? 1 : -1 },
          },
          { $skip: (page - 1) * limit },
          { $limit: limit },
          {
            $project: {
              title: 1,
              author: 1,
              description: 1,
              genre: 1,
              price: 1,
              publisher: 1,
              publish_date: 1,
              page_count: 1,
              language: 1,
              stock: 1,
              image: 1,
              is_on_discount: 1,
              discount: 1,
              created_at: 1,
              updated_at: 1,
            },
          },
        ],
      },
    });
    const response = await Book.aggregate(pipeline);
    const count = response[0]?.count[0]?.count || 0;
    const bookData = response[0]?.data || [];
    res.status(200).json({ count, bookData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBookSuggestions(req, res, next) {
  try {
    let { search_text } = req.query;
    const matchStage = {};
    const pipeline = [];
    if (search_text) {
      search_text = search_text?.trim();
      const regexText = new RegExp(search_text, "i");
      matchStage.$or = [
        { title: { $regex: regexText } },
        { author: { $regex: regexText } },
        { genre: { $elemMatch: { $regex: regexText } } },
      ];
    }
    pipeline.push(
      {
        $match: matchStage,
      },
      {
        $project: {
          title: 1,
          bid: 1,
        },
      },
      {
        $limit: 10,
      }
    );
    const response = await Book.aggregate(pipeline);
    res.status(200).json({ suggestions: response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getBookDetails(req, res, next) {
  try {
    const { bid } = req.query;
    const response = await Book.findOne({ bid });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
