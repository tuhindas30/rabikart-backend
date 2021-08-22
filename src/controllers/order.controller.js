const { Order } = require("../models/order.model");
const { HttpError } = require("../utils/helper");
const { findCartByUserId, placeOrder } = require("./helpers");

const getOrdersByUserId = async (req, res, next) => {
  const { userId } = req;
  try {
    const orders = await Order.find({ user: userId }).populate("items.product");
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
  try {
    const cart = await findCartByUserId(userId);
    if (!cart) {
      throw new HttpError(404, "No cart data found");
    }
    const { order, orderObj } = await placeOrder({
      userId,
      items: cart.items,
      totalPrice: cart.totalPrice,
      data: orderData,
    });
    cart.items = [];
    await cart.save();

    return res.json({
      status: "SUCCESS",
      data: { order, orderObj },
      message: "Order approved successfully",
    });
  } catch (err) {
    next(err);
  }
};

const confirmOrder = async (req, res, next) => {
  const { userId } = req;
  const { id } = req.params;
  const { paymentId, signature } = req.body;
  try {
    const order = await Order.findOne({
      _id: id,
      user: userId,
    }).populate("items.product");
    const isPaid = order.verifyPayment(paymentId, signature);
    if (!isPaid) {
      throw new HttpError(400, "Payment is tampered");
    }
    order.markModified("payment");
    await order.save();
    return res.json({
      status: "SUCCESS",
      data: order,
      message: "Payment is successful",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getOrdersByUserId, initiateOrder, confirmOrder };
