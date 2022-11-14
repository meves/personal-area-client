import React from "react";
import ReactDOM from "react-dom/client";
import * as useHooks from "../../app/hooks";
import { Navbar } from ".";
import { UserFromToken } from "../../store/authSlice";
import { store } from "../../store";


let root: any = null;
let container: any = null;
beforeEach(() => {
    container = document.createElement("div");
    root = ReactDOM.createRoot(container);
});
afterEach(() => {
    root.unmount(container);
    container.remove();
    container = null; 
});

describe("Navbar component", () => {
    it("displays user email that was sent in token", () => {
        // define mock user returned from AuthSlice
        const mockUser: UserFromToken | null = { 
            id: 1, email: "user@mail.ru", role: "USER" 
        };
        // simulate selector to return mockUser
        const selectUser = jest.fn(() => (mockUser));
        // mock useAppSelector
        jest.spyOn(useHooks, "useAppSelector").mockImplementation(() => {
            return selectUser();
        });
        // mock useAppDispatch
        jest.spyOn(useHooks, "useAppDispatch").mockReturnValue(store.dispatch);
        // mock logout function
        const logout = jest.fn(() => {
            console.log(`User signed out`);
            
        });
        root.render(<Navbar/>);
        expect(container).toMatchSnapshot();
    });
});