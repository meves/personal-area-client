import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "."
import { AuthRequests } from "../http/auth"
import { HTTP_CODES } from "../http/codes"
import jwt_decode from "jwt-decode";
import { ErrorMessage, AuthToken } from "./types";


// initialState type
export interface AuthState {
    isAuth: boolean
    user: UserFromToken | null
    errorMessage: string
}
// initialState object
const initialState: AuthState = {
    isAuth: false,
    user: null,
    errorMessage: ""
}

// slise with reducers
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
        setUser: (state, action: PayloadAction<UserFromToken | null>) => {
            state.user = action.payload
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        }
    }
})

// actions
export const { setIsAuth, setUser, setErrorMessage } = authSlice.actions;

export default authSlice.reducer

// selectors
export const selectAuth = (state: RootState) => state.auth.isAuth
export const selectUser = (state: RootState) => state.auth.user
export const selectErrorMessage = (state: RootState) => state.auth.errorMessage

// thunks
export class AuthThunk {
    static auth = () => async (dispatch: AppDispatch) => {
        const token: string | null = localStorage.getItem("token");
        const response = await AuthRequests.auth(token);
        if (response.status === HTTP_CODES.UNAUTHORIZED_401) {
            const { message }: ErrorMessage = await response.json();
            await resultSigning(false, "", null, message, dispatch);
            return;
        }
        if (response.status === HTTP_CODES.OK_200) {
            const { token }: AuthToken = await response.json();
            const user: UserFromToken = jwt_decode(token);
            await resultSigning(true, token, user, "", dispatch);
            return;
        }
    }    
    static signup = (email: string, password: string) => async (dispatch: AppDispatch) => {
        const response = await AuthRequests.signup(email, password);
        if (response.status === HTTP_CODES.BAD_REQUEST_400) {
            const { message }: ErrorMessage = await response.json();
            await resultSigning(false, "", null, message, dispatch);
            return;
        }
        if (response.status === HTTP_CODES.CONFLICT_409) {
            const { message } = await response.json();
            await resultSigning(false, "", null, message, dispatch);
            return;
        }
        if (response.status === HTTP_CODES.CREATED_201) {
            const { token }: AuthToken = await response.json();
            const user: UserFromToken = jwt_decode(token);
            await resultSigning(true, token, user, "", dispatch);
            return;
        }
    }    
    static signin = (email: string, password: string) => async (dispatch: AppDispatch) => {
        const response = await AuthRequests.signin(email, password);
        if (response.status === HTTP_CODES.BAD_REQUEST_400) {
            const { message } = await response.json();
            await resultSigning(false, "", null, message, dispatch);
            return;
        }
        if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
            const { message } = await response.json();
            await resultSigning(false, "", null, message, dispatch);
            return;
        }
        if (response.status === HTTP_CODES.OK_200) {
            const { token } = await response.json();
            const user: UserFromToken = jwt_decode(token);
            await resultSigning(true, token, user, "", dispatch);
            return;
        }
    }    
    static logout = () => async (dispatch: AppDispatch) => {
        localStorage.removeItem("token");
        dispatch(AuthThunk.auth());
    }
}

// types
export type UserFromToken = {
    id: number
    email: string
    role: string
}

// utils
async function resultSigning(
    isAuth: boolean,
    token: string,
    user: UserFromToken | null,
    message: string,
    dispatch: AppDispatch
) {
    dispatch(setIsAuth(isAuth));
    dispatch(setUser(user));
    dispatch(setErrorMessage(message));
    localStorage.setItem("token", token);
}
