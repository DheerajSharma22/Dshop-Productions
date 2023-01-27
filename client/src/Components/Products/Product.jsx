import React from "react";
import Card from "./Card/Card";
import "./Product.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Product = () => {
  const { products } = useSelector((state) => state.productReducer);
  return (
    <>
      <div className="container">
        <div className="headingDiv">
          <h2 className="common-heading">Featured Products</h2>
        </div>
        <div className="cardBox">
          {products.length <= 0 ? (
            <h1>Products Not Found...</h1>
          ) : (
            products.map((curElem, index) => {
              return (
                <Link to={`/products/:${curElem._id}`} key={index}>
                  <Card
                    productName={curElem.name}
                    imgSrc={curElem.image}
                    price={curElem.price}
                    rating={curElem.rating}
                  />
                </Link>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Product;
