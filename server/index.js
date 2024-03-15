const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const data = require("./data");
const connectToMongo = require("./db.js");
const productRouter = require("./routes/productRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const path = require("path");
require("dotenv").config();

connectToMongo();

// Serving Static Files.
app.use(express.static(path.join(__dirname + '/client/build')));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/payment", paymentRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
})


app.listen(PORT, () => {
  console.log("server running at port no. " + PORT);
});
