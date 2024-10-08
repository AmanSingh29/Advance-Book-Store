const mongoose = require("mongoose");
const Book = mongoose.model("books");

module.exports = {
  createBook,
  getBooks,
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
      publishDate,
      pageCount,
      language,
      stock,
      image,
      is_on_discount,
      discount,
    } = req.body;
    const bookData = await new Book({
      title,
      author,
      description,
      genre,
      price,
      publishDate,
      publisher,
      pageCount,
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
    const { page = 1, limit = 10 } = req.query;
    const matchStage = {
      created_at: { $exists: true },
    };
    const pipeline = [];
    pipeline.push({
      $match: matchStage,
    });
    const bookData = await Book.aggregate(pipeline);
    res.status(201).json({ count: bookData.length, bookData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
