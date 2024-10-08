const cloudinary = require("../Utils/cloudinary.ut");
module.exports = {
  uploadFileInCloudinary,
};

async function uploadFileInCloudinary(req, res, next) {
  try {
    const { data } = req.body;
    const result = await cloudinary.uploader.upload(data, {
      folder: "Book Store",
    });
    res.json({
      message: "Image uploaded successfully!",
      url: result.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
