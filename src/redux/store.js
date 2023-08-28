import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import payloadSlice from './payloadSlice'
import dashboardSlice from './dashboardSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        payload: payloadSlice,
        dashboard: dashboardSlice,
    },
})