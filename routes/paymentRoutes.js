const Razorpay = require("razorpay");
const express = require("express");
const auth = require("../middleware/auth");
const paymentRouter = express.Router();
const PaymentModel = require("../models/paymentModel");
var crypto = require("crypto");

paymentRouter.get("/", auth,async (req, res) => {
  const orders = await PaymentModel.find({user: req.user_id});
  res.status(200).send(orders);
});

paymentRouter.post("/placeOrder", async (req, res) => {
  let { amount } = req.body;

  let instance = await new Razorpay({
    key_id: "rzp_test_4vPPcvuXqHrPuK",
    key_secret: "RF4NhwgMky8E1Ol5oLSHeLcp",
  });

  let order = await instance.orders.create({
    amount: amount,
    currency: "INR",
    receipt: "RECEIPT_2",
  });

  res.status(200).send({
    success: true,
    order,
  });
});

paymentRouter.post("/paymentVerification", auth, async (req, res) => {
  const {
    order_id,
    payment_id,
    razorpay_signature,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
  } = req.body;

  const body = order_id + "|" + payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "RF4NhwgMky8E1Ol5oLSHeLcp")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    if (orderItems.length === 0) {
      res.status(400).send("Cart is empty");
    } else {
      const Order = await new PaymentModel({
        order_id,
        payment_id,
        razorpay_signature,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        isPaid,
        user: req.user._id,
      });
      const createdOrder = await Order.save();
      res.send(createdOrder);
    }
  } else {
    res.status(400).send({
      success: false,
    });
  }

});

module.exports = paymentRouter;
