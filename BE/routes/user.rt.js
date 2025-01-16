const express = require("express");
const { verifyAuth } = require("../middleware/auth.mw");
const {
  getUserDataById,
  updateUserDataById,
} = require("../Controllers/user.ct");
const route = express.Router();

route
  .get("/", verifyAuth, getUserDataById)
  .patch("/", verifyAuth, updateUserDataById);

module.exports = route;
