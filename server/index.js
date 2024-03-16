const express = require("express");
const userRouter = require("./routes/userRoutes");
const app = express();
const connectToMongo = require("./db.js");
const productRouter = require("./routes/productRoutes");
const paymentRouter = require("./routes/paymentRoutes");
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const cors = require('cors');
require("dotenv").config();

connectToMongo();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/payment", paymentRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});


app.listen(PORT, () => {
  console.log("server running at port no. " + PORT);
});
