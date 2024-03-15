const express = require("express");
const { capturePayment, verifyPaymentSignature, sendPaymentSuccessMail } = require("../Controllers/PaymentController");
const router = express.Router();
const { auth } = require("../Middlewares/AuthMiddleware");
const {isStudent} = require("../Middlewares/AuthMiddleware");

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPaymentSignature);
router.post("/sendPaymentSuccessMail", auth, isStudent, sendPaymentSuccessMail);

module.exports = router;