import React from "react";
import ReactDOM from "react-dom/client";
import LoginPage from "./LoginPage";

jest.mock("../components/LoginForm", () => {
    return function() {
        return (<form>LoginForm</form>)
    }
});

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

describe("LoginForm test", () => {
    it("Login From renders", () => {
        root.render(<LoginPage/>);
        expect(container).toMatchSnapshot();
    });
});