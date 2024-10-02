require("dotenv").config();
const express = require("express");
const connectToDb = require("./Db/connection");
const app = express();
const PORT = process.env.PORT || 8000;

app.use("/", (req, res) => {
  res.send("app is working........");
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server has started on ${PORT}`);
});
