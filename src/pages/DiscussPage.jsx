import React from "react";
import { Helmet } from "react-helmet";
import "../styles/DiscussPage.scss";
import Header from "../components/Header/Header";
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
        </div>
    );
};

export default DiscussPage;