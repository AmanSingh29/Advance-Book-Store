const express = require("express");
const route = express.Router();
const { verifyAuth } = require("../middleware/auth.mw");
const { placeOrder, getOrders } = require("../Controllers/order.ct");

route
    .get("/", verifyAuth, getOrders)
    .post("/", verifyAuth, placeOrder)

module.exports = route;