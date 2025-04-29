const Refurbished = require("../models/refurbishedModel");
const Sale = require("../models/saleModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createRefurbished = asyncHandler(async (req, res) => {
  try {
    const newRefurbished = await Refurbished.create(req.body);
    res.json(newRefurbished);
  } catch (error) {
    throw new Error(error);
  }
});

const offerRefurbished = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newRefurbished = await Refurbished.create(req.body);
    res.json(newRefurbished);
  } catch (error) {
    throw new Error(error);
  }
});

const updateRefurbished = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log("req mesaji", req.params , req.body);
  validateMongoDbId(id);
  try {
    const updateRefurbished = await Refurbished.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.json(updateRefurbished);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteRefurbished = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log("getaproddfssd çalıştı");
  validateMongoDbId(id);
  try {
    const deletedRefurbished = await Refurbished.findOneAndDelete({ _id: id });
    res.json(deletedRefurbished);
  } catch (error) {
    throw new Error(error);
  }
});

const getaRefurbished = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //console.log("id",id);
  if (id === "undefined") {
    return;
  }
  validateMongoDbId(id);
  try {
    const findRefurbished = await Refurbished.findById({ _id: id });
    res.json(findRefurbished);
  } catch (error) {
    throw new Error(error);
  }
});

const getListedRefurbished = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    queryObj.status = "listed";
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Refurbished.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    if (req.query.page && req.query.limit) {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      const refurbishedCount = await Refurbished.countDocuments();
      if (skip >= refurbishedCount) throw new Error("This Page does not exists");
    }

    const refurbished = await query;
    res.json(refurbished);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllRefurbished = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Refurbished.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    if (req.query.page && req.query.limit) {
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);

      const refurbishedCount = await Refurbished.countDocuments();
      if (skip >= refurbishedCount) throw new Error("This Page does not exists");
    }
    const refurbished = await query;
    res.json(refurbished);
  } catch (error) {
    throw new Error(error);
  }
});


module.exports = {  
  createRefurbished,
  offerRefurbished,
  getaRefurbished,
  getAllRefurbished,
  getAllRefurbished,
  updateRefurbished,
  deleteRefurbished,
  getListedRefurbished,
};
