const express = require("express");
const { Product } = require("../models/product.model");
const productsDB = require("../db/productsDB");
const router = express.Router();

router.route("/").get(async (_, res) => {
  try {
    const insertedProduct = await Product.insertMany(productsDB);
    res.json({ success: true, message: "Products inserted", insertedProduct });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Cannot insert hte products",
        errorMessage: error.message,
      });
  }
});

module.exports = router;
