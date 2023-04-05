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
import isEmail from "validator/lib/isEmail";
import "../../styles/Registration.css";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";
import apiInstance from "../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom"; // comment for tests
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Shared/Loading";
import { Helmet } from "react-helmet";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers";
// import Header from "../Header/Header";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://Projma.ir/">
        Projma
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [errorFirstName, setErrorFirstName] = React.useState(false);
  const [errorLastName, setErrorLastName] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [errorUsername, setErrorUsername] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [isPost, setIsPost] = React.useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let navigate = useNavigate(); // comment for tests
  // const { state } = useLocation();
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  let errorMessage = "";
  function handleSubmit(event) {
    event.preventDefault();
    errorMessage = "";
    document.getElementById("em").innerHTML = errorMessage;
    if (!isEmail(email)) {
      setErrorEmail(true);
      errorMessage += `*ایمیل وارد شده صحیح نمی باشد<br>`;
    }
    setErrorEmail(false);
    setErrorFirstName(false);
    setErrorLastName(false);
    setErrorPassword(false);
    setErrorUsername(false);
    if (password.length < 8) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password.search(/[a-z]/i) + password.search(/[\d]/) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password.search(/[A-Z]/i) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else {
      const signup_form_data = new FormData();
      signup_form_data.append("first_name", firstName);
      signup_form_data.append("last_name", lastName);
      signup_form_data.append("username", username);
      signup_form_data.append(
        "email",
        convertNumberToEnglish(document.getElementById("email").value)
      );
      signup_form_data.append("password", password);
      setIsPost(true);
      apiInstance
        .post("accounts/users/signup/", signup_form_data)
        .then((res) => {
          toast.success("ثبت‌نام با موفقیت انجام شد.", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
          delay(4000).then(() => navigate("/signin")); // comment for tests
        })
        .catch((res) => {
          if (
            res.request.response.search("username") !== -1 &&
            res.request.response.search("email") !== -1
          ) {
            toast.error("ایمیل و نام کاربری تکراری است.", {
              position: toast.POSITION.BOTTOM_LEFT,
              rtl: true,
            });
            setErrorEmail(true);
            setErrorUsername(true);
          } else if (res.request.response.search("username") !== -1) {
            toast.error("نام کاربری تکراری است.", {
              position: toast.POSITION.BOTTOM_LEFT,
              rtl: true,
            });
            setErrorUsername(true);
          } else if (res.request.response.search("email") !== -1) {
          } else if (res.request.response.search("email") !== -1) {
            toast.error("ایمیل تکراری است.", {
              position: toast.POSITION.BOTTOM_LEFT,
              rtl: true,
            });
            setErrorEmail(true);
          } else if (res.request.response.search("password") !== -1) {
            setErrorPassword(true);
          }
        })
        .finally(() => {
          setIsPost(null);
        });
      return;
    }
    document.getElementById("em").innerHTML = errorMessage;
  }

  return (
    <CacheProvider value={cacheRtl}>
      {/* <Header></Header> */}
      <Helmet>
        <title>صفحه ثبت‌نام</title>
      </Helmet>
      <ToastContainer />
      {isPost ? <Loading /> : null}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box className="Registration--Box">
            <Avatar className="Registration--Box-Avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              className="Registration--Box-Type"
              component="h1"
              variant="h5"
            >
              صفحه ثبت‌نام
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              className="shadow Registration-form"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    id="firstName"
                    label="نام"
                    name="firstname-name"
                    autoComplete="family-name"
                    inputProps={{
                      className: "Registration--StyledTextField-inputProps",
                    }}
                    InputLabelProps={{
                      className: "Registration--StyledTextField-InputText",
                    }}
                    value={convertNumberToPersian(firstName)}
                    onChange={(e) => {
                      setFirstName(convertNumberToEnglish(e.target.value));
                    }}
                    error={errorFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    autoComplete="given-name"
                    name="lastName-name"
                    fullWidth
                    id="lastname"
                    label="نام خانوادگی"
                    autoFocus
                    inputProps={{
                      className: "Registration--StyledTextField-inputProps",
                    }}
                    InputLabelProps={{
                      className: "Registration--StyledTextField-InputText",
                    }}
                    value={convertNumberToPersian(lastName)}
                    onChange={(e) =>
                      setLastName(convertNumberToEnglish(e.target.value))
                    }
                    error={errorLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="username"
                    label="نام کاربری"
                    name="username-name"
                    autoComplete="username"
                    InputLabelProps={{
                      className: "Registration--StyledTextField-InputText",
                    }}
                    inputProps={{
                      className: "Registration--StyledTextField-inputProps",
                    }}
                    value={convertNumberToPersian(username)}
                    onChange={(e) =>
                      setUsername(convertNumberToEnglish(e.target.value))
                    }
                    error={errorUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="email"
                    label="ایمیل"
                    name="email-name"
                    value={convertNumberToPersian(email)}
                    // defaultValue={
                    //   state?.email ? convertNumberToPersian(state?.email) : ""
                    // }
                    autoComplete="email"
                    InputLabelProps={{
                      className: "Registration--StyledTextField-InputText",
                    }}
                    inputProps={{
                      className: "Registration--StyledTextField-inputProps",
                    }}
                    onChange={(e) => {
                      // ////console.log(email)
                      setEmail(convertNumberToEnglish(e.target.value));
                    }}
                    error={errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    name="password-name"
                    label="رمز عبور"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    InputLabelProps={{
                      className: "Registration--StyledTextField-InputText",
                    }}
                    inputProps={{
                      className: "Registration--StyledTextField-inputProps",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errorPassword}
                  />
                </Grid>
              </Grid>
              <Typography
                id="em"
                className="Registration--ShowError-type"
              ></Typography>
              <Button
                type="submit"
                fullWidth
                name="submit-btn"
                role="submit-btn"
                label="ثبت‌نام"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                className="Registration--StyledTextField-InputText"
              >
                signup-btn
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/signin"
                    variant="body2"
                    className="Registration--LinkToSignin"
                  >
                    اکانت دارید؟ وارد شوید
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  );
}
