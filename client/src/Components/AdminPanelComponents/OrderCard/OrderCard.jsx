import React from "react";
import styles from "./OrderCard.module.css";
import { useSelector } from 'react-redux';

const OrderCard = () => {
  const {orders} = useSelector((state) => state.adminReducer);
  return (
    <div className={styles.ordersDiv}>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>order</th>
            <th>payment status</th>
            <th>date</th>
            <th>status</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          <></>
          {orders
            ? orders.map((curElem, index) => {
                return (
                  <tr key={index}>
                    <td>{curElem.user}</td>
                    <td>{curElem.order_id}</td>
                    <td>{curElem.isPaid ? <span>paid</span> : "due"}</td>
                    <td>{curElem.createdAt}</td>
                    <td>{curElem.isDelivered ? "Delivered" : "Not Delivered"}</td>
                    <td>${curElem.totalPrice}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default OrderCard;
