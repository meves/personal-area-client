import React from "react";
import styled from "styled-components";


const FooterWrapper = styled.footer`
    padding: 1em 5em;
    font-size: 0.75rem;
    color: var(--footer-font-color);
    background-color: var(--footer-bg-color);
`;

export const Footer = () => {
    return (
        <FooterWrapper>
            <p>Author: <span>Sergey Medvedkin</span></p>
        </FooterWrapper>
    )
}