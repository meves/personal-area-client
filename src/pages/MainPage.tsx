import React from "react";
import { Navbar } from "../components/Navbar.tsx";
import { Users } from "../components/Users";

const MainPage = () => {
    return (
        <div className="container">
            <Navbar/>
            <Users/>
        </div>
    );
}

export default MainPage;