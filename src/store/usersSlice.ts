import { usersRequests } from './../http/users';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "."
import { HTTP_CODES } from '../http/codes';
import { ErrorMessage, DataWithUsers, UserFromList } from './types';

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
        setUsersAction: (state, action: PayloadAction<UserFromList[]>) => {
            state.users = action.payload;
        },
        addCreatedUserAction: (state, action: PayloadAction<UserFromList[]>) => {
            state.users = state.users.concat(action.payload);
        },
        deleteSelectedUserAction: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        updateSeletedUserAction: (state, action: PayloadAction<UserFromList>) => {
            state.users = state.users.map(user => {
                if (user.id === action.payload.id) {
                    return action.payload
                }
                return user;
            });
        },
        setErrorMessageAction: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        }
    }
});

// actions
export const { setUsersAction, setErrorMessageAction, addCreatedUserAction, deleteSelectedUserAction, updateSeletedUserAction } 
= usersSlice.actions;

export default usersSlice.reducer;

// selectors
export const selectUsers = (state: RootState): UserFromList[] => state.users.users;

// thunks
export const getUsersThunk = () => 
    async (dispatch: AppDispatch) => {
        const response = await usersRequests.getAllUsers();
        if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
            const { message }: ErrorMessage = await response.json();
            dispatch(setErrorMessageAction(message));
            return;
        }
        if (response.status === HTTP_CODES.OK_200) {
            const { users }: DataWithUsers = await response.json();
            dispatch(setUsersAction(users));
            return;
        }
    }

export const getUserThunk = (id: number) => 
    async (dispatch: AppDispatch) => {
        const response = await usersRequests.getUser(id);
        if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
            const { message }: ErrorMessage = await response.json();
            dispatch(setErrorMessageAction(message));
            return;
        }
        if (response.status === HTTP_CODES.OK_200) {
            const { users }: DataWithUsers = await response.json();
            dispatch(updateSeletedUserAction(users[0]));
            return;
        }
    }

export const createUserThunk = (firstname: string, lastname: string) => 
    async (dispatch: AppDispatch) => {
        const response = await usersRequests.createUser(firstname, lastname);
        if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
            const { message }: ErrorMessage = await response.json();
            dispatch(setErrorMessageAction(message));
            return;
        }
        if (response.status === HTTP_CODES.CREATED_201) {
            const { users }: DataWithUsers = await response.json();
            dispatch(addCreatedUserAction(users));
            return;
        }
    }

export const deleteUserThunk = (id: number) => 
    async (dispatch: AppDispatch) => {
        const response = await usersRequests.deleteUser(id);
        if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
            const { message }: ErrorMessage = await response.json();
            dispatch(setErrorMessageAction(message));
            return;
        }
        if (response.status === HTTP_CODES.NO_CONTENT_204) {
            dispatch(deleteSelectedUserAction(id));
            return;
        }
    }

export const updateUserThunk = (id: number, firstname: string, lastname: string) => 
    async (dispatch: AppDispatch) => {
        const response = await usersRequests.updateUser(id, firstname, lastname);
        if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
            const { message }: ErrorMessage = await response.json();
            dispatch(setErrorMessageAction(message));
            return;
        }
        if (response.status === HTTP_CODES.NO_CONTENT_204) {
            dispatch(getUserThunk(id));
            return;
        }
    }


// types


// utils
