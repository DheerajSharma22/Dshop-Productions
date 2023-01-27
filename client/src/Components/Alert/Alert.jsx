import React from "react";
import styles from "./Alert.module.css";

const Alert = ({ data, setNone, none }) => {
  
  //   console.log(data + " " + status);
  return (
    <div className={`${styles.error} ${styles.alert} ${none?styles.none:""}`}>
      <p>{data}</p>
      <span onClick={() => setNone(true)}><i className="fa-solid fa-xmark"></i></span>
    </div>
  );
};

export default Alert;
