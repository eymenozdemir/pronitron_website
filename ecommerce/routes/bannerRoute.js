const express = require("express");
const { 
  createBanner, 
  updateBanner, 
  deleteBanner, 
  getBanner, 
  getAllBanners 
} = require("../controller/bannerCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBanner);
router.put("/:id", authMiddleware, isAdmin, updateBanner);
router.delete("/:id", authMiddleware, isAdmin, deleteBanner);
router.get("/:id", getBanner);
router.get("/", getAllBanners);

module.exports = router; 