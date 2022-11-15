import React from "react";
import { Layout } from "../components/Layout";
import { Users } from "../components/Users";

const UsersPage = () => {
    return (
        <div className="container">
            <Layout>
                <Users/>
            </Layout>
        </div>
    );
}

export default UsersPage;