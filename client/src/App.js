import React, { useEffect } from "react";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen/ProductScreen";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "./redux/Slice/productSlice";
import ProductDetailsScreen from "./screens/ProductDetailsScreen/ProductDetailsScreen";
import CartScreen from "./screens/CartScreen/CartScreen.js";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import PaymentScreen from "./screens/PaymentScreen/PaymentScreen";
import {
  AdminRoute,
  ProtectedRoute,
  PublicRoutes,
} from "./Components/Routes/index";
import { setUserIfAuthorized } from "./redux/Slice/userSlice";
import PlaceOrderScreen from "./screens/PlaceOrderScreen/PlaceOrderScreen";
import PaymentSuccessScreen from "./screens/PaymentSuccessScreen/PaymentSuccessScreen";
import UserProfileScreen from "./screens/UserProfileScreen/UserProfileScreen";
import OrderSummary from "./screens/OrderSummary/OrderSummary";
import { fetchOrder } from "./redux/Slice/paymentSlice";
import AdminPanelScreen from "./screens/AdminPanelScreen/AdminPanelScreen";
import axios from "axios";

const App = () => {
  const { token } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    dispatch(setUserIfAuthorized());
    dispatch(setProduct());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Protected Routes */}
          <Route path="/privateRoutes/" element={<ProtectedRoute />}>
            <Route path="payment" element={<PaymentScreen />} />
            <Route path="orderScreen" element={<PlaceOrderScreen />} />
            <Route path="paymentsuccess" element={<PaymentSuccessScreen />} />
            <Route path="userprofile" element={<UserProfileScreen />} />
            <Route path="ordersummary" element={<OrderSummary />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/" element={<AdminRoute />}>
            <Route
              path="dashboard"
              element={<AdminPanelScreen components="dashboard" />}
            />

            <Route
              path="users"
              element={<AdminPanelScreen components="users" />}
            />
            <Route
              path="products"
              element={<AdminPanelScreen components="products" />}
            />
            <Route
              path="orders"
              element={<AdminPanelScreen components="orders" />}
            />
            <Route
              path="categories"
              element={<AdminPanelScreen components="categories" />}
            />
            <Route
              path="addproduct"
              element={<AdminPanelScreen components="addproduct" />}
            />
            <Route
              path="order_details"
              element={<AdminPanelScreen components="order_details" />}
            />
          </Route>

          {/* Public Routes */}
          <Route path="/public/" element={
            <PublicRoutes />}
          >
            <Route path="register" element={<RegisterScreen />} />
          </Route>

          {/* Normal Routes */}

          <Route path="cart" exact element={<CartScreen />}></Route>
          <Route path="cart/:id" exact element={<CartScreen />}></Route>
          <Route
            path="products/:id"
            exact
            element={<ProductDetailsScreen />}
          ></Route>
          <Route path="productScreen" exact element={<ProductScreen />}></Route>


          <Route path="/" exact element={<HomeScreen />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
