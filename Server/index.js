// Improting express
const express = require("express");
const app = express();

// Importing routes
const userRoutes = require("./Routes/userRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const courseRoutes = require("./Routes/courseRoutes");
const profileRoutes = require("./Routes/profileRoutes");

// Importing db & cloudinary config
const connectToDB = require("./Config/db");
const connectWithCloudinary = require("./Config/cloudinary");


// Importing external packages
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");


// Configuring dotenv
require("dotenv").config();

// Defining the port
const PORT = process.env.PORT || 4000;

// Connecting with db & cloudinary.
connectToDB();
connectWithCloudinary();

// Using middlewares to parse json data, parse cookies and cors
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));

// Mounting all routes.
app.use("/api/auth", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payments", paymentRoutes);


app.listen(PORT, () => console.log("listening to the port no. ", PORT));