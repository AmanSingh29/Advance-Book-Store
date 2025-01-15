const { default: mongoose } = require("mongoose");
const User = mongoose.model("users");

async function getUserDataById(req, res, next) {
  try {
    const { _id } = req.obj || {};
    const userData = await User.findById(_id);
    if (!userData)
      return res.status(404).json({ message: "Record Not Found!" });
    const user = {
      _id: userData._id,
      name: userData.name,
      username: userData.username,
      phone: userData.phone,
    };
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserDataById,
};
