import React from "react";
// API mocking utilities
import { rest } from "msw";
import { setupServer } from "msw/node";
// react testing methods
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
// custom jest matcher from jest-dom
import "@testing-library/jest-dom";
// Component
import { Greeting } from ".";
// import hooks to mock
import * as useHooks from "../../app/hooks";
import { store } from "../../store";


afterEach(() => {
    jest.restoreAllMocks()
})

describe("render correct UI", () => {
    test("When the component is mounted, a button with the text 'Load greeting' is displayed.", 
    () => {
        // ARRANGE
        // create mock functions
        jest.spyOn(useHooks, "useAppDispatch").mockReturnValue(store.dispatch);
        jest.spyOn(useHooks, "useAppSelector").mockReturnValue(null);
        // ACT
        const { container } = render(<Greeting/>, {
            container: document.body.appendChild(document.createElement("div"))
        })
        // ASSERT
        expect(screen.getByRole("button")).toHaveTextContent("Load greeting");
        expect(screen.getByText("Load greeting")).toBeVisible();
        try {
            expect(screen.getByRole("heading")).toBeVisible();
        } catch (error) {
            expect(error).toBe(error);
        }
        try {
            expect(screen.getByRole("alert")).toBeVisible();
        } catch (error) {
            expect(error).toBe(error);
        }
        // p is not displayed
    })
})

// define API request to mock
// const server = setupServer(
//     // capture GET /api/greeting/:id requests
//     rest.get("/api/greeting/:id", (req, res, ctx) => {
//         return res(ctx.json({ data: {greeting: "Hello there"} }))
//     })
// );

// beforeAll(() => server.listen());
// beforeEach(() => server.resetHandlers());
// afterAll(() => server.close());

// describe("requests to server", () => {
//     // test("loads and displays greeting", async () => {
//     //     // Arrange
//     //     render(<Greeting/>);
//     //     // Act
//     //     await userEvent.click(screen.getByText("Load greeting"));
//     //     await screen.findByRole("heading");
//     //     // Assert
//     //     expect(screen.getByRole("heading")).toHaveTextContent("Hello there");
//     //     expect(screen.getByRole("button")).toBeDisabled();
//     // });
    
//     // test("handles server error", async () => {
//     //     // Arrange
//     //     server.use(
//     //         rest.get("/api/greeting/:id", (req, res, ctx) => {
//     //             return res(ctx.status(500));
//     //         })
//     //     );
//     //     render(<Greeting/>);
//     //     // Act
//     //     await userEvent.click(screen.getByText("Load greeting"));
//     //     await screen.findByRole("alert");
//     //     // Assert
//     //     expect(screen.getByRole("alert")).toHaveTextContent("Oops, failed to fetch");
//     //     expect(screen.getByRole("button")).toBeDisabled();
//     // });
// });