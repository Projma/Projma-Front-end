import React from "react";
import Nav from "../Nav/Nav";
import "./Header.css";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "../StyledTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Grid from "@mui/material/Grid"; // Grid version 1
import useMediaQuery from "@mui/material/useMediaQuery";
import conversation from "../../../static/images/landing/conversation.svg";
import { useNavigate } from "react-router-dom";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers.js";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const Header = () => {
  const navigate = useNavigate();
  let width = window.innerWidth;
  let isMatch = width > 900 ? true : false;
  // const config = isMatch
  //   ? {
  //       background: "#076585" /* fallback for old browsers */,
  //       background: "-webkit-linear-gradient(to left, #076585, #fff)",
  //       background: "linear-gradient(to left, #076585, #fff)",
  //     }
  //   : {
  //       background: "#076585" /* fallback for old browsers */,
  //       background: "-webkit-linear-gradient(to top, #076585, #fff)",
  //       background: "linear-gradient(to top, #076585, #fff)",
  //     };
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <>
      <Nav />
      <div className="top-section">
        <Grid
          container
          // spacing={{ xs: 1, md: 10, sm: 5 }}
          columns={{ xs: 2, sm: 4, md: 4 }}
          sx = {{
            padding: "0%",
            margin: "0%",
          }}
        >
          <Grid item xs={2} sm={4} md={2}
          sx= {{
            padding: "0%",
            margin: "0%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          >
            <Box
              sx={{
                padding: "10%",
                fontSize: "1.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <h2>
                <b className="black--text">
                  با پروجما کیفیت کار تیمی خود را ارتقا دهید
                </b>
              </h2>
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
                    sx={{ width: "85%", display: "block" }}
                    InputLabelProps={{ style: { fontFamily: "Vazir", fontSize: "2rem" } }}
                    InputProps={{ style: { fontFamily: "Vazir", fontSize: "1.7rem" } }}
                    onChange={(e) => {
                      // ////console.log(e.target.value);
                      document.getElementById("email").value =
                        convertNumberToPersian(e.target.value);
                    }}
                  />
                </ThemeProvider>
              </CacheProvider>
              <Button
                variant="contained"
                onClick={() =>
                  navigate("/signup/", {
                    state: {
                      email: convertNumberToEnglish(
                        document.getElementById("email").value
                      ),
                    },
                  })
                }
                sx={{
                  // height: 54,
                  // width: 150,
                  fontSize: "1.8rem",
                  width: "60%",
                  height: "100%",
                  fontFamily: "Vazir",
                }}
              >
                {" "}
                ثبت نام کنید
              </Button>
            </Box>
          </Grid>
          <Grid
            item xs={2} sm={4} md={2}
            sx={{ 
              display: "flex", 
              justifyContent: "center",
              // justifyContent: "flex-end" ,
              alignItems: "center",
              padding: "0%",
              // background: "#076585" /* fallback for old browsers */,
              backgroundColor: "transparent",
              padding: "0%",
              }}
          >

              <img src={conversation} className="top-img" style={{
                // background: "transparent",
                // backgroundColor: "black",
              }}/>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Header;
