import React from "react";
import { render, screen } from "@testing-library/react";
import * as usersModule from "../Users";
import { Users } from "../Users";

jest.mock("../index.tsx");

const usersModuleMocked = usersModule as jest.Mocked<typeof usersModule>

test("should render Users component correctly", () => {
    // mock React components
    //jest.spyOn(usersModuleMocked, "SearchUserForm").mockImplementation(() => <>Mocked UserForm</>)
    //jest.spyOn(usersModuleMocked, "UserForm").mockImplementation(() => <>Mocked UserForm</>)
    //jest.spyOn(usersModuleMocked, "UserList").mockImplementation(() => <>Mocked UserList</>)
    // render Users
    const root = render(<Users/>, {
        container: document.body.appendChild(document.createElement("div"))
    })
})
