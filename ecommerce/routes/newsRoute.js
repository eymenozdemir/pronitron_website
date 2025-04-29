const express = require("express");
const { 
  createNews, 
  updateNews, 
  deleteNews, 
  getNews, 
  getAllNews 
} = require("../controller/newsCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createNews);
router.put("/:id", authMiddleware, isAdmin, updateNews);
router.delete("/:id", authMiddleware, isAdmin, deleteNews);
router.get("/:id", getNews);
router.get("/", getAllNews);

module.exports = router; 