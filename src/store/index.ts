import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import usersReducer from "./usersSlice";
import greetingReducer from "./greetingSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        greeting: greetingReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
