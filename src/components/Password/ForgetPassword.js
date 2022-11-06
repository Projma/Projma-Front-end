import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";
import axios from "axios";
import Footer from "./Footer";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("em").innerHTML = "";
    setErrorEmail(false);
    const errtest = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      email
    );
    if (!errtest) {
      setErrorEmail(true);
      document.getElementById("em").innerHTML =
        "*آدرس ایمیل وارد شده معتبر نمی باشد";
    }
    // const login_form_data = new FormData();
    // login_form_data.append("email", email);
    // axios
    //   .post(
    //     "http://mohammadosoolian.pythonanywhere.com/accounts/login/token/",
    //     login_form_data
    //   )
    //   .then((res) => console.log(res));
  };
  document.body.style.backgroundColor = "#0A1929";
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            maxWidth: 500,
            maxHeight: 300,
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
            <Typography component="h1" variant="h5" color="#fff" sx={{ mb: 1 }}>
              فراموشی رمز عبور
            </Typography>
            <CacheProvider value={cacheRtl}>
              <ThemeProvider theme={theme}>
                <StyledTextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="آدرس ایمیل"
                  placeholder="آدرس ایمیل خود را وارد کنید"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  error={errorEmail}
                  autoFocus
                  sx={{
                    input: {
                      color: "#fff",
                    },
                  }}
                />
              </ThemeProvider>
            </CacheProvider>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: "#66B2FF" }}
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

export default ForgetPassword;
