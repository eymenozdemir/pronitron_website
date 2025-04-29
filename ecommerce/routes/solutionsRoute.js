const express = require("express");
const { 
  createSolution, 
  updateSolution, 
  deleteSolution, 
  getSolution, 
  getAllSolutions 
} = require("../controller/solutionsCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createSolution);
router.put("/:id", authMiddleware, isAdmin, updateSolution);
router.delete("/:id", authMiddleware, isAdmin, deleteSolution);
router.get("/:id", getSolution);
router.get("/", getAllSolutions);

module.exports = router; 