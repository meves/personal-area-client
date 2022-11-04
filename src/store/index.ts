import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersSlice from "./usersSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
