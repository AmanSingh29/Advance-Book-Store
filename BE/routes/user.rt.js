const express = require("express");
const { verifyAuth } = require("../middleware/auth.mw");
const { getUserDataById } = require("../Controllers/user.ct");
const route = express.Router();

route.get("/", verifyAuth, getUserDataById);

module.exports = route;
