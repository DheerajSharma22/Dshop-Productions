const User = require("../Models/User");
const Profile = require("../Models/Profile");
const { uploadOnCloudinary } = require("../Utils/imageUploader");
const Course = require('../Models/Course');

const updateProfile = async (req, res) => {
    try {
        const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

        // Validate
        if (!contactNumber || !gender) return res.status(400).json({
            success: false,
            message: "Please fill required fields",
        });

        // Get user details to find profile id
        const userDetails = await User.findById(req.user.id);

        // Update profile.
        const updatedProfile = await Profile.findByIdAndUpdate({ _id: userDetails.additionalDetails }, {
            dateOfBirth, about, contactNumber, gender
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            updatedProfile,
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while updating a profile",
            error,
        })
    }
};

const deleteProfile = async (req, res) => {
    try {
        // get id
        const id = req.user.id;

        // Get user details to find user's profile id
        const userDetails = await User.findOne({ _id: id });
        
        // First delete addition details
        await Profile.findByIdAndDelete(userDetails.additionalDetails);

        // HW: Delete this user from enrolled students if it is enrolled in any course
        
        // HW: How can we schedule this delete request.

        // HW: Cron job

        // Delete the user
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "User account deleted successfully.",
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while deleting a profile",
            error,
        })
    }
}

const getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const userDetails = await User.findById(userId).populate("additionalDetails").exec();
        if (!userDetails) return res.status(400).json({
            success: false,
            message: "User not found with this user id -> " + userId,
        })

        return res.status(200).json({
            success: true,
            message: "User details found successfully",
            userDetails
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while getting user details...",
            error,
        })
    }
}

const updateDisplayPicture = async (req, res) => {
    try {
        // Get the image which we want to update
        const { image } = req.files;

        // Get user id
        const userId = req.user.id;

        // Validate
        if (!image) return res.status(400).json({
            success: false,
            message: "Please select an image",
        });

        // Upload on cloudinary
        const uploadedImage = await uploadOnCloudinary(image, process.env.FOLDER_NAME, 50);

        // Update entry in db.

        const updatedProfileImg = await User.findByIdAndUpdate({ _id: userId }, { image: uploadedImage.secure_url }, {new: true,})

        // Send Response
        return res.status(200).json({
            success: true,
            message: "Profile picture uploaded successfully.",
            updatedProfileImg
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating user profile picture...",
            error,
        })
    }
}

const changePassword = async (req, res) => {
    try {
        // Fetch data from request's body.
        const { currPassword, newPassword } = req.body;

        // validation
        if (!currPassword || !newPassword) return res.status(400).json({
            success: false,
            message: "Please fill all the fields",
        });

        // Find the user which we want to delete
        const user = await User.findOne({ _id: req.user.id });

        // Match current password
        const comparePassword = await bcrypt.compare(currPassword, user.password);
        if (!comparePassword) return res.status(400).json({
            success: false,
            message: "Invailid Current Password",
        });

        // hash password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // update password in db
        user.password = hashedPassword;
        await user.save();

        // send mail of password change
        await mailSender(user.email, "Password Changed", "Your password has been changed successfully...");

        // send response.
        return res.status(200).json({
            success: true,
            message: "Password Changed Successfully...",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error in change password.",
            err: error.message,
        });
    }
};


module.exports = { updateProfile, deleteProfile, getUserDetails, updateDisplayPicture, changePassword };