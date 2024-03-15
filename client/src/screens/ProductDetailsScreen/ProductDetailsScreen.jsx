import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetails,
  setProductId,
} from "../../redux/Slice/productSlice";
import { useEffect } from "react";
import "./productDetailsScreen.css";
import { useState } from "react";
import Loading from '../../Components/LoadingComponent/Loading';

const ProductDetailsScreen = () => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const params = useParams();
  const { productDetails, productDetailsLoading } = useSelector(
    (state) => state.productReducer
  );

  useEffect(() => {
    dispatch(setProductId(params.id));
    dispatch(getProductDetails());
  }, []);

  const addToCartHandler = () => {
    navigate(`/cart/${params.id.split(':')[1]}?qty=${qty}`);
  };

  if (productDetailsLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="container productScreen">
      <div className="innerContainer">
        <div className="imgDiv">
          <img
            src={productDetails.image}
            alt="product"
            className="productImg"
          />
        </div>
        <div className="sideContent">
          <h2 className="productName">{productDetails.name}</h2>
          <p className="product-price">₹{productDetails.price}</p>
          <h3>Product Details</h3>
          <p className="product-description">{productDetails.description}</p>
          {productDetails.countInStock ? (
            <select
              className="productQty"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            >
              {[...Array(productDetails.countInStock).keys()].map((x) => (
                <option key={x}>{x + 1}</option>
              ))}
            </select>
          ) : (
            <span className="stockUnavail">Stock is Unavailable</span>
          )}
          {productDetails.countInStock ? (
            // <Link to="/cart">
              <button
                className="addToCartBtn"
                onClick={addToCartHandler}
              >
                Add To Cart
              </button>
            // </Link>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* <hr />
      <ReviewComponent /> */}
    </div>
  );
};

export default ProductDetailsScreen;


