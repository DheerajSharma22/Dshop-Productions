import React from "react";
import { useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {removeProduct} from '../../../redux/Slice/AdminSlice/adminSlice';
import styles from "./ProductCard.module.css";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateHandler = () => {
    navigate("/admin/addproduct", { state: { product } });
  };

  const removeHandler = () => {
    dispatch(removeProduct(product._id));
    toast.success("Product deleted successfully...");
  };


  return (
    <div className={styles.cardWrapper}>
      <img src={product.image} alt="" />
      <div className={styles.cardBodyWrapper}>
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <div className={styles.buttonWrapper}>
          <button onClick={updateHandler}>
            <i className="fa-solid fa-edit edit"></i>
          </button>
          <button onClick={removeHandler}>
            <i className="fa-solid fa-trash delete"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
