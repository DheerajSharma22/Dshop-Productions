const User = require("../Models/User");
const crypto = require("crypto");
const mailSender = require("../Utils/mailSender");
const bcrypt = require("bcryptjs");


exports.resetPasswordToken = async (req, res) => {
    try {
        // Get email from req body
        const { email } = req.body;

        // Check if user exists or not
        const userExists = await User.findOne({ email });

        if (!userExists) return res.status(400).json({
            success: false,
            message: "Please create an account first!",
        })

        // Generate token
        const token = crypto.randomUUID()

        // Update user by adding token and expiration time.
        const updatedUser = await User.findByIdAndUpdate(userExists._id, { token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 }, { new: true });

        // Create frontent url.
        const url = `http://localhost:3000/update-password/${token}`;

        // Send mail
        await mailSender(email, "Study Notion - Reset Password", `<p> Your reset password link </p><br/><a href="${url}" target="_blank">Reset Password</a>`);

        // Send response
        return res.status(200).json({
            success: true,
            message: "A password reset link is sent to your email",
            updatedUser,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong sending password reset link",
            error,
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        // Get data from req body
        const { password, confirmPassword, token } = req.body;

        // Valdiate
        if (password !== confirmPassword) {
            return res.status(403).send({
                success: false,
                message: "Passwords are not matching!"
            });
        }

        // Get user details from db using token.
        const userDetails = await User.findOne({ token });

        if (!userDetails) return res.json({
            success: false,
            message: "invailid token!",
        })

        // If token expires
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Reset Password token is expired",
            })
        };

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in db.
        await User.findOneAndUpdate({ token }, { password: hashedPassword }, { new: true, });

        return res.status(200).json({
            success: true,
            message: "Password reset successfull",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reseting password",
            error,
        })
    }
}