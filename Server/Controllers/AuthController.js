const Otp = require("../Models/Otp");
const User = require("../Models/User");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const Profile = require("../Models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../Utils/mailSender");

const sendOtp = async (req, res) => {
    try {
        // Fetching email from request's body.
        const { email } = req.body;

        // Check if user with this email is already registered.
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(401).json({
            success: false,
            message: "User with this email already exists",
        });

        // Generating new otp
        console.log("generating otp");
        let otp = otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        })

        // Check for uniqueness of otp and again generating otp.
        let otpExist = await Otp.findOne({ email, otp });
        while (otpExist) {
            otp = otpGenerator.generate(6, {
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            })

            otpExist = await Otp.find({ otp });
        }

        // Create an entry in db for otp.
        console.log("Otp Not exists");
        const createdOtp = await Otp.create({ email, otp });
        return res.status(200).json({
            success: true,
            message: "Otp Generated Successfully",
            createdOtp,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in generating otp",
            error,
        })
    }
};

const signup = async (req, res) => {
    try {
        // Fetching data from request's body
        const { email, firstName, lastName, password, confirmPassword, accountType, otp } = req.body;

        // Validate kro
        if (!email || !firstName || !lastName || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        // Validate Passwords
        if (password !== confirmPassword) return res.status(400).json({
            success: false,
            message: "Passwords are not matching",
        })

        // Check user exists or not.
        const userExists = await User.findOne({ email });

        if (userExists) return res.status(401).json({
            success: false,
            message: "User with this email already exists",
        });


        // Find most recent otp stored for user.
        const recentOTP = await Otp.find({ email, otp }).sort({ createdAt: -1 }).limit(1);
        console.log("recentOtp ", recentOTP);

        // Validate Otp
        if (recentOTP.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Otp expires! Please generate otp again",
            })
        }
        else if (otp !== recentOTP[0].otp) return res.status(400).json({
            success: false,
            message: "Invailid Otp",
        })

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a empty profile.
        const createdProfile = await Profile.create({
            dateOfBirth: null,
            about: null,
            gender: null,
            contactNumber: null,
        });

        // Store user details in db
        const createdUser = await User.create({
            firstName, lastName, email, accountType, password: hashedPassword,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
            additionalDetails: createdProfile._id
        })

        return res.status(200).send({
            success: true,
            message: "User created successfully",
            createdUser,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong in singing up",
            error,
        })
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate.
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields..."
            });
        }

        // Check user in db.
        let userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).send({
                success: false,
                message: "User is not registered! Please register first.",
            })
        }

        // Check for password.
        const checkPass = await bcrypt.compare(password, userExists.password);

        if (!checkPass) {
            return res.status(400).send({
                success: false,
                message: "Invailid details",
            })
        }

        // Generate token.
        const payload = {
            id: userExists._id,
            email: userExists.email,
            accountType: userExists.accountType,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '2h'
        });

        // Updating user object
        userExists = userExists.toObject();
        userExists.token = token;
        userExists.password = undefined;

        // Store cookie
        res.cookie("jwtToken", token, {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: true,
        }).send({
            success: true,
            User: userExists,
            token,
            message: "Loggedin Successfully."
        });
        

        // Return res.
        // return res.status(200)
    } catch (error) {
        // Return res.
        return res.status(500).send({
            success: false,
            message: "Internal server error in login.",
            err: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("jwtToken");
        return res.status(200).json({
            success: true,
            message: "Logged Out Successfully...",
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error in logout.",
            err: error.message,
        });
    }
};

module.exports = { sendOtp, signup, login, logout };