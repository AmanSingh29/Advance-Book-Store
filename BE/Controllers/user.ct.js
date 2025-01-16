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
      address: userData.address,
    };
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUserDataById(req, res, next) {
  try {
    const { _id } = req.obj || {};
    const payload = req.body;
    const checkUser = await User.findById(_id);
    if (!checkUser)
      return res.status(404).json({ message: "Record Not Found!" });
    const userData = await User.findByIdAndUpdate(
      _id,
      { $set: payload },
      { new: true }
    );
    const user = {
      _id: userData._id,
      name: userData.name,
      username: userData.username,
      phone: userData.phone,
      address: userData.address,
    };
    res
      .status(200)
      .json({ success: true, message: "User Updated Successfully!", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getUserDataById,
  updateUserDataById,
};
