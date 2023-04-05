import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Registration.css";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiInstance from "../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../actions/authActions";
import { useState } from "react";
import Loading from "../Shared/Loading";
import { Helmet } from "react-helmet";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers.js";
// import Header from "../Header/Header";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://projma.com/">
        Projma
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [errorUsername, setErrorUsername] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [isPost, setIsPost] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();
  // const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorUsername(false);
    setErrorPassword(false);
    const login_form_data = new FormData();
    login_form_data.append("username", username);
    login_form_data.append("password", password);
    setIsPost(true);
    apiInstance
      .post("accounts/login/token/", login_form_data)
      .then((response) => {
        if (response.data.access) {
          localStorage.setItem("access_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);
        }
        toast.success("با موفقیت وارد شدی.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        // dispatch(login());
        delay(4000).then(() => navigate("/dashboard"));
      })
      .catch((res) => {
        if (res.request.response.search("active") !== -1) {
          toast.error("حساب کاربری شما غیر فعال است، لطغا آن را فعال کنید.", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
          return;
        }
        toast.error("نام کاربری یا رمز عبور اشتباه است.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        setErrorUsername(true);
        setErrorPassword(true);
      })
      .finally(() => {
        setIsPost(null);
      });
  };

  const theme = createTheme({
    direction: "rtl",
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <div>
      {/* <Header></Header> */}
      <Helmet>
        <title>صفحه ورود</title>
      </Helmet>
      {isPost ? <Loading /> : null}
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="xs"
            style={{
              borderRadius: 3,
            }}
          >
            <CssBaseline />
            <Box
              className="Registration--Box"
              sx={{
                marginTop: 8,
              }}
            >
              <Avatar className="Registration--Box-Avatar">
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                className="Signin--Box-Type"
              >
                صفحه ورود
              </Typography>
              <Box
                component="form"
                className="Registration-form shadow"
                onSubmit={handleSubmit}
                noValidate
                error
              >
                <StyledTextField
                  margin="normal"
                  fullWidth
                  required="required"
                  id="username"
                  label="نام کاربری"
                  name="Username"
                  InputLabelProps={{
                    className: "Registration--StyledTextField-InputText",
                  }}
                  inputProps={{
                    className: "Registration--StyledTextField-inputProps",
                  }}
                  onChange={(e) =>
                    setUsername(convertNumberToEnglish(e.target.value))
                  }
                  value={convertNumberToPersian(username)}
                  autoComplete="username"
                  error={errorUsername}
                  autoFocus
                />
                <StyledTextField
                  margin="normal"
                  fullWidth
                  required="required"
                  name="Password"
                  label="رمز عبور"
                  type="password"
                  id="password"
                  InputLabelProps={{
                    className: "Registration--StyledTextField-InputText",
                  }}
                  inputProps={{
                    className: "Registration--StyledTextField-inputProps",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errorPassword}
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  role="submit-btn"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="Registration--StyledTextField-InputText"
                >
                  ورود
                </Button>
                <ToastContainer />
                <Grid container style={{ marginBottom: "5%", marginTop: "1%" }}>
                  <Grid item xs>
                    <Link
                      href="/forget-password"
                      variant="body2"
                      className="Signin--Link"
                    >
                      فراموشی رمز عبور
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/signup"
                      variant="body2"
                      className="Signin--Link"
                    >
                      {"اکانت ندارید؟ ثبت‌نام کنید"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
          </Container>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
