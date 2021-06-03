const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: "Cannot add category without name",
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = model("Category", CategorySchema);

module.exports = { Category };
