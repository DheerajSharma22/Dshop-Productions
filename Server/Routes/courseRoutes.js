const express = require("express");
const router = express.Router();

const { createCourse, getAllCourses, getCourseDetails, updateCourse, getInstructorCourses, deleteCourse, getFullCourseDetails } = require("../Controllers/CourseController");
const { createSection, updateSection, deleteSection } = require("../Controllers/SectionController");
const { createSubSection, updateSubSection, deleteSubSection } = require("../Controllers/SubSectionController");
const { createRatingAndReview, getAverageRating, getAllRatingAndReviews } = require("../Controllers/RatingAndReviewController");
const { getAllCategories, getCategoryPageDetails, createCategory } = require("../Controllers/CategoryController");
const { auth, isAdmin, isInstructor } = require("../Middlewares/AuthMiddleware");

// Course
router.post('/createCourse', auth, isInstructor, createCourse);
router.put("/updateCourse", auth, isInstructor, updateCourse);
router.delete("/deleteCourse/:id", auth, isInstructor, deleteCourse);
router.get("/getFullCourseDetails/:id", auth, isInstructor, getFullCourseDetails)
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);

// Sections
router.post("/addSection", auth, isInstructor, createSection);
router.put("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);


// Subsections
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Categories
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", getAllCategories);
router.post("/getCategoryPageDetails", getCategoryPageDetails);


// Rating & Review
router.post("/createRating", auth, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingAndReviews);

module.exports = router;