import { AuthRequests } from "../../http/auth";
import { UsersRequests } from "../../http/users";
import { GreetingRequests } from "../../http/greeting";
import { GreetingThunk, setGreetingResultAction } from "../greetingSlice";
import { AuthData, GreetingData, UsersData } from "../../types";
import { addCreatedUserAction, deleteSelectedUserAction, setErrorAction, setErrorMessageAction, setUsersAction, updateSeletedUserAction, UserListThunk } from "../usersSlice";
import { AuthThunk, setAuthErrorMessageAction, setIsAuthAction, setUserAction } from "../authSlice";
// import modules to mock
import { getLocalStorageMock } from "@shinshin86/local-storage-mock";
import * as jwt from "jwt-decode";

// http mocked modules
jest.mock("../../http/auth");
jest.mock("../../http//users");
jest.mock("../../http/greeting");
// 
jest.mock("jwt-decode");

// casting of class type to mock type of this class
// we will invoke their methods as mocked ones
const AuthRequestsMocked = AuthRequests as jest.Mocked<typeof AuthRequests>;
const UsersRequestsMocked = UsersRequests as jest.Mocked<typeof UsersRequests>
const GreetingRequestsMocked = GreetingRequests as jest.Mocked<typeof GreetingRequests>
const jwtMocked = jwt as jest.Mocked<typeof jwt>

// dispatch mocked function will be passed to thunk function as parameter
const dispatchMock = jest.fn();

beforeEach(() => {
    // clear instances, calls, results of mocked methods
    dispatchMock.mockClear();
    AuthRequestsMocked.auth.mockClear();
    AuthRequestsMocked.signup.mockClear();
    AuthRequestsMocked.signin.mockClear();
    UsersRequestsMocked.getAllUsers.mockClear();
    UsersRequestsMocked.getUser.mockClear();
    UsersRequestsMocked.createUser.mockClear();
    UsersRequestsMocked.deleteUser.mockClear();
    UsersRequestsMocked.updateUser.mockClear();
    GreetingRequestsMocked.getGreeting.mockClear();
})

// authSlice
describe("authSlice thunks", () => {
    test("auth thunk should be invoked correctly", async () => {
        // ARRANGE
        let token: string | null = null;
        const data: AuthData = {
            token: "", 
            message: "User is not authorized",
            error: new Error("Unauthorized"),
            code: undefined
        }
        //global.localStorage = getLocalStorageMock()
        // ** mock functions
        //jest.spyOn(window.localStorage, "getItem").mockReturnValue(null);
        //jest.spyOn(window.localStorage, "setItem").mockImplementation(jest.fn());
        AuthRequestsMocked.auth.mockReturnValue(Promise.resolve(data));
        jwtMocked.default.mockImplementation(jest.fn());
        // ACT call thunk
        let thunk = AuthThunk.auth();
        await thunk(dispatchMock);
        // ASSERT
        //expect(window.localStorage.getItem).toBeCalledTimes(1);
        expect(AuthRequests.auth).toBeCalledTimes(1);
        expect(AuthRequests.auth).toBeCalledWith(token);
        expect(jwtMocked).not.toBeCalled();
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsAuthAction(false));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setUserAction(null));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setAuthErrorMessageAction(data.message));
        //expect(window.localStorage.setItem).toBeCalledTimes(1);
        // ARRANGE error test
        // reset token and data object
        token = "";
        data.token = "abc";
        data.message = "";
        data.error = null;
        data.code = "Success";
        const user = { id:1, email: "name@mail.ru", role: "USER" }
        // clear mock functions
        AuthRequestsMocked.auth.mockClear();
        dispatchMock.mockClear();
        jwtMocked.default.mockReturnValue(user);
        // ACT call thunk
        thunk = AuthThunk.auth();
        await thunk(dispatchMock);
        // ASSERT
        //expect(window.localStorage.getItem).toBeCalledTimes(1);
        expect(AuthRequests.auth).toBeCalledTimes(1);
        expect(AuthRequests.auth).toBeCalledWith(token);
        expect(jwtMocked).toBeCalledTimes(1);
        expect(jwtMocked).toHaveBeenCalledWith(data.token);
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setIsAuthAction(true));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setUserAction(user));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setAuthErrorMessageAction(data.message));
        //expect(window.localStorage.setItem).toBeCalledTimes(1);
    })
    test("signup thunk should be invoked correctly", async () => {
    

    })
    test("signin thunk should be invoked correctly", async () => {
    

    })
    test("logout thunk should be invoked correctly", async () => {
    

    })
})

// usersSlice
describe("usersSlice thunks", () => {
    const data: UsersData = {
        users: [
            { id: 1, firstname: "Ivan", lastname: "Ivanov", createdAt: "", updatedAt: "" }
        ],
        message: "",
        error: null,
        code: "Success"
    }
    test("get all users thunk", async () => {
        UsersRequestsMocked.getAllUsers.mockReturnValue(Promise.resolve(data));
        const thunk = UserListThunk.getUsersThunk();
        await thunk(dispatchMock);
        // good test
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setUsersAction(data.users));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setErrorAction(data.error));
    })
    test("get one user thunk", async () => {
        UsersRequestsMocked.getUser.mockReturnValue(Promise.resolve(data));
        const thunk = UserListThunk.getUserThunk(1);
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, updateSeletedUserAction(data.users[0]));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setErrorAction(data.error));
    })
    test("create new user thunk", async () => {
        UsersRequestsMocked.createUser.mockImplementation(
            (fisrtname: string, lastname: string) => Promise.resolve(data))
        let thunk = UserListThunk.createUserThunk("Ivan", "Ivanov");
        await thunk(dispatchMock);
        // test good response
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, addCreatedUserAction(data.users));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setErrorAction(data.error));
        // test error response
        dispatchMock.mockClear();
        data.code = undefined;
        thunk = UserListThunk.createUserThunk("Ivan", "Ivanov");
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorAction(data.error));
    })
    test("update selected user thunk", async () => {
        data.users = [
            { id: 1, firstname: "Petr", lastname: "Petrov", createdAt: "", updatedAt: "" }
        ]
        data.code = "Success";
        UserListThunk.getUserThunk = jest.fn();
        UsersRequestsMocked.updateUser.mockImplementation(
            (id: number, firstname: string, lastname: string) => Promise.resolve(data))
        let thunk = UserListThunk.updateUserThunk(1, "Petr", "Petrov");
        await thunk(dispatchMock);
        // good test
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, UserListThunk.getUserThunk(1));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setErrorAction(data.error));
        // error test
        dispatchMock.mockClear();
        data.code = undefined
        thunk = UserListThunk.updateUserThunk(1, "Petr", "Petrov");
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorAction(data.error));
    })
    test("delete selected user thunk", async () => {
        data.code = "Success";
        UsersRequestsMocked.deleteUser.mockImplementation(
            (id: number) => Promise.resolve(data)
        )
        let thunk = UserListThunk.deleteUserThunk(1);
        await thunk(dispatchMock);
        // good test
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, deleteSelectedUserAction(1));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, setErrorAction(data.error));
        // error test
        dispatchMock.mockClear();
        data.code = undefined;
        thunk = UserListThunk.deleteUserThunk(1);
        await thunk(dispatchMock);
        expect(dispatchMock).toBeCalledTimes(2);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, setErrorMessageAction(data.message));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, setErrorAction(data.error));
    })
})

// greetingSlice
describe("greetingSlice thunks", () => {
    test("getGreeting thunk", async () => {
        const data: GreetingData = {
            greeting: {
                id: 1, message: "Test"
            },
            error: null
        }
        GreetingRequestsMocked.getGreeting.mockReturnValue(Promise.resolve(data));
        const thunk = GreetingThunk.getGreetingThunk(1);
        const result = await thunk(dispatchMock);
        expect(result).toBe(true);
        expect(dispatchMock).toBeCalledTimes(1);
        expect(dispatchMock).toBeCalledWith(setGreetingResultAction({
            message: "Test", error: null
        }));
    })
})