const express = require("express");
const {
  createBook,
  getBooks,
  getBookSuggestions,
  getBookDetails,
} = require("../Controllers/books.ct");
const route = express.Router();

route.get("/", getBooks);

route.post("/create", createBook);

route.get("/suggestions", getBookSuggestions);

route.get("/details", getBookDetails);

module.exports = route;
