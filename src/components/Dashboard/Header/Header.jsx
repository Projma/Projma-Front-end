import React from "react";
import Nav from "../Nav/Nav";
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
            <Nav />
            {/* <div className="top-section">
      </div> */}
        </header>
    );
};

export default Header;
