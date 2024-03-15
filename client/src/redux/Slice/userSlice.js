const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
    }, 
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;


export function setUserIfAuthorized () {
    return async function setUserIfAuthorizedThunk (dispatch, getState) {
        try {
            const res = await axios.get("/api/users/isAuthorized");
            const { data, status } = res;
            if (status === 200) {
                dispatch(setUser(data));
                // console.log(getState().userReducer.user);
            }
        } catch (error) {
            dispatch(setUser(null));
        }
    }
}