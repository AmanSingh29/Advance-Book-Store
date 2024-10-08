const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publishDate: {
      type: Date,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: "",
    },
    is_on_discount: {
      type: Boolean,
      default: false,
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("books", BookSchema);
