const { HttpError } = require("../utils/helper");
const { findCartByUserId, placeOrder } = require("./helpers");
const { Order } = require("../models/order.model");
const { isPaymentLegit } = require("../utils/razorpay");

const getOrdersByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const orders = await Order.findOne({ user: userId }).populate(
      "items.product"
    );
    if (!orders) {
      throw new HttpError(404, "No orders data found");
    }
    res.json({
      status: "SUCCESS",
      data: orders,
      message: `${orders.length} Orders found`,
    });
  } catch (err) {
    next(err);
  }
};

const initiateOrder = async (req, res, next) => {
  const { userId } = req;
  const orderData = req.body;
  const cart = await findCartByUserId(userId);
  if (!cart) {
    throw new HttpError(404, "No cart data found");
  }
  try {
    let paymentObj = await placeOrder({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      data: orderData,
    });
    cart.items = [];
    await cart.save();

    return res.json({
      status: "SUCCESS",
      data: paymentObj,
      message: "Order approved successfully",
    });
  } catch (err) {
    next(err);
  }
};

const confirmOrder = async (req, res, next) => {
  const { orderId, paymentId, signature } = req.body;
  const isPaid = await Order.verifyPayment(orderId, paymentId, signature);
  if (!isPaid) {
    throw new HttpError(400, "Payment is tampered");
  }
  return res.json({
    status: "SUCCESS",
    data: {},
    message: "Payment is successfull",
  });
};

module.exports = { getOrdersByUserId, initiateOrder, confirmOrder };
