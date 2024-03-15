const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, required: true, trim: true,
    },
    lastName: {
        type: String, required: true, trim: true,
    },

    email: {
        type: String, required: true, trim: true, unique: true,
    },

    password: {
        type: String, required: true
    },
    accountType: {
        type: String, enum: ["Admin", "Student", "Instructor"], required: true,
    },
    image: {
        type: String,
    },
    additionalDetails: {
        type: mongoose.Schema.ObjectId, ref: "Profile",
    },
    courses: [{
        type: mongoose.Schema.ObjectId, ref: "Course",
    }],
    courseProgress: [{
        type: mongoose.Schema.ObjectId, ref: "CourseProgress"
    }],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type:Date,
    }

})

module.exports = mongoose.model("User", userSchema);