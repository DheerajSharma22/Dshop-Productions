import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { authEndPoints } from "../../Services/apis";

const initialState = {
    loading: false,
    signupData: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setSignupData(state, action) {
            state.signupData = action.payload;
        }
    }
});

export const { setLoading, setSignupData } = authSlice.actions;
export default authSlice.reducer;


