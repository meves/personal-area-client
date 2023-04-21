import React, { useCallback } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../../app/hooks";
import { AuthThunk } from "../../../store/authSlice";


export const Logout = () => {
    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(AuthThunk.logout());
        <Navigate to="/" replace={true} />
    }, [dispatch]) 

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