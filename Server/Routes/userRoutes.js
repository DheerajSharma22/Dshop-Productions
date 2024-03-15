const express = require("express");
const { sendOtp, signup, logout, login } = require("../Controllers/AuthController");
const { auth } = require("../Middlewares/AuthMiddleware");
const { resetPasswordToken, resetPassword } = require("../Controllers/ResetPasswordController");
const User = require("../Models/User");
const router = express.Router();

router.post("/sendOtp", sendOtp);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", auth, logout);
router.post('/reset-password-token', resetPasswordToken);
router.post('/reset-password', resetPassword);
router.get("/isAuthorized", auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user.id }).populate("additionalDetails").populate({
        path: "courses",
        populate: {
            path: "courseContent",
            populate: {
                path: "SubSection"
            }
        }
    }).exec();
    return res.status(200).json({
        success: true,
        message: "User Authorized",
        User: user,
    });
})

module.exports = router;