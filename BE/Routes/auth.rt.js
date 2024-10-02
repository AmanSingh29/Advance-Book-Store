const express = require("express");
const { createUser } = require("../Controllers/auth.ct");
const route = express.Router();

route.post("/signup", createUser);

module.exports = route;
