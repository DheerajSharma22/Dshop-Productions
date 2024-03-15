import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import cartSlice from "./Slices/cartSlice";
import profileSlice from "./Slices/profileSlice";
import courseSlice from "./Slices/courseSlice";
import viewCourseSlice from "./Slices/viewCourseSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        cart: cartSlice,
        profile: profileSlice,
        course: courseSlice,
        viewCourse: viewCourseSlice,
    }
})

export default store;