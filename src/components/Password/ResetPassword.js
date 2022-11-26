import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";
import Footer from "./Footer";
import apiInstance from "../../utilities/axiosConfig";

import axios from "axios";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errorConfirmPassword, setErrorconfirmPassword] = React.useState(false);

  let errorMessage = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("em").innerHTML = "";
    errorMessage = "";
    setErrorPassword(false);
    setErrorconfirmPassword(false);

    if (password.length < 8) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }

    if (password.search(/[a-z]/i) + password.search(/[\d]/) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }

    if (password.search(/[A-Z]/i) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }

    if (password.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }

    if (password !== confirmPassword) {
      setErrorconfirmPassword(true);
      errorMessage += `*رمز عبور های وارد شده یکسان نیست<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }

    if (!(errorPassword || errorConfirmPassword)) {
      const baseLink = window.location.href;

      const getLinkInfo = (baseLink) => {
        return baseLink.split("reset-password?")[1];
      };
      console.log(getLinkInfo(baseLink));
      const data = new FormData();
      data.append("password", password);
      data.append("link", window.location.href);
      const url =
        "http://mohammadosoolian.pythonanywhere.com/accounts/reset-password/?" +
        getLinkInfo(baseLink);
      console.log(url);
      apiInstance.post(url, data).then((res) => console.log(res));
    }
  };

  document.body.style.backgroundColor = "#0A1929";
  return (
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            maxWidth: 500,
            maxHeight: 500,
            marginTop: "40%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            border: "1px solid none",
            borderRadius: 3,
            // backgroundColor: "#001E3C",
            opacity: 1,
            backgroundImage:
              "linear-gradient(to right bottom, #001E3C 0%, #0059B2 130%)",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              margin: 0,
              mt: 3,
              mb: 3,
              mr: 3,
              ml: 3,
              display: "flex",
              flexGrow: 1,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              variant="h5"
              color="#fff"
              sx={{ mb: 1, fontSize: "2rem" }}
            >
              تغییر رمز عبور
            </Typography>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="رمز عبور جدید"
                  placeholder="رمز عبور خود را وارد کنید"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  error={errorPassword}
                  autoFocus
                  sx={{
                    input: {
                      color: "#fff",
                      fontSize: "1.6rem",
                    },
                  }}
                />
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  id="confirm-password"
                  label="تکرار رمز عبور جدید"
                  placeholder="رمز عبور خود را دوباره وارد کنید"
                  name="password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={errorConfirmPassword}
                  autoFocus
                  sx={{
                    input: {
                      color: "#fff",
                      fontSize: "1.6rem",
                    },
                  }}
                />
              </ThemeProvider>
            </CacheProvider>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#265D97",
                fontSize: "1.6rem",
              }}
            >
              تغییر رمز عبور
            </Button>
            <Typography
              id="em"
              sx={{
                mt: 1,
                textAlign: "right",
                color: "red",
                fontWeight: "bold",
              }}
            ></Typography>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default ResetPassword;
