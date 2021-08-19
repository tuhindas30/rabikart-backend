const razorpay = require("../services/razorpay");
const crypto = require("crypto");

const createOrder = (amount, receiptId) => {
  return razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
    receipt: receiptId.toString(),
    payment_capture: true,
  });
};

const isPaymentLegit = (orderId, paymentId, signature) => {
  const body = `${orderId}|${paymentId}`;
  const secret = process.env.RAZORPAY_API_SECRET;
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(body)
    .digest("hex");

  return generatedSignature === signature;
};

module.exports = { createOrder, isPaymentLegit };
