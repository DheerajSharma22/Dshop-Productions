import React from "react";
import styles from "./AdminDashboard.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const { users, orders, categories } = useSelector(
    (state) => state.adminReducer
  );
  const { products } = useSelector((state) => state.productReducer);

  return (
    <div className={styles.adminProductsWrapper}>
      <div className={styles.adminHeadWrapper}>
        <h3>Dashboard</h3>
      </div>
      <div className={styles.innerWrapper}>
        <Link to="/admin/users" className={styles.Links}>
          <div className={styles.first}>
            <h3>
              <i className="fa fa-user"></i>Users
            </h3>
            <p>{users.length}</p>
          </div>
        </Link>
        <Link to="/admin/products" className={styles.Links}>
          <div className={styles.second}>
            <h3>
              <i className="fa-sharp fa-solid fa-bag-shopping"></i>Products
            </h3>
            <p>{products.length}</p>
          </div>
        </Link>
        <Link to="/admin/categories" className={styles.Links}>
          <div className={styles.third}>
            <h3>
              <i className="fa-solid fa-list-ul"></i>Categories
            </h3>
            <p>{categories.length > 0 ? categories.length - 1 : categories.length}</p>
          </div>
        </Link>
        <Link to="/admin/orders" className={styles.Links}>
          <div className={styles.fourth}>
            <h3>
              <i className="fa-solid fa-book"></i>Orders
            </h3>
            <p>{orders.length}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
