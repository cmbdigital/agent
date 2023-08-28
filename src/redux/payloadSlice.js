import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: null
};

export const payloadSlice = createSlice({
    name: "payload",
    initialState,
    reducers: {
        setPayload: (state, action) => {
            const payload = action.payload;
            state.order = { ...state.order, ...payload };
        },
    },
});

// Action creators are generated for each case reducer function
export const { setPayload } = payloadSlice.actions;

export default payloadSlice.reducer;
