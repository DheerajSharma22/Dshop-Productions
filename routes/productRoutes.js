const express = require("express");
const productRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const ProductModel = require("../models/productModel.js");

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await ProductModel.find({});
    res.status(200).send(products);
  })
);

productRouter.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    await ProductModel.remove({});
    const insertData = await ProductModel.insertMany(data);
    res.status(200).send({ insertData });
  })
);

productRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(400).send("Product Not Found");
    }
  })
);

module.exports = productRouter;
