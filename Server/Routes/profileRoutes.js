const express = require("express");
const router = express.Router();

const { deleteProfile, updateProfile, getUserDetails, updateDisplayPicture, changePassword } = require("../Controllers/ProfileController");
const { auth, isStudent } = require("../Middlewares/AuthMiddleware");

router.delete("/deleteProfile", auth, isStudent, deleteProfile);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);

// router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put('/change-password', auth, changePassword);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;