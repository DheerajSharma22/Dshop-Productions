const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const auth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split("Bearer ")[1];
        const verifyUser = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: verifyUser._id });

        req.token = token;
        req.user = user;

        return next();
    } catch (error) {
        console.log(error);
        res.status(401).send("User Not Authorized");
    }
}


module.exports = auth;