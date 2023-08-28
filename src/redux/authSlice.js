import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    isAuth: false,
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action) => {
            const payload = action.payload;
            state.user = payload;
            if (payload === null) {
                state.isAuth = false;
            } else {
                state.isAuth = true;
            }
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
