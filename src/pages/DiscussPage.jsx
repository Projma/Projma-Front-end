import React from "react";
import { Helmet } from "react-helmet";
import "../styles/DiscussPage.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Landing/Footer/Footer";
import Discuss from "../components/Retro/Discuss/Discuss";

const DiscussPage = () => {
    return (
        <div style={{
            // scroll: 'auto',
            overflow: 'scroll',
        }}
        >
            <Helmet>
                <title>پروجما</title>
            </Helmet>
            <Discuss style={{
                overflow: 'scroll',
            }}/>
            <Footer/>
        </div>
    );
};

export default DiscussPage;