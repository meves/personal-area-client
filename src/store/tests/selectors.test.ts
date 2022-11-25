import { RootState } from "..";
import { selectGreetingResult } from "../greetingSlice";
import { GreetingResult } from "../greetingSlice";
import { selectAuth, selectUser, selectAuthErrorMessage, UserFromToken } from "../authSlice";
import { selectUsers, selectUsersErrorMessage } from "../usersSlice";
import { UserFromList } from "../../types";

const state: RootState = {
    auth: {
        isAuth: false,
        user: null as UserFromToken | null,
        errorMessage: ""
    },
    users: {
        users: [] as UserFromList[],
        errorMessage: "",
        error: null as any
    },
    greeting: {
        greetingResult: {
        message: null as string | null,
        error: null as Error | null
    }}
}

describe("greeting selectors", () => {
    test("should select greeting result from state object", () => {
        let result: GreetingResult = selectGreetingResult(state);
        expect(result).toEqual(state.greeting.greetingResult);
        
        state.greeting.greetingResult = { message: "Hello", error: null };
        result = selectGreetingResult(state);
        expect(result).toEqual(state.greeting.greetingResult);

        state.greeting.greetingResult = { message: null, error: Error("Error") };
        result = selectGreetingResult(state);
        expect(result).toEqual(state.greeting.greetingResult);
    })
})

describe("auth selectors", () => {
    test("should select isAuth from state", () => {
        let result: boolean = selectAuth(state);
        expect(result).toBe(state.auth.isAuth);
    })
    test("should select user from state", () => {
        let result: UserFromToken | null = selectUser(state);
        expect(result).toEqual(state.auth.user);
        // change user data
        state.auth.user = { 
            id: 1, email: "name@mail.ru", role: "USER"
        }
        result = selectUser(state);
        expect(result).toEqual(state.auth.user);
    })
    test("should select errorMessage from state", () => {
        let result: string = selectAuthErrorMessage(state);
        expect(result).toBe(state.auth.errorMessage);
        // change error message
        state.auth.errorMessage = "Internal server error";
        result = selectAuthErrorMessage(state);
        expect(result).toBe(state.auth.errorMessage);
    })
})

describe("users selectors", () => {
    test("should select users from state", () => {
        let result = selectUsers(state);
        expect(result).toEqual(state.users.users);
        // change users
        const user = {
            id: 1, 
            firstname: "Ivan", lastname: "Ivanov",
            createdAt: "1970-01-01 00:00:00",
            updatedAt: "2000-01-01 00:00:00"
        }
        state.users.users.push(user);
        result = selectUsers(state);
        expect(result).toEqual(state.users.users);
        expect(state.users.users).toContain(user);
    })
    test("should select errorMessage from state", () => {
        let result = selectUsersErrorMessage(state);
        expect(result).toBe(state.users.errorMessage);
        // change error message
        state.users.errorMessage = "Interrnal server error";
        result = selectUsersErrorMessage(state);
        expect(result).toBe(state.users.errorMessage);
    })
})