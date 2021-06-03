const express = require("express");
const router = express.Router();

const ProductController = require("../controllers/product.controller");

router
  .route("/")
  .get(ProductController.getAllProducts)
  .post(ProductController.createNewProduct);

router
  .route("/:id")
  .get(ProductController.getProductById)
  .post(ProductController.updateProductById)
  .delete(ProductController.deleteProductById);

module.exports = router;
