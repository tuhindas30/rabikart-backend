const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const CartItemSchema = new Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: "Cannot add to cart without quantity",
      min: [1, "Quantity cannot be less than 1"],
    },
  },
  { _id: false }
);

const CartSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      index: true,
    },
    items: [CartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

CartSchema.methods = {
  calculateTotalPrice: function () {
    let totalPrice = 0;
    this.items.forEach((item) => {
      totalPrice += item.product.discountPrice * item.quantity;
    });
    this.totalPrice = totalPrice;
  },

  increaseItemQuantity: function (itemIndex, quantity) {
    this.items[itemIndex].quantity += quantity;
    if (quantity < 1) {
      this.items.splice(itemIndex, 1);
    }
  },

  updateItemQuantity: function (itemIndex, quantity) {
    this.items[itemIndex].quantity = quantity;
    this.checkItemQuantityLimit(itemIndex);
  },

  checkItemQuantityLimit: function (itemIndex) {
    if (
      this.items[itemIndex].quantity > this.items[itemIndex].product.maxQuantity
    ) {
      this.items[itemIndex].quantity =
        this.items[itemIndex].product.maxQuantity;
    }
    if (this.items[itemIndex].quantity < 1) {
      this.items.splice(itemIndex, 1);
    }
  },
};

const Cart = model("Cart", CartSchema);

module.exports = { Cart };
