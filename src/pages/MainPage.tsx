import React from "react";
import { Navbar } from "../components/Navbar.tsx";
import { UserList } from "../components/UserList";

const MainPage = () => {
    return (
        <div className="container">
            <Navbar/>
            <UserList/>
        </div>
    );
}

export default MainPage;