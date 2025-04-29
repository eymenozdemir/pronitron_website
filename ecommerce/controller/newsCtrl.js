const News = require("../models/newsModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createNews = asyncHandler(async (req, res) => {
  try {
    const newNews = await News.create(req.body);
    res.json(newNews);
  } catch (error) {
    throw new Error(error);
  }
});

const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedNews = await News.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedNews);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedNews = await News.findByIdAndDelete(id);
    res.json(deletedNews);
  } catch (error) {
    throw new Error(error);
  }
});

const getNews = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const news = await News.findById(id);
    res.json(news);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllNews = asyncHandler(async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createNews,
  updateNews,
  deleteNews,
  getNews,
  getAllNews,
}; 