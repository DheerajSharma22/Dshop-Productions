import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./Slice/productSlice";
import cartReducer from './Slice/cartSlice';
import userReducer from "./Slice/userSlice";
import paymentReducer from './Slice/paymentSlice.js';
import adminReducer from "./Slice/AdminSlice/adminSlice";
const store = configureStore({
  reducer: { 
    productReducer,
    cartReducer,
    userReducer,
    paymentReducer,
    adminReducer,
  },
});

export default store;
