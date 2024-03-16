const { createSlice } = require("@reduxjs/toolkit");
const axios = require("axios");
const BASE_URL = require('../../BaseURL');

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: localStorage.getItem("jwtToken") ? localStorage.getItem("jwtToken") : null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            localStorage.setItem("jwtToken", action.payload);
            state.token = action.payload;
        }
    }
})

export const { setUser, setToken } = userSlice.actions;
export default userSlice.reducer;


export function setUserIfAuthorized() {
    return async function setUserIfAuthorizedThunk(dispatch) {
        try {
            const res = await axios.get(`${BASE_URL.default}/api/users/isAuthorized`);            
            
            const { data, status } = res;
            if (status === 200) {
                dispatch(setUser(data));
            }
        } catch (error) {
            dispatch(setUser(null));
        }
    }
}