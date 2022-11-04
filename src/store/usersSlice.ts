import { usersRequests } from './../http/users';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "."
import { HTTP_CODES } from '../http/codes';
import { AuthErrorMessage, DataWithUsers, UserFromList } from './types';

export interface UsersState {
    users: UserFromList[]
    errorMessage: string
}
// initial state
const initialState: UsersState = {
    users: [],
    errorMessage: ""
}

// users slice
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserFromList[]>) => {
            state.users = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        }
    }
});

// actions
export const { setUsers, setErrorMessage } = usersSlice.actions;

export default usersSlice.reducer;

// selectors
export const selectUsers = (state: RootState): UserFromList[] => state.users.users;

// thunks
export const getUsers = () => async (dispatch: AppDispatch) => {
    const response = await usersRequests.getAllUsers();
    if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
        const { message }: AuthErrorMessage = await response.json();
        dispatch(setErrorMessage(message));
        return;
    }
    if (response.status === HTTP_CODES.OK_200) {
        const { users }: DataWithUsers = await response.json();
        dispatch(setUsers(users));
    }
}

// types


// utils
