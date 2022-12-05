import React from "react";
import styled from "styled-components";


export const Footer = () => {
    return (
        <FooterComponent>
            <p>Author: <span>Sergey Medvedkin</span></p>
        </FooterComponent>
    )
}

// styles
const FooterComponent = styled.footer`
    padding: 1em 5em;
    font-size: 0.75rem;
    color: var(--footer-font-color);
    background-color: var(--footer-bg-color);
`;