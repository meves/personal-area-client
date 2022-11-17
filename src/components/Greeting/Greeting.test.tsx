import React from "react";
// react testing methods
import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
// custom jest matcher from jest-dom
import "@testing-library/jest-dom";
// Component
import { Greeting } from ".";
// import hooks to mock
import * as useHooks from "../../app/hooks";

jest.mock("../../app/hooks");
jest.mock("../../store/greetingSlice");


const mockUseAppSelector = jest.spyOn(useHooks, "useAppSelector");

afterEach(() => {
    jest.restoreAllMocks()
})

describe("render correct UI", () => {    
    test("first render", async () => {
        // ** ARRANGE
        const dispatch = jest.fn();
        jest.spyOn(useHooks, "useAppDispatch").mockReturnValue(dispatch);
        mockUseAppSelector.mockReturnValue(null);
        // ** ACT
        const { container } = render(<Greeting/>, {
            container: document.body.appendChild(document.createElement("div"))
        })
        // ** ASSERT
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Load greeting");
        expect(screen.queryByRole("heading")).not.toBeInTheDocument();
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();        
    })

    test("click on button results in success", async () => {
        // ** ARRANGE
        const dispatch: any = jest.fn(() => true);
        jest.spyOn(useHooks, "useAppDispatch").mockReturnValue(dispatch);
        mockUseAppSelector.mockReturnValue("Hello");
        const mockOnClick = jest.fn();
        // ** ACT
        const { container } = render(<Greeting/>, {
            container: document.body.appendChild(document.createElement("div"))
        })
        const button = screen.getByRole("button");
        button.onclick = mockOnClick;
        await act(async () => {
            userEvent.click(button);
        })
        // ** ASSERT
        // button
        expect(mockOnClick).toBeCalledTimes(1);
        expect(button).toHaveTextContent("OK");
        // heading
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Hello");
    })

    test("click on button results in an error", async () => {
        // ** ARRANGE
        mockUseAppSelector.mockReturnValue("Internal server error");
        const dispatch: any = jest.fn(() => false);
        jest.spyOn(useHooks, "useAppDispatch").mockReturnValue(dispatch);
        const mockOnClick = jest.fn();
        // ** ACT
        const { container } = render(<Greeting/>, {
            container: document.body.appendChild(document.createElement("div"))
        })
        const button = screen.getByRole("button");
        button.onclick = mockOnClick;
        await act(async () => {
            userEvent.click(button);
        })
        // ** ASSERT
        // button
        expect(mockOnClick).toBeCalledTimes(1);
        expect(button).toHaveTextContent("Load greeting");
        // alert
        const alert = screen.getByRole("alert");
        expect(alert).toBeInTheDocument();
        expect(alert).toHaveTextContent("Oops, failed to fetch");        
    })
})