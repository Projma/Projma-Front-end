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
import "../../styles/Registration.scss";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import PerTextField from "../Shared/PerTextField";
import {  toast } from "react-toastify";

import apiInstance from "../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom"; // comment for tests
// import { useDispatch } from "react-redux";
import { login } from "../../actions/authActions";
import { useState } from "react";
import Loading from "../Shared/Loading";
import { Helmet } from "react-helmet";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers";
import useTheme from "../../hooks/useTheme"; 

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
  const {theme, getColor} = useTheme();

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate(); // comment for tests
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
        delay(4000).then(() => navigate("/dashboard")); // comment for tests
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

  const muitheme = createTheme({
    direction: "rtl",
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  return (
    <div style={{width: "100%", height: "100vh"}}>
      {/* <Header></Header> */}
      <Helmet>
        <title>صفحه ورود</title>
      </Helmet>
      {isPost ? <Loading /> : null}
        <ThemeProvider theme={muitheme}>
          <Container
            component="main"
            maxWidth="xs"
            maxHeight="xs"
            style={{
              borderRadius: 3,
              width: "100%", height: "100%"
            }}
          >
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
                style={{color: getColor(theme.minorBg)}}
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
                <PerTextField
                  margin="normal"
                  fullWidth
                  required="required"
                  id="username"
                  label="نام کاربری"
                  name="Username"
                  InputLabelProps={{
                    className: "Registration--PerTextField-InputText",
                  }}
                  inputProps={{
                    className: "Registration--PerTextField-inputProps",
                  }}
                  onChange={(e) =>
                    setUsername(convertNumberToEnglish(e.target.value))
                  }
                  value={convertNumberToPersian(username)}
                  autoComplete="username"
                  error={errorUsername}
                  autoFocus
                />
                <PerTextField
                  margin="normal"
                  fullWidth
                  required="required"
                  name="Password"
                  label="رمز عبور"
                  type="password"
                  id="password"
                  InputLabelProps={{
                    className: "Registration--PerTextField-InputText",
                  }}
                  inputProps={{
                    className: "Registration--PerTextField-inputProps",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  error={errorPassword}
                  autoComplete="current-password"
                  autoFocus
                />
                <Button
                  type="submit"
                  role="submit-btn"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  className="Registration--PerTextField-InputText"
                >
                  ورود
                </Button>
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
    </div>
  );
}
