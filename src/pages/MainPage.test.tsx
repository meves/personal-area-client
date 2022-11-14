import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "./MainPage";

jest.mock("../components/Navbar.tsx", () => {
    return function() {
        return (<div>Navbar</div>)
    }
});
jest.mock("../components/Users", () => {
    return function() {
        return (<div>Users</div>)
    }
});
jest.mock("../components/Footer", () => {
    return function() {
        return (<div>Footer</div>)
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

describe("MainPage test", () => {
    it("Main Page renders", ()=> {
        root.render(<MainPage/>);
        expect(container).toMatchSnapshot();
    });
});