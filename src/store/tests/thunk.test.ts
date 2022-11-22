import { AuthThunk } from "../authSlice";
import { AuthRequests } from "../../http/auth";


jest.mock("../../http/auth");
const AuthRequestsMocked = AuthRequests as jest.Mocked<typeof AuthRequests>;
const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const result = {}

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
    AuthRequestsMocked.auth.mockClear();
    AuthRequestsMocked.signup.mockClear();
    AuthRequestsMocked.signin.mockClear();
})

// authSlice
describe("authSlice thunks", () => {
    test("", async () => {
        jest.spyOn(localStorage, "getItem").mockReturnValue("abcdef");
        //AuthRequestsMocked.auth.mockReturnValue(Promise.resolve());
    })
})

// usersSlice
describe("usersSlice thunks", () => {
    
})

// greetingSlice
describe("greetingSlice thunks", () => {
    
})