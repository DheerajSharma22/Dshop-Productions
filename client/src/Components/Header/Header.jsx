import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const { products } = useSelector((state) => state.cartReducer);
  const {user, token} = useSelector((state) => state.userReducer);

  const [active, setActive] = useState(false);
  const toggleMenu = (id) => {
    if (id === "bars") {
      setActive(true);
    } else {
      setActive(false);
    }
  };

  if (location.pathname.includes("/admin")) {
    return;
  }

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="item1">
            <Link to="/" className="logoBoxLink">
              <div className="logoBox">
                <i className="fa-solid fa-cart-shopping"></i>
                <h2 className="logo">DShop</h2>
              </div>
            </Link>
            <button
              className={`toggleBtn ${active ? "notActive" : ""}`}
              onClick={() => toggleMenu("bars")}
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <button
              className={`toggleBtn ${active ? "" : "notActive"}`}
              onClick={() => toggleMenu("cross")}
            >
              <i className="fa-solid fa-multiply"></i>
            </button>
          </div>
          <div className={`item3 ${active ? "" : "notActive"}`} id="item3">
            <ul>
              <li onClick={() => toggleMenu("cross")}>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li onClick={() => toggleMenu("cross")}>
                <Link to="/productScreen" className="nav-link">
                  Products
                </Link>
              </li>
            </ul>
          </div>
          <div className={`item2 ${active ? "" : "notActive"}`} id="item2">
            <div onClick={() => toggleMenu("cross")}>
              <Link to="/cart" className="cartLink">
                <i className="fa-solid fa-cart-shopping"></i>
                {products.length ? <span>{products.length}</span> : ""}
              </Link>
            </div>

            {token ? (
              <div className="userDiv">
                <Link
                  to={`/privateRoutes/userprofile?id=${user?._id}`}
                  className="userLinks"
                >
                  <i className="fa-solid fa-user user"></i>
                </Link>
              </div>
            ) : (
              <Link
                to="/public/register"
                className="regLink"
                state={{ from: location }}
              >
                <button className="registerBtn">
                  Register
                </button>
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
