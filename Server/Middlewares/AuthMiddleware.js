const jwt = require("jsonwebtoken");

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwtToken;

        // check token exists or not.
        if (!token) return res.status(401).json({
            success: false, message: "User is not authorized!",
        })
        
        // Verify the token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);

            // Attach this payload with req body
            req.user = payload;
        } catch (error) {
            return res.status(401).json({
                success: false, message: "User is not authorized!",
            })
        }


        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying token",
            error: error.message,
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).send("This route is only for students");
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while authorizing student",
            error: error.message,
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).send("This route is only for instructor");
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while authorizing instructor",
            error: error.message,
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).send("This route is only for admin");
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while authorizing admin",
            error: error.message,
        })
    }
}