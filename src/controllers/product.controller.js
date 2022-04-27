const { Product } = require("../models/product.model");
const { HttpError } = require("../utils/helper");
const { doesProductExist } = require("./helpers");

const getAllProducts = async (_, res, next) => {
  try {
    const products = await Product.find({}).populate("category");
    if (products.length < 1) {
      throw new HttpError(404, "No products found");
    }
    res.json({
      status: "SUCCESS",
      data: products,
      message: "Products found",
    });
  } catch (err) {
    next(err);
  }
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await doesProductExist(id);
    res.json({
      status: "SUCCESS",
      data: product,
      message: "Product found",
    });
  } catch (err) {
    next(err);
  }
};

const createNewProduct = async (req, res, next) => {
  const productData = req.body;
  try {
    let newProduct = new Product(productData);
    await newProduct.populate("category");
    newProduct = await newProduct.save();
    res.json({
      status: "SUCCESS",
      data: newProduct,
      message: "New product created",
    });
  } catch (err) {
    next(err);
  }
};

const updateProductById = async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    await doesProductExist(id);
    res.json({
      status: "SUCCESS",
      data: product,
      message: "Product updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

const deleteProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    await doesProductExist(id);
    res.json({
      status: "SUCCESS",
      data: {},
      message: "Product deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProductById,
  createNewProduct,
  deleteProductById,
};
