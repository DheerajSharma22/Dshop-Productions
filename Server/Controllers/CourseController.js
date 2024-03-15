const Course = require("../Models/Course");
const { uploadOnCloudinary } = require("../Utils/imageUploader");
const User = require("../Models/User")
const Categories = require("../Models/Category");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");
const CourseProgress = require("../Models/CourseProgress");

const createCourse = async (req, res) => {
    try {
        // Fetch data from req body.
        const { courseName, courseDescription, whatYouWillLearn, price, category, tags, status, language, instructions } = req.body;
        const thumbnail = req?.files?.thumbnail;

        // console.log(courseName, courseDescription, whatYouWillLearn, price, category, tags, status, language, instructions, thumbnail);
        
        // Validate
        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail || !instructions) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields...",
            })
        }

        if (!status) status = "DRAFTED";

        // Check if this course is exists with this name, instructor and price
        const courseExists = await Course.findOne({ courseName, price, instructor: req.user.id });
        if (courseExists) return res.status(400).json({
            success: false,
            message: "Course with same name exists already!",
        });

        // Find the tag entry in db with given tag.
        const categoryDetails = await Categories.findById(category);
        if (!categoryDetails) return res.status(400).json({
            success: false,
            message: "No tag is available with this name",
        });


        // Upload course thumbnail on cloudinary.
        const thumbnailImage = await uploadOnCloudinary(thumbnail, process.env.FOLDER_NAME);

        // Save the course entry in db.
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: req.user.id,
            whatYouWillLearn,
            price,
            category,
            thumbnail: thumbnailImage.secure_url,
            tags: tags ? tags : "",
            instructions,
            status,
            language
        });

        // Update this course entry in instructor's course and category's course
        await User.findByIdAndUpdate(req.user.id, {
            $push: { courses: newCourse._id },
        })

        await Categories.findByIdAndUpdate(category, {
            $push: { courses: newCourse._id },
        })

        // return res
        return res.status(200).json({
            success: true,
            message: "Course created successfully...",
            newCourse,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong while creating a course",
            error,
        })
    }
}

const updateCourse = async (req, res) => {
    try {
        // Fetch data
        const { courseId } = req.body;
        const updates = req.body;

        // Finding course with input id.
        const course = await Course.findOne({ _id: courseId });

        // Check for course exists or not.
        if (!course) return res.status(404).json({
            success: false,
            message: "Course not found",
        });

        // If thumnail image is found, update it
        if (req.files) {
            const thumbnail = req.files.thumnail;
            const thumbnailImage = await uploadOnCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage;
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tags" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                }
                else {
                    course[key] = updates[key];
                }
            }
        }

        // save this course in db
        await course.save();

        const updatedCourse = await Course.findOne({ _id: courseId }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails"
            }
        }).populate({
            path: "courseContent",
            populate: {
                path: "SubSection",
            }
        }).populate("ratingAndReviews").populate("category");

        // Send response
        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            updatedCourse
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong while updating a course",
            error,
        })
    }
}

const deleteCourse = async (req, res) => {
    try {
        // Get course id from req
        const { id: courseId } = req.params;

        // Validate
        if (!courseId) return res.status(400).json({
            success: false,
            message: "Course id is not recieved",
        });

        // Finding course with this course id
        const course = await Course.findOne({ _id: courseId });

        // If Course Not Found
        if (!course) return res.status(404).json({
            success: false,
            message: "Course Not Found!",
        });

        // Delete this course from enrolled students courses field
        for (const student of course.studentsEnrolled) {
            await User.findByIdAndUpdate(student, {
                $pull: { courses: courseId }
            });
        }

        // Delete this course from instructor's courses
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { courses: courseId }
        });

        // Delete all sections & subsections of this course
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.SubSection;
                for (const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }

            // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }


        // Finally delete the course
        await Course.findByIdAndDelete(courseId);

        // Send Response
        return res.status(200).json({
            success: true,
            message: "Course Deleted Successfully...",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong while deleting a course",
            error,
        })
    }

}

const getFullCourseDetails = async (req, res) => {
    try {
        const { id: courseId } = req.params;
        const userId = req.user.id;

        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "SubSection",
                },
            })
            .exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.SubSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            success: true,
            courseDetails,
            // totalDuration,
            completedVideos: courseProgressCount?.completedVideos
                ? courseProgressCount?.completedVideos
                : [],
            message: "Course Details Found Successfully.."

        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}



const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        }).populate("category").populate("ratingAndReviews").populate({
            path: "courseContent",
            populate: {
                path: "SubSection",
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully...",
            courses,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong while fetching courses",
            error,
        })
    }
}

const getCourseDetails = async (req, res) => {
    try {
        // Get course id
        const { courseId } = req.body;

        // Validate
        if (!courseId) return res.status(400).json({
            success: false,
            message: "Course id is not provided.",
        });

        // Find course
        const courseDetails = await Course.findOne({ _id: courseId }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        }).populate("category").populate("ratingAndReviews").populate({
            path: "courseContent",
            populate: {
                path: "SubSection",
            }
        }).exec();

        if (!courseDetails) return res.status(400).json({
            success: false,
            message: "Course Not Found",
        });

        // Return response.
        return res.status(200).json({
            success: true,
            message: "Course details are fetched successfully...",
            courseDetails,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong while fetching a course",
            error
        })
    }
}

const getInstructorCourses = async (req, res) => {
    try {
        // Getting user id from req
        const userId = req.user.id;

        // Getting courses for this user id
        const courses = await Course.find({ instructor: userId }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            }
        }).populate("category").populate("ratingAndReviews").populate({
            path: "courseContent",
            populate: {
                path: "SubSection",
            }
        }).exec();

        // Send response
        return res.status(200).json({
            success: true,
            message: "Courses fetched successfully...",
            courses,
        });
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Something went wrong while fetching instructor courses",
            error
        })
    }
}

module.exports = { createCourse, getAllCourses, getCourseDetails, deleteCourse, getFullCourseDetails, updateCourse, getInstructorCourses };