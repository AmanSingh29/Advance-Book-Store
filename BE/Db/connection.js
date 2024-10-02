const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("--------DB connected successfully------");
  } catch (error) {
    console.log("Err in Connecting DB: ", error.message);
  }
};

module.exports = connectToDb;
