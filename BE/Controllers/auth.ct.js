const { default: mongoose } = require("mongoose");
const { generateJwtToken } = require("../Utils/common.ut");
const User = mongoose.model("users");

module.exports = {
  createUser,
  login
};

async function createUser(req, res, next) {
  try {
    const payload = req.body;
    const userData = await new User(payload).save();
    res.json({ success: true, message: "Account created successfully!", data: userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    const userData = await User.findOne({ username });
    if(!userData) return res.status(404).json({message: "Record Not Found!"});
    if(userData.password !== password) return res.status(401).json({message: "Invalid username or password!"});
    const user = { _id: userData._id, name: userData.name, username: userData.username, phone: userData.phone };
    const token = generateJwtToken(user, process.env.JWT_SECRET)
    res.status(200).json({ success: true, message: "Loggedin Successfully!", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
