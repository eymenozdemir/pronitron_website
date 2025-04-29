const Solution = require("../models/solutionsModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createSolution = asyncHandler(async (req, res) => {
  try {
    const newSolution = await Solution.create(req.body);
    res.json(newSolution);
  } catch (error) {
    throw new Error(error);
  }
});

const updateSolution = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedSolution = await Solution.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSolution);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSolution = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedSolution = await Solution.findByIdAndDelete(id);
    res.json(deletedSolution);
  } catch (error) {
    throw new Error(error);
  }
});

const getSolution = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const solution = await Solution.findById(id);
    res.json(solution);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSolutions = asyncHandler(async (req, res) => {
  try {
    const solutions = await Solution.find();
    res.json(solutions);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSolution,
  updateSolution,
  deleteSolution,
  getSolution,
  getAllSolutions,
}; 