import { UsersRequests } from './../http/users';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from "."
import { HTTP_CODES } from '../http/codes';
import { ErrorMessage, DataWithUsers, UserFromList, UsersData } from '../types';

export interface UsersState {
    users: UserFromList[]
    errorMessage: string
    error: any
}
// initial state
const initialState: UsersState = {
    users: [],
    errorMessage: "",
    error: null
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
        },
        setErrorAction: (state, action: PayloadAction<any>) => {
            state.error = action.payload
        }
    }
});

// actions
export const { setUsersAction, setErrorMessageAction, addCreatedUserAction, 
    deleteSelectedUserAction, updateSeletedUserAction, setErrorAction } 
= usersSlice.actions;

export default usersSlice.reducer;

// selectors
export const selectUsers = (state: RootState): UserFromList[] => state.users.users;
export const selectUsersErrorMessage = (state: RootState):string => state.users.errorMessage;
export const selectUsersError = (state: RootState) => state.users.error;

// thunks
export class UserListThunk {

    static getUsersThunk = () => 
        async (dispatch: AppDispatch) => {
            const data: UsersData = await UsersRequests.getAllUsers();
            dispatch(setUsersAction(data.users));
            dispatch(setErrorMessageAction(data.message));
            dispatch(setErrorAction(data.error));
        }    

    static getUserThunk = (id: number) => 
        async (dispatch: AppDispatch) => {
            const data: UsersData = await UsersRequests.getUser(id);
            dispatch(updateSeletedUserAction(data.users[0]));
            dispatch(setErrorMessageAction(data.message));
            dispatch(setErrorAction(data.error));
        }    

    static createUserThunk = (firstname: string, lastname: string) => 
        async (dispatch: AppDispatch) => {
            const data: UsersData = await UsersRequests.createUser(firstname, lastname);
            if (data.code === "Success") {
                dispatch(addCreatedUserAction(data.users));
            }
            dispatch(setErrorMessageAction(data.message));
            dispatch(setErrorAction(data.error));
        }   
        
    static updateUserThunk = (id: number, firstname: string, lastname: string) => 
        async (dispatch: AppDispatch) => {
            const data: UsersData = await UsersRequests.updateUser(id, firstname, lastname);
            if (data.code === "Success") {
                dispatch(UserListThunk.getUserThunk(id));
            }
            dispatch(setErrorMessageAction(data.message));
            dispatch(setErrorAction(data.error));
        }

    static deleteUserThunk = (id: number) => 
        async (dispatch: AppDispatch) => {
            const data: UsersData = await UsersRequests.deleteUser(id);
            if (data.code === "Success") {
                dispatch(deleteSelectedUserAction(id));
            }
            dispatch(setErrorMessageAction(data.message));
            dispatch(setErrorAction(data.error));
        }    
}