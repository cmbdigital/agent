import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    dashboard: []
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboard: (state, action) => {
            const { data } = action.payload;
            state.dashboard = data;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setDashboard } = dashboardSlice.actions;

export default dashboardSlice.reducer;
