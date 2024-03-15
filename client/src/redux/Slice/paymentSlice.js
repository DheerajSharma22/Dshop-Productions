const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,
    isSuccess: false,
    orders: null,
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setIsSuccess(state, action) {
      state.isSuccess = action.payload;
    },
  },
});

export const { setOrder, setOrders, setIsSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;

export const setNewOrder = (order) => {
  return async function setNewOrderThunk(dispatch, getState) {
    try {
      const res = await axios.post("/api/payment/paymentVerification", order);
      const data = res.data;
      dispatch(setOrder(data));
      dispatch(setIsSuccess(true));
    } catch (error) {
      dispatch(setOrder(null));
    }
  };
};

export const fetchOrder = () => {
  return async function fetchOrderThunk(dispatch, getState) {
    try {
      const res = await axios.get("/api/payment");
      const data = res.data;
      dispatch(setOrders(data));
    } catch (error) {
      dispatch(setOrder(null));
    }
  };
};
