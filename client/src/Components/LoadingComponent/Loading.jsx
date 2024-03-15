import React from "react";
import loading from "../../Images/giphy.gif";
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <>
      <div className={styles.loadingDiv}>
        <img src={loading} alt="Loading..."/>
      </div>
    </>
  );
};

export default Loading;
