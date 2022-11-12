import React from "react";
import styled from "styled-components";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar.tsx";
import { Users } from "../components/Users";

const MainPageWrapper = styled.div`
    min-height: 100vh;
    background-color: var(--main-page-bg-color);
`;

const MainPage = () => {
    return (
        <MainPageWrapper className="container">
            <Navbar/>
            <Users/>
            <Footer/>
        </MainPageWrapper>
    );
}

export default MainPage;