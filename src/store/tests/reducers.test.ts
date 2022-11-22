import authReducer, {
    setIsAuthAction, setUserAction, setAuthErrorMessageAction, AuthState
} from "../authSlice";
import usersReducer, {
    setUsersAction, addCreatedUserAction, deleteSelectedUserAction,
    updateSeletedUserAction, setErrorMessageAction, UsersState
} from "../usersSlice";
import greetingReducer, { setGreetingResultAction, GreetingState, GreetingResult } from "../greetingSlice";
import { UserFromList } from "../types";

// initial state for start tests
const initialState = {
    auth: {
            isAuth: false,
            user: null,
            errorMessage: ""
        },
    users: {
            users: [] as UserFromList[],
            errorMessage: ""
        },
    greeting: {
        greetingResult: {
            greeting: null,
            error: null
        }
    },
}

// authSlice
describe("authSlice", () => {
    test("should return default state when passed an empty action", () => {
        const result: AuthState = authReducer(undefined, { type: "" });
        expect(result).toEqual(initialState.auth)
    })
    test("should set isAuth using setIsAuth", () => {
        const action = { type: setIsAuthAction.type, payload: true }
        const result = authReducer(initialState.auth, action);
        expect(result.isAuth).toBe(true);
        expect(result.user).toBe(null);
        expect(result.errorMessage).toBe("");
    })
    test("should set user using setUser", () => {
        const user = { id: 1, email: "name@mail.ru", role: "USER" };
        const action = { 
            type: setUserAction.type, 
            payload: user
        };
        const result: AuthState = authReducer(initialState.auth, action);
        expect(result.isAuth).toBe(false);
        expect(result.user).toEqual(user);
        expect(result.errorMessage).toBe("");
    })
    test("should set errorMessage using setErrorMessage", () => {
        const errorMessage = "Internal server error";
        const action = { type: setAuthErrorMessageAction.type, payload: errorMessage}
        const result: AuthState = authReducer(initialState.auth, action);
        expect(result.isAuth).toBe(false);
        expect(result.user).toBe(null);
        expect(result.errorMessage).toBe(errorMessage);
    })
})

// usersSlice
describe("usersSlice", () => {
    test("should return default state when passed an empty action", () => {
        const result: UsersState = usersReducer(undefined, { type: "" });
        expect(result).toEqual(initialState.users);
    })
    test("should set users using setUsersAction", () => {
        const users: UserFromList[]  = [
            { id: 1, firstname: "Ivan", lastname: "Ivanov", createdAt: "", updatedAt: "" },
            { id: 2, firstname: "Petr", lastname: "Petrov", createdAt: "", updatedAt: "" },
            { id: 3, firstname: "Yury", lastname: "Ruznetsov", createdAt: "", updatedAt: "" }
        ]
        const action = { type: setUsersAction.type, payload: users };
        const result: UsersState = usersReducer(initialState.users, action);
        expect(result.users[0]).toEqual(users[0]);
        expect(result.users[1]).toEqual(users[1]);
        expect(result.users[2]).toEqual(users[2]);
        expect(result.errorMessage).toBe("");
    })
    test("should set created user using addCreatedUserAction", () => {
        initialState.users.users = [
            { id: 1, firstname: "Ivan", lastname: "Ivanov", createdAt: "", updatedAt: "" },
            { id: 2, firstname: "Petr", lastname: "Petrov", createdAt: "", updatedAt: "" },
            { id: 3, firstname: "Yury", lastname: "Ruznetsov", createdAt: "", updatedAt: "" }
        ]
        const newUsers = [
            { id: 4, firstname: "Sergey", lastname: "Fedorov", createdAt: "", updatedAt: "" }
        ]
        const action = { type: addCreatedUserAction.type, payload: newUsers };
        const result: UsersState = usersReducer(initialState.users, action);
        expect(result.users[0]).toEqual(initialState.users.users[0]);
        expect(result.users[1]).toEqual(initialState.users.users[1]);
        expect(result.users[2]).toEqual(initialState.users.users[2]);
        expect(result.users[3]).toEqual(newUsers[0]);
        expect(result.errorMessage).toBe("");
    })
    test("should delete user using deleteSelectedUserAction", () => {
        initialState.users.users = [
            { id: 1, firstname: "Ivan", lastname: "Ivanov", createdAt: "", updatedAt: "" },
            { id: 2, firstname: "Petr", lastname: "Petrov", createdAt: "", updatedAt: "" },
            { id: 3, firstname: "Yury", lastname: "Ruznetsov", createdAt: "", updatedAt: "" }
        ]
        const action = { type: deleteSelectedUserAction.type, payload: 3 };
        const result: UsersState = usersReducer(initialState.users, action);
        expect(result.users).toContain(initialState.users.users[0]);
        expect(result.users).toContain(initialState.users.users[1]);
        expect(result.users).not.toContain(initialState.users.users[2]);
        expect(result.errorMessage).toBe("");
    })
    test("should update user using updateSeletedUserAction", () => {
        initialState.users.users = [
            { id: 1, firstname: "Ivan", lastname: "Ivanov", createdAt: "", updatedAt: "" },
            { id: 2, firstname: "Petr", lastname: "Petrov", createdAt: "", updatedAt: "" },
            { id: 3, firstname: "Yury", lastname: "Ruznetsov", createdAt: "", updatedAt: "" }
        ]
        const updatedUser = 
            { id: 3, firstname: "Yury", lastname: "Kuznetsov", createdAt: "", updatedAt: "" }
        const action = { type: updateSeletedUserAction.type, payload: updatedUser };
        const result: UsersState = usersReducer(initialState.users, action);
        expect(result.users[0]).toEqual(initialState.users.users[0]);
        expect(result.users[1]).toEqual(initialState.users.users[1]);
        expect(result.users[2]).toEqual({
            id: 3, firstname: "Yury", lastname: "Kuznetsov", createdAt: "", updatedAt: "" 
        });
        expect(result.errorMessage).toBe("");
    })
    test("set errorMessage using setErrorMessageAction", () => {
        initialState.users.users = [];
        const errorMessage = "Internal server error";
        const action = { type: setErrorMessageAction.type, payload: errorMessage};
        const result: UsersState = usersReducer(initialState.users, action);
        expect(result.errorMessage).toBe(errorMessage);
        expect(result.users).toEqual([]);
    })
})

// greetingSlice
describe("greetingSlice", () => {
    test("should return default state when passed an empty action", () => {
        const result: GreetingState = greetingReducer(undefined, { type: "" });
        expect(result).toEqual(initialState.greeting);
    })
    test("should set greetingResult using setGreetingResultAction", () => {
        // null null
        const greetingResultNull: GreetingResult = {
            greeting: null, error: null
        }
        let result: GreetingState = greetingReducer(initialState.greeting, { 
            type: setGreetingResultAction.type, payload: greetingResultNull });
        expect(result.greetingResult.greeting).toBe(null);
        expect(result.greetingResult.error).toBe(null);
        // string null
        const greetingSuccess = {
            greeting: "Hello", error: null
        }
        result = greetingReducer(initialState.greeting, { 
            type: setGreetingResultAction.type, payload: greetingSuccess });
        expect(result.greetingResult.greeting).toBe("Hello");
        expect(result.greetingResult.error).toBe(null);
        // null string
        const greetingError = {
            greeting: null, error: "Error"
        }
        result = greetingReducer(initialState.greeting, { 
            type: setGreetingResultAction.type, payload: greetingError });
        expect(result.greetingResult.greeting).toBe(null);
        expect(result.greetingResult.error).toBe("Error");
    })
})