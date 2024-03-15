const RatingAndReview = require("../Models/RatingAndReview");
const Course = require("../Models/Course");

const createRatingAndReview = async (req, res) => {
    try {
        // Get data
        const { rating, review, courseId } = req.body;

        // Validate
        if (!rating || !review || !courseId) return res.status(400).json({
            success: false,
            message: "All fields are mandatory",
        })

        // Check if user is enrolled or not.
        const courseDetails = await Course.findOne({ _id: courseId, studentsEnrolled: { $elemMatch: { $eq: req.user.id } } });

        if (!courseDetails) return res.status(400).json({
            success: false,
            message: "You are not enrolled for this course",
        })

        // Check if user already reviewed this course
        const alreadyReview = await RatingAndReview.findOne({
            user: req.user.id,
            course: courseId,
        })

        if (alreadyReview) return res.status(403).json({
            success: false,
            message: "Course is already reviewed by the user",
        });

        // Create an entry
        const createdRating = await RatingAndReview.create({
            rating, review, user: req.user.id, course: courseId
        });

        // Update this review and rating in course
        const ratedCourse = await Course.findByIdAndUpdate(courseId, { $push: { ratingAndReviews: createdRating._id } }, { new: true });

        // Return response
        return res.status(200).json({
            success: true,
            message: "Rating and Reviewed successfully",
            createdRating
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating a rating",
            error
        });
    }
}

const getAverageRating = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Find course and calculate rating
        const averagRatings = await RatingAndReview.aggregate([
            { $match: { course: courseId } },
            {
                $group: {
                    _id: null,
                    average: { $avg: "$rating" },
                }
            }
        ]);

        if (averagRatings.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Average ratings fetched successfully",
                averagRatings: averagRatings[0].average,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Average rating is 0",
            averagRatings: 0,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching average rating",
            error
        });
    }
}

const getAllRatingAndReviews = async (req, res) => {
    try {
        const result = await RatingAndReview.find({}).sort({ rating: -1 }).populate("user").populate("course");
        return res.status(200).json({
            success: true,
            message: "Rating and reviews are fetched successfully.",

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching all ratings and reviews",
            error
        });
    }
}

const getSpecificCourseRatings = async (req, res) => {
    try {
        const { courseId } = req.body;

        const ratingDetails = await RatingAndReview.findOne({ course: courseId }).populate("user").populate("course");

        return res.status(200).json({
            success: true,
            message: "Rating and review fetched successfully for course id -> " + courseId,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching specific course ratings and reviews",
            error
        });
    }
}


module.exports = { createRatingAndReview, getAverageRating, getAllRatingAndReviews, getSpecificCourseRatings };