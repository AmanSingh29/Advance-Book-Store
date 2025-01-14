const express = require("express");
const { createUser, login } = require("../Controllers/auth.ct");
const route = express.Router();

route.post("/signup", createUser);

route.post("/login", login);

module.exports = route;
