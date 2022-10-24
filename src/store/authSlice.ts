import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "."

// initialState type
export interface AuthState {
    auth: boolean
    registered: boolean | null
}
// initialState object
const initialState: AuthState = {
    auth: false,
    registered: null
}

// slise with reducers
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setRegistered: (state, action: PayloadAction<boolean>) => {
            state.registered = action.payload
        },
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload
        }
    }
})

// actions
export const { setRegistered, setAuth } = authSlice.actions

// selectors
export const selectRegistered = (state: RootState) => state.auth.registered
export const selectAuth = (state: RootState) => state.auth.auth


// thunks
export const register = () => async (dispatch: AppDispatch) => {
    // request to server
    console.log(`register`);
    
}

export const login = () => async (dispatch: AppDispatch) => {
    // request to server
    console.log(`login`);
    
}

export const logout = () => async (dispatch: AppDispatch) => {
    // request to server

}

export default authSlice.reducer