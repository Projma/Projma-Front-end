import React from "react";
import ResponsiveAppBar from "../ResponsiveAppBar/ResponsiveAppBar";
import "./Header.scss";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});

const Header = () => {
    return (
        <header>
            <ResponsiveAppBar />;
            {/* <div className="top-section">
            </div> */}
        </header>
    );
};

export default Header;
