const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const getFile = asyncHandler(async (req, res) => {
  try {
    const { publicId } = req.params;
    const fileUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME}/raw/upload/${publicId}`;
    res.redirect(fileUrl);
  } catch (error) {
    console.error("File access error:", error);
    res.status(500).json({ message: "Error accessing file", error: error.message });
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;
    
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    
    const images = urls.map((file) => {
      return file;
    });
    
    res.json(images);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Error uploading files", error: error.message });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await cloudinaryDeleteImg(id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Error deleting file", error: error.message });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
  getFile,
};
