const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 4,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    numReviews: {
      type: Number,
      default: 21,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = new mongoose.model("product", productSchema);
module.exports = ProductModel;