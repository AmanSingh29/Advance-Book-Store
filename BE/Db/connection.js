const mongoose = require("mongoose");
const URI = process.env.MONGODB_URI;

const connectToDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("--------DB connected successfully------");
  } catch (error) {
    console.log("Err in Connecting DB: ", error);
    if (error.cause) {
      console.log("Cause For Err in Connecting DB: ", error.cause);
    }
  }
};

module.exports = connectToDb;
