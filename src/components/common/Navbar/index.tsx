import React from "react";
import { Menu } from "../Menu";
import { Logo } from "./Logo";
import { Logout } from "./Logout";
import { UserEmail } from "./UserEmal";
import styled from "styled-components";


export const Navbar = () => {   
    return (
        <NavbarStyled>
            <Menu/>
            <Logo/>
            <UserEmail/>
            <Logout/>
        </NavbarStyled>
    )
}

// styles
const NavbarStyled = styled.nav`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1em 0.75em;
    background-color: var(--navbar-bg-color);
    font-size: 0.65rem;
`;