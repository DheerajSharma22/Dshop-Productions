import React from "react";
import Card from "../../../Components/Products/Card/Card";
import styles from "./ListPanel.module.css";
import { Link } from "react-router-dom";

const ListPanel = ({ products }) => {
  return (
    <div className={`py-2 ${styles.listWrapper}`}>
      <div className={styles.labelWrapper}>
        <h3 className={styles.productLabel}>Products</h3>
      </div>
      <div className={styles.cardWrapper}>
        {products.map((curElem, index) => {
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
        })}
      </div>
    </div>
  );
};

export default ListPanel;
