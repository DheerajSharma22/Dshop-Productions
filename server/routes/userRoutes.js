const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

userRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    try {
      const { name, email, password, cpassword } = req.body;

      if (password !== cpassword) {
        // console.log("passwords are not matching");
        return res.status(401).send("Passwords are not matching...");
      }

      const isUserExists = await User.findOne({ email });
      if (isUserExists) {
        return res.status(401).send("User already exists with this email");
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const createNewUser = new User({
        name,
        email,
        password: hashPassword,
        cpassword: hashPassword,
      });

      // Generating Json Web Token
      const jwtToken = await createNewUser.generateAuthToken();

      res.cookie("jwtToken", jwtToken, {
        httpOnly: true,
      });

      const user = await createNewUser.save();
      res.status(200).json({user, jwtToken});
    } catch (error) {
      return res.status(500).send(error?.message);
    }
  })
);

userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).send("User Not Found");
      }

      // Generating Json Web Token
      const jwtToken = await user.generateAuthToken();
      res.cookie("jwtToken", jwtToken, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.status(401).send("Invailid Details...");
      }

      res.status(200).json({user, jwtToken});
    } catch (error) {
      return res.status(500).send(error?.message);
    }
  })
);

userRouter.get("/logout", auth, async (req, res) => {
  try {
    res.clearCookie("jwtToken");

    req.user.tokens = req.user.tokens.filter((elem) => {
      return elem.token !== req.token;
    });

    await req.user.save();
    res.status(200).send("Logout Successfully....");
  } catch (error) {
    res.status(500).send(error?.message);
  }
});

userRouter.get("/isAuthorized", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user?._id });
    if (user) {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(401).send("User Not Authorized");
  }
});

module.exports = userRouter;
