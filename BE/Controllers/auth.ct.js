const { default: mongoose } = require("mongoose");
const User = mongoose.model("users");

module.exports = {
  createUser,
};

async function createUser(req, res, next) {
  try {
    const payload = req.body;
    const userData = await new User(payload).save();
    res.json({ data: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
