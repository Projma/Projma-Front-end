import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import "../../styles/Registration.css";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiInstance from "../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

// toast.configure();
function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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

const theme = createTheme();

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [errorUsername, setErrorUsername] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();
  const notify = () =>
    toast("Wow so easy!", { position: toast.POSITION.TOP_LEFT });
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorUsername(false);
    setErrorPassword(false);

    if (password.length < 8) {
      setErrorPassword(true);
    }
    const login_form_data = new FormData();
    login_form_data.append("username", username);
    login_form_data.append("password", password);

    // const reactData = [{username:'username', password:'password'}];
    // axios
    //   .post(
    //     "http://mohammadosoolian.pythonanywhere.com/accounts/login/token/",
    //     login_form_data
    //   )
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
    // console.log("username");
    // console.log(reactData);

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
        delay(7000).then(() => navigate("/dashboard"));
        // navigate("/dashboard");
      })
      .catch((error) => {
        console.log("error");
        toast.error("نام کاربری یا رمز عبور اشتباه است.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
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
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#001E3C" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                style={{
                  fontFamily: "Vazir",
                  fontSize: "150%",
                  color: "white",
                  fontWeight: "bold",
                  marginBottom: "4%",
                }}
              >
                صفحه ورود
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                error
                sx={{
                  mt: 1,
                  backgroundImage:
                    "linear-gradient(to right bottom, #001E3C 0%, #0059B2 130%)",
                  borderRadius: 3,
                  backgroundColor: "red",
                }}
              >
                <StyledTextField
                  margin="normal"
                  fullWidth
                  required="required"
                  id="username"
                  label="نام کاربری"
                  name="username"
                  InputLabelProps={{
                    style: input_text,
                  }}
                  inputProps={{
                    style: {
                      height: "50px",
                      padding: "0 14px",
                      fontFamily: "Vazir",
                      fontSize: "1.7rem",
                    },
                  }}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  error={errorUsername}
                  autoFocus
                />
                <StyledTextField
                  margin="normal"
                  fullWidth
                  required="required"
                  name="password"
                  label="پسورد"
                  type="password"
                  id="password"
                  InputLabelProps={{
                    style: input_text,
                  }}
                  inputProps={{
                    style: {
                      height: "50px",
                      padding: "0 14px",
                      fontFamily: "Vazir",
                      fontSize: "1.7rem",
                    },
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errorPassword}
                  autoComplete="current-password"
                  style={{ fontFamily: "Vazir" }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  // onClick={notify}
                  sx={{ mt: 3, mb: 2 }}
                  style={{
                    fontFamily: "Vazir",
                    fontSize: "120%",
                    fontWeight: "bold",
                  }}
                >
                  ورود
                </Button>
                {/* <button onClick={notify}>Notify!</button> */}
                <ToastContainer />
                <Grid container style={{ marginBottom: "5%" }}>
                  <Grid item xs>
                    <Link
                      href="#"
                      variant="body2"
                      style={{
                        fontFamily: "Vazir",
                        fontSize: "110%",
                      }}
                    >
                      فراموشی رمز عبور
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link
                      href="/signup"
                      variant="body2"
                      style={{ fontFamily: "Vazir", fontSize: "110%" }}
                    >
                      {"اکانت ندارید؟ ثبت‌نام کنید"}
                    </Link>
                  </Grid>
                </Grid>
                <Grid Container style={{ textAlign: "center" }}>
                  <Grid item xs>
                    <div style={icon_style}>
                      <GoogleIcon
                        style={{ display: "flex", marginRight: "4%" }}
                      ></GoogleIcon>
                      <Typography
                        style={{
                          fontSize: "120%",
                          fontFamily: "Vazir",
                          color: "black",
                        }}
                      >
                        ورود با حساب گوگل
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
                <Grid Container style={{ textAlign: "center" }}>
                  <Grid item xs>
                    <div style={icon_style}>
                      <GitHubIcon style={{ marginRight: "4%" }}></GitHubIcon>
                      <Typography
                        style={{
                          fontSize: "120%",
                          fontFamily: "Vazir",
                          color: "black",
                        }}
                      >
                        ورود با حساب گیت‌هاب
                      </Typography>
                    </div>
                  </Grid>
                  <Grid item></Grid>
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

const icon_style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1px solid black",
  marginTop: "5px",
  paddingTop: "5px",
  paddingBottom: "5px",
  backgroundColor: "white",
  borderTopRightRadius: "25px",
  borderTopLeftRadius: "25px",
  borderBottomLeftRadius: "25px",
  borderBottomRightRadius: "25px",
};

const input_text = {
  color: "#fff",
  fontFamily: "Vazir",
  fontSize: "1.3rem",
};
