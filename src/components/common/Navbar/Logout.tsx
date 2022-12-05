import React from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../app/hooks";
import { AuthThunk } from "../../../store/authSlice";


export const Logout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(AuthThunk.logout());
        <Navigate to="/" replace={true} />
    } 

    return (
        <LogoutStyled
            onClick={handleLogout}
        >
            logout
        </LogoutStyled>
    )
}

// styles
const LogoutStyled = styled.div`
    margin-left: 1em;
    transition: color 0.2s ease-in;
    
    &:hover {
        cursor: pointer;
        color: var(--blue-color);
    }
`;