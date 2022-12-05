import React, { ChangeEvent, FormEvent, MouseEvent, TouchEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuthErrorMessage, AuthThunk } from "../store/authSlice";
import styled from "styled-components";


export const LoginForm = () => {
    const errorMessage = useAppSelector(selectAuthErrorMessage);
    
    const [formType, setFormType] = useState<"signin" | "signup">("signin")
    
    const [inputText, setInputText] = useState({ email: "", password: "" });
    const changeInputText = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        setInputText((prevInputText) => ({...prevInputText, [name]: value}));
    }
    
    const dispatch = useAppDispatch();

    const submitForm = (event: FormEvent<HTMLInputElement>) => {
        event.preventDefault();
        const { email, password } = inputText;
        switch (formType) {
            case "signup":
                dispatch(AuthThunk.signup(email, password));
                break;
            case "signin":
                dispatch(AuthThunk.signin(email, password));
                break;
        }
        setInputText({ email:"", password: ""});
    }

    const toggleFormType = (event: TouchEvent | MouseEvent) => {
        event.preventDefault()
        setFormType((prev) => 
            prev === "signup" ? "signin" : "signup"
        )
    }

    return (
        <div className='centeredContainer flexDirectionColumn'>
            <LoginFormStyled>
                <ErrorMessage>
                    {!!errorMessage && errorMessage}
                </ErrorMessage>
                <Fieldset>
                    <Legend>
                        {formType === "signin" ? "Login" : "Register"}
                    </Legend>
                    <InputField>
                        <label htmlFor="email">email:</label>
                        <input type="email" required name="email" value={inputText.email} onChange={changeInputText} />
                    </InputField>
                    <InputField>
                        <label htmlFor="password">password:</label>
                        <input type="password" required name="password" value={inputText.password} onChange={changeInputText} />
                    </InputField>
                    <ButtonField>
                        <input className="submitButton" type="submit" value={formType === "signin" ? "Login" : "Register"} 
                            onClick={submitForm}
                        />    
                    </ButtonField>
                </Fieldset>
            </LoginFormStyled>
            <Toggle>
                <ChangeFormLable>
                    { formType === "signin" ? "If you have no account " : "If you have an account "}go to
                </ChangeFormLable>
                <ChangeFormLink href="/" onClick={toggleFormType}>
                    { formType === "signin" ? "Register" : "Login"}
                </ChangeFormLink>
            </Toggle>            
        </div>
    )
}


// STYLES
const LoginFormStyled = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const ErrorMessage = styled.div`
    position: absolute;
    right: 5px;
    top: -40px;
    font-size: 0.9em;
    color: var(--error-font-color);
`;

const Fieldset = styled.fieldset`
    padding: 1em 2em;
    border: 3px solid var(--border-form-color);
    border-radius: 0.2em;
`;

const Legend = styled.legend`
    padding-left: 0.5em;
    padding-right: 0.5em;
    font-weight: 700;
`;
        
const InputField = styled.p`
    display: flex;
    justify-content: space-between;
    align-items: center;

    label {
        font-size: 0.9rem;
        text-transform: capitalize;
    }

    input {
        margin-left: 1em;
        padding: 0.5em;
        background-color: var(--input-bg-color);
    }
`;

const ButtonField = styled.p`
    display: flex;
    justify-content: flex-end;
    align-items: center;            
`;


const Toggle = styled.form`
    margin-top: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
`;

const ChangeFormLable = styled.p`
    margin-right: 1em;
    font-size: 0.8rem;
`;

const ChangeFormLink = styled.a`
    font-size: 0.8rem;
    color: var(--link-font-color);
    
    &:hover {
        cursor: pointer;
    }
`;