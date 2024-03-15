const mongoose = require("mongoose");
const mailSender = require("../Utils/mailSender");

const otpSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: 5 * 60,
    },
    otp: {
        type: String,
        required: true,
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        await mailSender(email, "Verification email from StudyNotion", otp);
        console.log("mail sended successfully.");
    } catch (error) {
        console.log("error occured while sending mails -> ", error);
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})


module.exports = mongoose.model("Otp", otpSchema);