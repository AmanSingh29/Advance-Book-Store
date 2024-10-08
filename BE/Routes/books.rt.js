const express = require("express");
const { createBook, getBooks } = require("../Controllers/books.ct");
const route = express.Router();

route.post("/create", createBook);

route.get("/", getBooks);

module.exports = route;
