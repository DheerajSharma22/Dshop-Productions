import React from "react";
import styles from "./OrderDetails.module.css";
import p1 from "../../../Images/p1.jpg";

const OrderDetails = () => {
  return (
    <>
      <div className={styles.adminProductsWrapper}>
        <div className={styles.adminHeadWrapper}>
          <button><i class="fa-solid fa-arrow-left"></i>Back To Orders</button>
        </div>
        <div className={styles.innerProductWrapper}>
          <div className={styles.innerHeadWrapper}>
            <div className={styles.customerInfo}>
              <h3>customer info</h3>
              <div>
                <i className="fa-solid fa-user"></i>
                <div>
                  <h4>Dheeraj Sharma</h4>
                  <p>Admin</p>
                  <p>ds@dsexample.com</p>
                </div>
              </div>
            </div>
            <div className={styles.orderInfo}>
              <h3>order info</h3>
              <div>
                <i className="fa-solid fa-truck"></i>
                <div>
                  <p>
                    Order ID: <span>ORDER_KPCJSZBQESWVNB</span>
                  </p>

                  <p>
                    Pay Method: <span>RazorPay</span>
                  </p>
                  <p>
                    Date: <span>2022-10-03</span>
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.addressInfo}>
              <h3>address</h3>
              <div>
                <i className="fa-solid fa-location"></i>
                <div>
                  <p>41, Kamal Colony</p>
                  <p>Ujjain, Madhy Pradesh</p>
                  <p>India</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.innerContentWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <img src={p1} alt="" />
                      <p>Nike Slim Shirt</p>
                    </div>
                  </td>
                  <td>$100</td>
                  <td>5</td>
                  <td>$500</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <img src={p1} alt="" />
                      <p>Nike Slim Shirt</p>
                    </div>
                  </td>
                  <td>$100</td>
                  <td>5</td>
                  <td>$500</td>
                </tr>
              </tbody>
            </table>

            <div className={styles.bottomTableWrapper}>
              <table>
                <thead>
                  <tr>
                    <th>
                      <p>subtotal</p>
                      <p>$500</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p>shipping</p>
                      <p>$10</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p>tax</p>
                      <p>$12.25</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p>total</p>
                      <p>$522.25</p>
                    </th>
                  </tr>
                  <tr>
                    <th>
                      <p>status</p>
                      <p className={styles.paid}>paid</p>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className={styles.buttonWrapper}>
              <button>Mark as delivered</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
