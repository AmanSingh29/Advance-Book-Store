const express = require("express");
const { uploadFileInCloudinary } = require("../Controllers/upload_file.ct");
const route = express.Router();

route.post("/upload", uploadFileInCloudinary);

module.exports = route;
