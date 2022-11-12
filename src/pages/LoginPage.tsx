import React from "react";
import styled from "styled-components";
import { LoginForm } from "../components/LoginForm";

const LoginPageWraper = styled.div`
    background-color: var(--login-page-bg-color);
`;

const LoginPage = () => {
    return (
        <LoginPageWraper className='centeredContainer flexDirectionColumn'>
            <LoginForm/>
        </LoginPageWraper>
    )
}

export default LoginPage;
