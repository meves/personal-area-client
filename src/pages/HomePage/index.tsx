import React from "react";
import { Layout } from "../../components/common/Layout";
import { Home } from "../../components/Home";

const HomePage = () => {
    return (
        <div className="container">
            <Layout>
                <Home/>
            </Layout>
        </div>
    ) 
}

export default HomePage;