const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  phone: {
    type: Number,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
