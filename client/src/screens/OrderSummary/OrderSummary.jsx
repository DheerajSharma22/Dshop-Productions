import React from "react";
import styles from "./OrderSummary.module.css";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrders } from "../../redux/Slice/AdminSlice/adminSlice";
import Loading from '../../Components/LoadingComponent/Loading';

const OrderSummary = () => {
  const { search } = useLocation();
  const { orders } = useSelector((state) => state.adminReducer);
  const [order, setOrder] = useState();

  useEffect(() => {
    fetchOrders();
    const orderId = search.split("=")[1];
    if (orders) {
      const item = orders.filter((curElem) => curElem.order_id === orderId);
      setOrder(item);
    }
  }, [orders]);

  if (!order) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.OrderSummaryWrapper}>
        <h3>Order Summary</h3>
        <div className={styles.outerWrapper}>

          <div className={styles.headWrapper}>
            <div>
              <h4>Order</h4>
              <p>{order[0].order_id}</p>
            </div>
            <div>
              <h4>Date</h4>
              <p>{order[0].createdAt.split("T")[0]}</p>
            </div>
            <div>
              <h4>Total Amount</h4>
              <p>${order[0].totalPrice}</p>
            </div>
          </div>
          {order[0].orderItems.map((curElem, index) => {
            return (
              <div className={styles.contentWrapper} key={index}>
                <div>
                  <img src={curElem.image} alt="" />
                  <div className={styles.right}>
                    <div>
                      <h5>{curElem.name}</h5>
                      <h5>${curElem.price}</h5>
                    </div>
                    <p>
                      {curElem.description
                        ? curElem.description
                        : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo commodi modi, eligendi eaque similique vero vitae quis dolorum fugiat? Ducimus.Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo commodi modi, eligendi eaque similique vero vitae quis dolorum fugiat? Ducimus.Lorem ipsum dolor sit amet consectetur adipisicing elit"}
                    </p>
                  </div>
                </div>
                <div className={styles.buttonDiv}>
                  <Link to={`/products/:${curElem.product_id}`}><button>View Product</button></Link>
                  <Link to="/privateRoutes/payment"><button>Buy Again</button></Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
