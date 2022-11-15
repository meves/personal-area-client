import React from "react";
import { Greeting } from "../components/Greeting";
import { Layout } from "../components/Layout";

const GreetingPage = () => {
    return (
        <div className="container">
            <Layout>
                <Greeting/>
            </Layout>
        </div>
    )
}

export default GreetingPage;
