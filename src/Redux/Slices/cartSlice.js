import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setTotalItems(state, action) {
            state.totalItems = action.payload;
        },

    }
});

export const { setToken } = cartSlice.actions;
export default cartSlice.reducer;