const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },

    review: {
        type: String, trim: true,
        required: true,
    },

    course: {
        type: mongoose.Schema.ObjectId,
        ref: "Course",
        required: true,
    }
})

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);