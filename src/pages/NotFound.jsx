import React from "react";
import { Helmet } from "react-helmet";
import "../styles/NotFound.scss";


const Landing = () => {
    return (
        <div>
            <Helmet>
                <title>پروجما</title>
            </Helmet>
            <p>
                صفحه مورد نظر یافت نشد
            </p>
        </div>
    );
};

export default Landing;