const express = require("express");
const router = express.Router();

const CategoryController = require("../controllers/category.controller");
const { verifyAuth } = require("../middlewares/verifyAuth");

router
  .route("/")
  .get(CategoryController.getAllCategory)
  .post(CategoryController.createNewCategory);

router
  .route("/:id")
  .get(CategoryController.getCategoryById)
  .post(CategoryController.updateCategoryById)
  .delete(CategoryController.deleteCategoryById);

module.exports = router;
