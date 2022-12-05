import React from "react";
import ReactDOM from "react-dom/client";
import MainPage from "../UsersPage";

jest.mock("../../components/common/Navbar", () => {
    return function() {
        return (<div>Navbar</div>)
    }
});
jest.mock("./index.tsx", () => {
    return function() {
        return (<div>Users</div>)
    }
});
jest.mock("../../components/common/Footer", () => {
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
        //expect(container).toMatchSnapshot();
    });
});