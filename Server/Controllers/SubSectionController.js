const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section");
const Course = require("../Models/Course");
const { uploadOnCloudinary } = require("../Utils/imageUploader");

const createSubSection = async (req, res) => {
    try {
        // get data from req body
        const { title, description, timeDuration, sectionId } = req.body;
        const video = req.files?.video;

        // validate
        if (!title || !description || !video) return res.status(400).json({
            success: false,
            message: "All fields are mandatory...",
        })

        // upload video on cloudinary
        const uploadedVideo = await uploadOnCloudinary(video, process.env.FOLDER_NAME);

        // create an entry in db
        const createdSubSection = await SubSection.create({
            title, description, timeDuration, videoUrl: uploadedVideo.secure_url,
        })

        // insert this subsection id in section's entry
        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: { SubSection: createdSubSection._id }
        }, { new: true }).populate("SubSection");

        // return reponse
        return res.status(200).json({
            success: true,
            message: "Subsection created successfully.",
            updatedSection,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in creating a subsection",
            error,
        })
    }
}

const updateSubSection = async (req, res) => {
    try {
        // Fetch details from req body.
        const { title, description, subSectionId, sectionId } = req.body;
        let videoFile = req.files?.video;

        // Validate
        if (!title || !description || !subSectionId || !sectionId) return res.status(400).json({
            success: false,
            message: "Please fill all the fields.",
        });

        // If video is updated then upload on cloudinary.
        let uploadedVideo;
        if (videoFile) {
            uploadedVideo = await uploadOnCloudinary(videoFile, process.env.FOLDER_NAME);
        }

        // update section entry in db.
        await SubSection.findByIdAndUpdate(subSectionId, {
            title, description, videoUrl: uploadedVideo?.secure_url
        });

        // Updated Section
        const updatedSection = await Section.findById(sectionId).populate("SubSection");

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

const deleteSubSection = async (req, res) => {
    try {
        const { sectionId, subSectionId } = req.body;

        if (!sectionId || !subSectionId) return res.status(400).json({
            success: false,
            message: "Could not delete subsection!"
        });

        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $pull: { SubSection: subSectionId }
        }, { new: true }).populate("SubSection");

        await SubSection.deleteOne({ _id: subSectionId });

        return res.status(200).json({
            success: true,
            message: "Sub section deleted successfully...",
            updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the subsection",
        })
    }
}

module.exports = { createSubSection, updateSubSection, deleteSubSection };