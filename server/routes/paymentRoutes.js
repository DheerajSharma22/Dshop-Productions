const Razorpay = require("razorpay");
const express = require("express");
const auth = require("../middleware/auth");
const paymentRouter = express.Router();
const PaymentModel = require("../models/paymentModel");
var crypto = require("crypto");

paymentRouter.get("/", auth, async (req, res) => {
  const orders = await PaymentModel.find({ user: req.user_id });
  res.status(200).send(orders);
});

paymentRouter.post("/placeOrder", async (req, res) => {
  try {
    let amount = req.body?.amount;

    if (!amount) return res.status(400).send("Amount not received...);

    let instance = await new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    let order = await instance.orders.create({
      amount: amount,
      currency: "INR",
      receipt: Date.now().toString(),
    });

    res.status(200).send({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).send(error);
  }

});

paymentRouter.post("/paymentVerification", auth, async (req, res) => {
  try {
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
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
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
  } catch (error) {
    return res.status(500).send(error?.message);
  }
  

});

module.exports = paymentRouter;
