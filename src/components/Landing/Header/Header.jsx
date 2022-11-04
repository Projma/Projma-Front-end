import React from "react";
import Nav from "../Nav/Nav";
import "./Header.css";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import x from "../../../static/images/landing1.jpg";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "../StyledTextField";
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
      <div className="top-section">
        <div className="top-el top-el-1 top-el-img">
          <img src={x} className="responsive--height" />
        </div>
        <div className="top-el top-el-2">
          <Box
            sx={{
              marginRight: "5%",
              marginTop: "15%",
            }}
          >
            <h1 className="responsive--font--size--2">
              با پروجما کیفیت کار تیمی خود را ارتقا دهید
            </h1>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="ایمیل"
                  placeholder="آدرس ایمیل خود را وارد کنید"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  sx={{ width: "60%", display: "block" }}
                />
              </ThemeProvider>
            </CacheProvider>
            <Button
              variant="contained"
              sx={{
                height: 54,
                width: 150,
                fontSize: "90%",
                width: "30%",
                height: "100%",
              }}
            >
              رایگان ثبت نام کنید
            </Button>
          </Box>
        </div>
      </div>
    </header>
  );
};

export default Header;
