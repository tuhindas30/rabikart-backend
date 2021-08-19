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

const approveOrder = async (req, res, next) => {
  const { userId } = req;
  const orderData = req.body;
  const { orderId, paymentId, signature } = orderData.payment;
  const cart = await findCartByUserId(userId);
  if (!cart) {
    throw new HttpError(404, "No cart data found");
  }
  const isPaid = isPaymentLegit(orderId, paymentId, signature);

  if (!isPaid) {
    return res.json({
      status: "ERROR",
      data: {},
      message: "Payment is tampered",
    });
  }
  try {
    let orders = await placeOrder({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      data: orderData,
    });
    cart.items = [];
    await cart.save();

    return res.json({
      status: "SUCCESS",
      data: orders,
      message: "Order approved successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOrdersByUserId, approveOrder };
