import React from "react";
import styles from "./PaymentProcess.module.css";

const PaymentProcess = ({process}) => {
  return (
    <div className={styles.PaymentProcess}>
      <div  className={`${styles.end} ${process >= 1 ? styles.redBgc : ""}`}>
        <div></div>
        <p>Signin</p>
      </div>
      <div className={`${styles.end} ${process >= 2 ? styles.redBgc : ""}`}>
        <div></div>
        <p>Shipping Address</p>
      </div>
      <div className={`${styles.end} ${process >= 3 ? styles.redBgc : ""}`}>
        <div></div>
        <p>Place Order</p>
      </div>
    </div>
  );
};

export default PaymentProcess;
