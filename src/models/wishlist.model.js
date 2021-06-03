const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const WishlistItemSchema = new Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { _id: false }
);

const WishlistSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    items: [WishlistItemSchema],
  },
  { timestamps: true }
);

const Wishlist = model("Wishlist", WishlistSchema);

module.exports = { Wishlist };
