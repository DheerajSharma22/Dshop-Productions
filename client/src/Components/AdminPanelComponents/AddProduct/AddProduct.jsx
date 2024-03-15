import React from "react";
import styles from "./AddProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  addProducts,
  updateProducts,
} from "../../../redux/Slice/AdminSlice/adminSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [isDisabled, setIsDisabled] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    category: "--select--",
    price: "",
    description: "",
    image: "",
    countInStock: "",
  });
  const { categories } = useSelector((state) => state.adminReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      product.name !== "" &&
      product.brand !== "" &&
      product.category !== "" &&
      product.price !== "" &&
      product.description !== "" &&
      product.image !== "" &&
      product.countInStock !== ""
    ) {
      setIsDisabled(false);
    }
  }, [product]);

  useEffect(() => {
    if (state) {
      setProduct(state.product);
    }
  }, []);

  const addNewProduct = () => {
    console.log(product);
    dispatch(addProducts(product));
    alert("Product Added");
    setProduct({
      name: "",
      brand: "",
      category: "--select--",
      price: "",
      description: "",
      image: "",
      countInStock: "",
    });
  };

  const updateProduct = () => {
    dispatch(updateProducts(state.product._id, product));
    toast.success("Product Updated Successfullly");
    setProduct({
      name: "",
      brand: "",
      category: "--select--",
      price: "",
      description: "",
      image: "",
      countInStock: "",
    });
  };
  const goToProducts = () => {
    navigate("/admin/products");
  };

  return (
    <div className={styles.adminProductsWrapper}>
      <div className={styles.adminHeadWrapper}>
        <h3>{state ? "Update Product" : "Add Product"}</h3>
        <div>
          <button onClick={goToProducts}>Go to products</button>
        </div>
      </div>
      <div className={styles.innerProductWrapper}>
        <div>
          <label htmlFor="title">Product Name</label>
          <input
            type="text"
            placeholder="Enter The Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="title">Product Brand</label>
          <input
            type="text"
            placeholder="Enter The Product Brand"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="title">Price</label>
          <input
            type="text"
            placeholder="Enter The Product Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="title">Count In Stock</label>
          <input
            type="text"
            placeholder="Count In Stock"
            value={product.countInStock}
            onChange={(e) =>
              setProduct({ ...product, countInStock: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="title">Categories</label>
          {categories.length > 0 ? (
            <select
              className="category"
              value={product.category}
              onChange={(e) => {
                setProduct({ ...product, category: e.target.value });
              }}
            >
              {categories.map((item, index) => {
                return <option key={index}>{item.slug}</option>;
              })}
            </select>
          ) : (
            "--select--"
          )}
        </div>
        <div>
          <label htmlFor="title">Product Description</label>
          <textarea
            placeholder="Enter The Product Description"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="title">Product Image</label>
          <input
            type="text"
            placeholder="Enter The Image URL"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
        </div>
        <div className={styles.buttonWrapper}>
          {!state ? (
            <button onClick={addNewProduct} disabled={isDisabled}>
              Add Now
            </button>
          ) : (
            <button onClick={updateProduct} disabled={isDisabled}>
              Update Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
