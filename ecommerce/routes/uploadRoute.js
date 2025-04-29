const express = require("express");
const { uploadImages, deleteImages, getFile } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

// Public routes
router.get("/download/:publicId", getFile);

// Protected routes
router.post(
  "/images",
  authMiddleware,
  uploadPhoto.array("images", 10),
  //productImgResize,
  uploadImages
);
router.post(
  "/downloadables",
  authMiddleware,
  uploadPhoto.array("downloadables", 10),
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, deleteImages);
router.delete("/delete-downloadables/:id", authMiddleware, deleteImages);
module.exports = router;
