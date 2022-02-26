const mongoose = require("mongoose");
require("mongoose-type-url");

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const ProductSchema = new Schema(
  {
    modelName: {
      type: String,
      required: "Cannot add a product without name",
    },
    modelNo: {
      type: String,
      required: "Cannot add a product without its model number",
      unique: true,
    },
    imageUrl: {
      type: mongoose.SchemaTypes.Url,
      required: "Cannot add a product without an image URL",
    },
    avgRating: Number,
    price: {
      type: Number,
      required: "Cannot add a product without its price",
    },
    discount: Number,
    discountPrice: Number,
    inStock: Boolean,
    fastDelivery: Boolean,
    maxQuantity: Number,
    category: {
      type: ObjectId,
      ref: "Category",
    },
    seller: {
      type: String,
      required: "Cannot add a product without its seller name",
    },
    sellerRating: Number,
    description: {
      type: String,
      maxLength: [1000, "Can't add more than 1000 characters"],
    },
    productLink: mongoose.SchemaTypes.Url,
    highlights: [
      {
        label: String,
        value: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);

module.exports = { Product };
