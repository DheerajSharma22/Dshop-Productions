import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    courseSectionData: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLectures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData(state, action) {
            state.courseSectionData = action.payload;
        },
        setCourseEntireData(state, action) {
            state.courseEntireData = action.payload;
        },
        setCompletedLectures(state, action) {
            state.completedLectures = action.payload;
        },
        setTotalNoOfLectures(state, action) {
            state.totalNoOfLectures = action.payload;
        },
        updateCompletedLecture(state, action) {
            state.completedLectures = [...state.completedLectures, action.payload];
        }
    }
});

export const { setCompletedLectures, setCourseEntireData, setCourseSectionData, setTotalNoOfLectures, updateCompletedLecture } = viewCourseSlice.actions;

export default viewCourseSlice.reducer;