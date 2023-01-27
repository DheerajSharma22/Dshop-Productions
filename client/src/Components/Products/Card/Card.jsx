import React from "react";
import "./Card.css";

const Card = ({ productName, imgSrc, price, rating }) => {
  return (
    <div>
      <div className="card-body">
        <img src={imgSrc} alt="" className="cardImg" />
        <div className="content">
          <h3 className="productName">{productName}</h3>
          <div className="ratingDiv">
            <span>
              <i
                className={
                  rating >= 1
                    ? "fa-solid fa-star"
                    : rating >= 0.5
                    ? "fa-solid fa-star-half"
                    : "fa-regular fa-star"
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 2
                    ? "fa-solid fa-star"
                    : rating >= 1.5
                    ? "fa-solid fa-star-half"
                    : "fa-regular fa-star"
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 3
                    ? "fa-solid fa-star"
                    : rating >= 2.5
                    ? "fa-solid fa-star-half"
                    : "fa-regular fa-star"
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 4
                    ? "fa-solid fa-star"
                    : rating >= 3.5
                    ? "fa-solid fa-star-half"
                    : "fa-regular fa-star"
                }
              ></i>
            </span>
            <span>
              <i
                className={
                  rating >= 5
                    ? "fa-solid fa-star"
                    : rating >= 4.5
                    ? "fa-solid fa-star-half"
                    : "fa-regular fa-star"
                }
              ></i>
            </span>
          </div>
          <p className="price">₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
