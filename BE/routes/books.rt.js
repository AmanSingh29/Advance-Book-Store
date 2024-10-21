const express = require("express");
const {
  createBook,
  getBooks,
  getBookSuggestions,
} = require("../Controllers/books.ct");
const route = express.Router();

route.post("/create", createBook);

route.get("/", getBooks);

route.get("/suggestions", getBookSuggestions);

module.exports = route;
