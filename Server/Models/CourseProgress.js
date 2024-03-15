const mongoose = require("mongoose");

const courseProgressSchema = new mongoose.Schema({
    courseID: {
        type: mongoose.Schema.ObjectId,
        ref: "Course"
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    completedVideos: {
        type: mongoose.Schema.ObjectId,
        ref: "SubSection"
    },
})

module.exports = mongoose.model("CourseProgress", courseProgressSchema);