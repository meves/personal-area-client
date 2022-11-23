import { AuthRequests } from "../../http/auth";
import { UsersRequests } from "../../http/users";
import { GreetingRequests } from "../../http/greeting";
import { GreetingThunk, setGreetingResultAction } from "../greetingSlice";
import { GreetingData } from "../types";

// http mocked modules
jest.mock("../../http/auth");
jest.mock("../../http//users");
jest.mock("../../http/greeting");

// casting of class type to mock type of this class
// we will invoke their methods as mocked ones
const AuthRequestsMocked = AuthRequests as jest.Mocked<typeof AuthRequests>;
const UsersRequestsMocked = UsersRequests as jest.Mocked<typeof UsersRequests>
const GreetingRequestsMocked = GreetingRequests as jest.Mocked<typeof GreetingRequests>

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
    // test("", async () => {
    //     jest.spyOn(localStorage, "getItem").mockReturnValue("abcdef");
    //     AuthRequestsMocked.auth.mockReturnValue(Promise.resolve());

    // })
})

// usersSlice
describe("usersSlice thunks", () => {
    
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