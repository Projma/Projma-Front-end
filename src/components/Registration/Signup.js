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
// import isEmail from "validator/lib/isEmail";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Registration.css";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";
import apiInstance from "../../utilities/axiosConfig";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://Projma.com/">
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
  const theme = createTheme({
    direction: "rtl",
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // if (!isEmail(email)) {
    //   setErrorEmail(true);
    // }

    if (password.length < 8) {
      setErrorPassword(true);
    }

    const signup_form_data = new FormData();
    signup_form_data.append("first_name", firstName);
    signup_form_data.append("last_name", lastName);
    signup_form_data.append("username", username);
    signup_form_data.append("email", email);
    signup_form_data.append("password", password);
    // const reactData = [
    //   {
    //     first_name: "first_name",
    //     last_name: "last_name",
    //     username: "username",
    //     email: "email",
    //     password: "password",
    //   },
    // ];
    axios
      .post(
        "http://mohammadosoolian.pythonanywhere.com/accounts/users/signup/",
        signup_form_data
      )
      .then((res) => console.log(res))
      .catch((error) => setErrorEmail(true));
    // apiInstance
    //   .post("accounts/users/signup/", reactData)
    //   .then((response) => {
    //     console.log(response);
    //     // return response.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // let state = {
    //   first_name: firstName,
    //   last_name: lastName,
    //   username: username,
    //   password: password,
    //   email: email,
    // };
    // console.log(state);
    // fetch("http://mohammadosoolian.pythonanywhere.com/accounts/users/signup/", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: JSON.stringify(state),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     console.log(result);
    //   });
  };

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
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
            <Typography component="h1" variant="h5" style={style_of_fields}>
              صفحه ثبت‌نام
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 3,

                borderRadius: 3,
                border: "1px solid none",
                backgroundImage:
                  "linear-gradient(to right bottom, #001E3C 0%, #0059B2 130%)",
              }}
              className="shadow"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    fullWidth
                    id="firstName"
                    label="نام"
                    name="firstName"
                    autoComplete="family-name"
                    inputProps={{
                      style: {
                        height: "50px",
                        padding: "0 14px",
                        fontFamily: "Vazir",
                        fontSize: "1.7rem",
                      },
                    }}
                    InputLabelProps={{
                      style: input_text,
                    }}
                    onChange={(e) => setFirstName(e.target.value)}
                    error={errorFirstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <StyledTextField
                    autoComplete="given-name"
                    name="lastName"
                    fullWidth
                    id="lastName"
                    label="نام خانوادگی"
                    autoFocus
                    inputProps={{
                      style: {
                        height: "50px",
                        padding: "0 14px",
                        fontFamily: "Vazir",
                        fontSize: "1.7rem",
                      },
                    }}
                    InputLabelProps={{
                      style: input_text,
                    }}
                    onChange={(e) => setLastName(e.target.value)}
                    error={errorLastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="username"
                    label="نام کاربری"
                    name="username"
                    autoComplete="username"
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
                    error={errorUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    id="email"
                    label="ایمیل"
                    name="email"
                    autoComplete="email"
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
                    onChange={(e) => setEmail(e.target.value)}
                    error={errorEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
                    required
                    fullWidth
                    name="password"
                    label="پسورد"
                    type="password"
                    id="password"
                    autoComplete="new-password"
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
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={input_text}
              >
                ثبت‌نام
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    style={{
                      width: "100%",
                      fontFamily: "Vazir",
                      fontSize: "100%",
                      fontWeight: "bold",
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "10%",
                    }}
                  >
                    اکانت دارید؟ وارد شوید
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
                      style={{ fontSize: "120%", fontFamily: "Vazir" }}
                    >
                      ثبت‌نام با حساب گوگل
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
                      style={{ fontSize: "120%", fontFamily: "Vazir" }}
                    >
                      ثبت‌نام با حساب گیت‌هاب
                    </Typography>
                  </div>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
    </CacheProvider>
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
  borderRadius: 3,
};

const input_text = {
  color: "#fff",
  fontFamily: "Vazir",
  fontSize: "1.3rem",
};

const style_of_fields = {
  textAlign: "right",
  color: "white",
  fontFamily: "Vazir",
  fontSize: "1.7rem",
};
