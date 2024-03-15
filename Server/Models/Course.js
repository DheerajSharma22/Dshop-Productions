const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        required: true,
    },
    
    courseDescription: {
        type: String,
        trim: true,
        required: true,
    },
    
    instructor: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    
    whatYouWillLearn: {
        type: String,
    },
    
    courseContent: [{
        type: mongoose.Schema.ObjectId,
        ref: "Section",
        required: true,
    }],
    
    ratingAndReviews: [{
        type: mongoose.Schema.ObjectId,
        ref: "RatingAndReview",
    }],
    
    price: {
        type: Number,
        required: true,
    },
    
    thumbnail: {
        type: String,
    },
    
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true,
    },
    
    tags: [{
        type: String,
    }],

    status: {
        type: String,
    },

    instructions: [{
        type: String,
    }],
    language: {
        type: String,
    },

    studentsEnrolled: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    }

})

module.exports = mongoose.model("Course", courseSchema);