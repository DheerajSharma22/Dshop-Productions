import React from "react";
import styles from "./AdminPanelScreen.module.css";
import { Link, useNavigate } from "react-router-dom";
import AdminProducts from "../../Components/AdminPanelComponents/AdminProducts/AdminProducts";
import OrderDetails from "../../Components/AdminPanelComponents/OrderDetails/OrderDetails";
import AddProduct from "../../Components/AdminPanelComponents/AddProduct/AddProduct";
import AdminCategories from "../../Components/AdminPanelComponents/AdminCategories/AdminCategories";
import AdminDashboard from "../../Components/AdminPanelComponents/AdminDashboard/AdminDashboard";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';
import {
  fetchCategories,
  fetchOrders,
  fetchUsers,
} from "../../redux/Slice/AdminSlice/adminSlice";
import { useState } from "react";
import { setUser } from "../../redux/Slice/userSlice";
import Loading from '../../Components/LoadingComponent/Loading';

const AdminPanelScreen = ({ components }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const [toggleMenu, setToggleMenu] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
    dispatch(fetchCategories());
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.status === 200) {
        dispatch(setUser(null));
        navigate("/public/register");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className={styles.adminMainWrapper}>
      <div className={styles.leftPanel}>
        <div>
          <div>
            <h3>{user.name}</h3>
            <p className={styles.logoutBtn} onClick={logoutHandler}>logout</p>
          </div>
          <button
            className={toggleMenu ? "" : styles.activeMenu}
            onClick={() => setToggleMenu(true)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <button
            className={toggleMenu ? styles.activeMenu : ""}
            onClick={() => setToggleMenu(false)}
          >
            <i className="fa-solid fa-multiply"></i>
          </button>
        </div>
        <ul className={toggleMenu ? styles.activeMenu : ""}>
          <Link
            onClick={() => setToggleMenu(false)}
            to="/admin/dashboard"
            className={`${styles.menuLinks} ${
              location.pathname === "/admin/dashboard" ? styles.active : ""
            }`}
          >
            <li>
              <i className="fa-solid fa-house"></i>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link
            onClick={() => setToggleMenu(false)}
            to="/admin/users"
            className={`${styles.menuLinks} ${
              location.pathname === "/admin/users" ? styles.active : ""
            }`}
          >
            <li>
              <i className="fa-solid fa-user"></i>
              <span>Users</span>
            </li>
          </Link>
          <Link
            onClick={() => setToggleMenu(false)}
            to="/admin/products"
            className={`${styles.menuLinks} ${
              location.pathname === "/admin/products" ? styles.active : ""
            }`}
          >
            <li>
              <i className="fa-sharp fa-solid fa-bag-shopping"></i>
              <span>Products</span>
            </li>
          </Link>
          <Link
            onClick={() => setToggleMenu(false)}
            to="/admin/addproduct"
            className={`${styles.menuLinks} ${
              location.pathname === "/admin/addproduct" ? styles.active : ""
            }`}
          >
            <li>
              <i className="fa-solid fa-cart-plus"></i>
              <span>Add Product</span>
            </li>
          </Link>
          <Link
            onClick={() => setToggleMenu(false)}
            to="/admin/categories"
            className={`${styles.menuLinks} ${
              location.pathname === "/admin/categories" ? styles.active : ""
            }`}
          >
            <li>
              <i className="fa-solid fa-list-ul"></i>
              <span>Categories</span>
            </li>
          </Link>
          <Link
            onClick={() => setToggleMenu(false)}
            to="/admin/orders"
            className={`${styles.menuLinks} ${
              location.pathname === "/admin/orders" ? styles.active : ""
            }`}
          >
            <li>
              <i className="fa-solid fa-book"></i>
              <span>Orders</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className={styles.rightPanel}>
        {components === "dashboard" ? (
          <AdminDashboard />
        ) : components === "users" ? (
          <AdminProducts components="user" />
        ) : components === "products" ? (
          <AdminProducts components="product" />
        ) : components === "orders" ? (
          <AdminProducts components="order" />
        ) : components === "categories" ? (
          <AdminCategories />
        ) : components === "addproduct" ? (
          <AddProduct />
        ) : components === "order_details" ? (
          <OrderDetails />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminPanelScreen;
