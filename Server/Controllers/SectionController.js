const Course = require("../Models/Course");
const Section = require("../Models/Section");
const mongoose = require('mongoose');

const createSection = async (req, res) => {
    try {
        // Fetch details from req body.
        const { sectionName, courseId } = req.body;

        // Validate
        if (!sectionName) return res.status(400).json({
            success: false,
            message: "Please fill all the fields.",
        });

        // Create entry in db.
        const createdSection = await Section.create({
            sectionName,
        })

        // Update this section in course entry.
        const courseDetails = await Course.findByIdAndUpdate(courseId, {
            $push: { courseContent: createdSection }
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "SubSection",

            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section created successfully...",
            courseDetails,
            createdSection,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in creating a section!",
            error,
        })
    }
}

const updateSection = async (req, res) => {
    try {
        // Fetch details from req body.
        const { sectionName, sectionId, courseId } = req.body;

        // Validate
        if (!sectionName || !sectionId || !courseId) return res.status(400).json({
            success: false,
            message: "Please fill all the fields.",
        });

        // update section entry in db.
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            sectionName,
        }, { new: true }).populate("SubSection").exec();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully...",
            updatedSection,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in updating a section!",
            error,
        })
    }
}

const deleteSection = async (req, res) => {
    try {
        // Fetch details from req params.
        const { sectionId, courseId } = req.body;

        // Validate
        if (!sectionId) return res.status(400).json({
            success: false,
            message: "Section id is not received.",
        });

        // delete this section from course
        const courseDetails = await Course.findByIdAndUpdate({ _id: courseId }, {
            $pull: { courseContent: sectionId }
        }, { new: true }).populate({
            path: "courseContent",
            populate: {
                path: "SubSection"
            }
        });


        // delete section entry in db.
        await Section.deleteOne({ _id: sectionId });

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully...",
            courseDetails
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in deleting a section!",
            error,
        })
    }
}

module.exports = { createSection, updateSection, deleteSection };