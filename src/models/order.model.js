const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;
const { createOrder, isPaymentLegit } = require("../utils/razorpay");

const OrderItemSchema = new Schema(
  {
    product: {
      type: ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: "Cannot add to order without quantity",
      min: [1, "Quantity cannot be less than 1"],
    },
  },
  { _id: false }
);

const AddressSchema = new Schema(
  {
    name: {
      type: String,
      required: "Cannot add address without a name",
      minLength: [3, "Name should be minimum 3 characters"],
    },
    street: {
      type: String,
      required: "Cannot add address without a street",
      minLength: [3, "Street should be minimum 3 characters"],
    },
    city: {
      type: String,
      required: "Cannot add address without a city",
      minLength: [2, "City should be minimum 3 characters"],
      maxLength: [20, "City should be maximum 20 characters"],
    },
    state: {
      type: String,
      required: "Cannot add address without a state",
      minLength: [3, "State should be minimum 3 characters"],
    },
    pin: {
      type: Number,
      required: "Cannot add address without a pincode",
      minLength: [6, "Pin should be minimum 6 characters"],
      maxLength: [6, "Pin should be maximum 6 characters"],
    },
    contactNo: {
      type: String,
      minLength: [10, "Contact number should be minimum 10 characters"],
      maxLength: [11, "Contact number should be maximum 11 characters"],
    },
  },
  { _id: false }
);

const PaymentSchema = new Schema({
  orderId: {
    type: String,
    default: "",
    required: "Cannot add payment without a orderId",
  },
  paymentId: {
    type: String,
    default: "",
    required: "Cannot add payment without its id",
  },
  signature: {
    type: String,
    default: "",
    required: "Cannot add payment without a signature",
  },
});

const OrderSchema = new Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
      index: true,
    },
    shipping: {
      type: AddressSchema,
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: "Cannot place order without items",
      validate: [(value) => value.length > 0, "Empty items[]"],
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    payment: PaymentSchema,
  },
  { timestamps: true }
);

OrderSchema.methods = {
  initiateOrder: async function () {
    return await createOrder(this.totalPrice, this._id);
  },

  verifyPayment: function (orderId, paymentId, signature) {
    const isPaid = isPaymentLegit(orderId, paymentId, signature);
    if (!isPaid) return isPaid;
    this.payment.orderId = orderId;
    this.payment.paymentId = paymentId;
    this.payment.signature = signature;
    return isPaid;
  },
};

const Order = model("Order", OrderSchema);

module.exports = { Order };
