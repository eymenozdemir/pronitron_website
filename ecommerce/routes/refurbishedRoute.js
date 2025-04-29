const express = require("express");
const {
  createRefurbished,
  offerRefurbished,
  getaRefurbished,
  getAllRefurbished,
  updateRefurbished,
  deleteRefurbished,
  getListedRefurbished,
} = require("../controller/refurbishedCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/offer", express.json(), authMiddleware, offerRefurbished); //middleware silinebilir üsttekiyle yer değişebilir
router.post("/", express.json(),  createRefurbished); //FIXME alttakiyle değiş
//router.post("/", express.json(), authMiddleware, isAdmin, createProduct);
router.get("/listed", express.json(), getListedRefurbished);

//router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.put("/:id", updateRefurbished); //FIXME
router.delete("/:id", deleteRefurbished); //FIXME
//router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/:id", getaRefurbished);

router.get("/", express.json(), getAllRefurbished);


module.exports = router;
