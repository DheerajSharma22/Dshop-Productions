const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/userModel");
const PaymentModel = require("../models/paymentModel");
const adminRoutes = express.Router();
const ProductModel = require("../models/productModel");
const Category = require("../models/categoryModel");

// User Routess
adminRoutes.get("/users", auth, async (req, res) => {
  const users = await User.find({});
  res.send({ users });
});

// Order Routes
adminRoutes.get("/orders", auth, async (req, res) => {
  const orders = await PaymentModel.find({});
  res.send({ orders });
});

// Category Routes
adminRoutes.get("/categories", async (req, res) => {
  const categories = await Category.find({});
  res.send({ categories });
});

adminRoutes.post("/add_category", auth, async (req, res) => {
  const category = await new Category({
    name: req.body.name,
    slug: req.body.slug,
  });
  const result = await category.save();
  res.send(result);
});

adminRoutes.delete("/remove_category", auth, async (req, res) => {
  const category = await Category.deleteOne({ _id: req.body._id });
  res.send(category);
});

adminRoutes.put("/update_category", auth, async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        name: req.body.name,
      },
    }
  );
  res.status(200).send(category);
});


// Product Routes
adminRoutes.post("/add_product", auth, async (req, res) => {
  const { name, price, image, countInStock, description, category, brand } =
    req.body;

  const cretaeNewProduct = await new ProductModel({
    name,
    price,
    image,
    countInStock,
    description,
    category,
    brand,
  });
  const product = await cretaeNewProduct.save();
  res.send(product);
});

adminRoutes.put("/update_product", auth, async (req, res) => {
  const { name, price, image, countInStock, description, category, brand } =
    req.body;

  const product = await ProductModel.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $set: {
        name,
        price,
        image,
        countInStock,
        description,
        category,
        brand,
      },
    }
  );
  res.send(product);
});



adminRoutes.delete("/remove_product", auth, async (req, res) => {
  const deletedProduct = await ProductModel.deleteOne({ _id: req.body._id });
  res.status(200).send(deletedProduct);
});


module.exports = adminRoutes;
