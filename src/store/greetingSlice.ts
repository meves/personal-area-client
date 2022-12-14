import { GreetingRequests } from './../http/greeting';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from ".";
import { GreetingData } from '../types';


export interface GreetingState {
    greetingResult: {
        message?: string | null
        error: Error | null
    }
}
const initialState: GreetingState = {
    greetingResult: {
        message: null,
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


export const selectGreetingResult = (state: RootState) => state.greeting.greetingResult;


export class GreetingThunk {

    static getGreetingThunk = (id: number) => 
        
        async (dispatch: AppDispatch) => {
            const data: GreetingData = await GreetingRequests.getGreeting(id);
            dispatch(setGreetingResultAction({ 
                message: data.greeting?.message, 
                error: data.error 
            }));      
            return true;
        }
}