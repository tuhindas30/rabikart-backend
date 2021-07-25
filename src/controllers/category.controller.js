const { Category } = require("../models/category.model");
const { HttpError } = require("../utils/helper");
const { doesCategoryExist } = require("./helpers");

const getAllCategory = async (_, res, next) => {
  try {
    const categories = await Category.find({});
    if (categories.length < 1) {
      throw new HttpError(404, "No categories found");
    }
    res.json({
      status: "SUCCESS",
      data: categories,
      message: "Categories found",
    });
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    doesCategoryExist(category);
    res.json({
      status: "SUCCESS",
      data: category,
      message: "Category found",
    });
  } catch (err) {
    next(err);
  }
};

const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      { title },
      { new: true }
    );
    doesCategoryExist(category);
    return res.json({
      status: "SUCCESS",
      data: category,
      message: "Category updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(id);
    doesCategoryExist(category);
    return res.json({
      status: "SUCCESS",
      data: {},
      message: "Category deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

const createNewCategory = async (req, res, next) => {
  const { title } = req.body;
  try {
    const newCategory = await new Category({ title }).save();
    res.json({
      status: "SUCCESS",
      data: newCategory,
      message: "New category created successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategoryById,
  getAllCategory,
  updateCategoryById,
  deleteCategoryById,
  createNewCategory,
};
