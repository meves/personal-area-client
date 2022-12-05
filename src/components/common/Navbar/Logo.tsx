import React from "react";
import styled from "styled-components";


export const Logo = () => {
    return (
        <LogoStyled>
            <img src="/images/user-icon.svg" alt="user" />
        </LogoStyled>
    )
}

// STYLES
const LogoStyled = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 20px;
            height: 20px;
        }
    
`;