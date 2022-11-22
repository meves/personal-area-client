import { GreetingRequests } from './../http/greeting';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from ".";
import { HTTP_CODES } from '../http/codes';
import { DataGreeting } from './types';


export interface GreetingState {
    greetingResult: {
        greeting: string | null
        error: Error | null
    }
}

const initialState: GreetingState = {
    greetingResult: {
        greeting: null,
        error: null
    }
}
export type GreetingResult = typeof initialState.greetingResult;

export const greetingSlice = createSlice({
    name: "greeting",
    initialState,
    reducers: {
        setGreetingResultAction: (state, action: PayloadAction<GreetingResult>) => {
            state.greetingResult = action.payload
        }
    }
});

export const { setGreetingResultAction } = greetingSlice.actions;

export default greetingSlice.reducer;

// selectors
export const selectGreetingResult = (state: RootState) => state.greeting.greetingResult;

// thunks
export class GreetingThunk {
    static getGreetingThunk = (id: number) => 
        async (dispatch: AppDispatch) => {
            const response = await GreetingRequests.getGreeting(id);
            if (response.status === HTTP_CODES.INTERNAL_SERVER_ERROR_500) {
                const { error } = await response.json();
                dispatch(setGreetingResultAction({ greeting: null, error: error }));
                return false;
            }
            if (response.status === HTTP_CODES.OK_200) {
                const { data }: DataGreeting = await response.json();
                dispatch(setGreetingResultAction({ greeting: data.greeting.greeting, error: null }));
                return true;
            }
        }
}