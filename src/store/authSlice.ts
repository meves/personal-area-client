import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "."
import { AuthRequests } from "../http/auth"
import jwt_decode from "jwt-decode";
import { AuthData } from "../types";


export interface AuthState {
    isAuth: boolean
    user: UserFromToken | null
    errorMessage: string
}
const initialState: AuthState = {
    isAuth: false,
    user: null,
    errorMessage: ""
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuthAction: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setUserAction: (state, action: PayloadAction<UserFromToken | null>) => {
            state.user = action.payload
        },
        setAuthErrorMessageAction: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        }
    }
})

export const { setIsAuthAction, setUserAction, setAuthErrorMessageAction } = authSlice.actions;


export default authSlice.reducer


export const selectAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.auth.user
export const selectAuthErrorMessage = (state: RootState) => state.auth.errorMessage


export class AuthThunk {

    static auth = () => 
        async (dispatch: AppDispatch) => {
            const token: string | null = localStorage.getItem("token");
            const data: AuthData = await AuthRequests.auth(token);
            if (data.code === "Success") {
                const user: UserFromToken = jwt_decode(data.token as string);
                await resultSigning(true, data.token, user, data.message, dispatch);
            } else {
                await resultSigning(false, data.token, null, data.message, dispatch);
            }
        }

    static signup = (email: string, password: string) => 
        async (dispatch: AppDispatch) => {
            const data: AuthData = await AuthRequests.signup(email, password);
            if (data.code === "Success") {
                const user: UserFromToken = jwt_decode(data.token);
                await resultSigning(true, data.token, user, data.message, dispatch);
            } else {
                await resultSigning(false, data.token, null, data.message, dispatch);
            }
        }

    static signin = (email: string, password: string) => 
        async (dispatch: AppDispatch) => {
            const data: AuthData = await AuthRequests.signin(email, password);
            if (data.code === "Success") {
                const user: UserFromToken = jwt_decode(data.token);
                await resultSigning(true, data.token, user, data.message, dispatch);
            } else {
                await resultSigning(false, data.token, null, data.message, dispatch);
            }
        }

    static logout = () => 
        async (dispatch: AppDispatch) => {
            localStorage.removeItem("token");
            dispatch(AuthThunk.auth());
        }    
}


export type UserFromToken = {
    id: number
    email: string
    role: string
}


async function resultSigning(
    isAuth: boolean,
    token: string,
    user: UserFromToken | null,
    message: string,
    dispatch: AppDispatch
) {
    dispatch(setIsAuthAction(isAuth));
    dispatch(setUserAction(user));
    dispatch(setAuthErrorMessageAction(message));
    localStorage.setItem("token", token);
}