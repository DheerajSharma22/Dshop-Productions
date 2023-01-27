const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    order_id: {type: String, required: true},
    payment_id: {type: String, required: true},
    razorpay_signature: {type: String, required: true},
    orderItems: {
      type: Array,
      required: true
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      states: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const PaymentModel = new mongoose.model("Payment", paymentSchema);
module.exports = PaymentModel;
