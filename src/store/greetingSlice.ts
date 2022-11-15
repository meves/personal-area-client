import { GreetingRequests } from './../http/greeting';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from ".";
import { HTTP_CODES } from '../http/codes';
import { DataGreeting } from './types';


export interface GreetingState {
    greeting: string | null
    error: Error | null
}

const initialState: GreetingState = {
    greeting: null,
    error: null
}

export const greetingSlice = createSlice({
    name: "greeting",
    initialState,
    reducers: {
        setGreeting: (state, action: PayloadAction<string | null>) => {
            state.greeting = action.payload
        },
        setError: (state, action: PayloadAction<Error | null>) => {
            state.error = action.payload
        }
    }
});

export const { setGreeting, setError } = greetingSlice.actions;

export default greetingSlice.reducer;

export const selectGreeting = (state: RootState) => state.greeting.greeting;
export const selectError = (state: RootState) => state.greeting.error;

// thunks
export class GreetingThunk {
    static getGreetingThunk = (id: number) => 
        async (dispatch: AppDispatch) => {
            const response = await GreetingRequests.getGreeting(id);
            if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
                const { error } = await response.json();
                dispatch(setError(error));
                dispatch(setGreeting(null));
                return false;
            }
            if (response.status === HTTP_CODES.OK_200) {
                const { data }: DataGreeting = await response.json();
                dispatch(setGreeting(data.greeting.greeting));
                dispatch(setError(null));
                return true;
            }
        }
}