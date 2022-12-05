import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";


export const Menu = () => {
    return (
        <MenuStyled>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/users">Users</NavLink>
            </li>
            <li>
                <NavLink to="/greeting">Greeting</NavLink>
            </li>
        </MenuStyled>
    )
}

// styles
const MenuStyled = styled.ul`
    margin-right: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style-type: none;

    li {
        a {
            color: #fff;
            text-decoration: none;
            transition: color 0.2s ease-in;

            &:hover {
                color: blue;
            }
        }
    }

    li:not(:last-child) {
        margin-right: 0.5em;
    }
`;