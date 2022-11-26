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
import Footer from "./Footer";
import apiInstance from "../../utilities/axiosConfig";
import PerTextField from "../Board/UI/PerTextField";
import axios, { AxiosResponse, AxiosError } from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = React.useState("");
  const [errorEmail, setErrorEmail] = React.useState(false);
  // const [valid,setValid] = (false);

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("em").innerHTML = "";
    setErrorEmail(false);
    const errtest =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      );
    if (!errtest) {
      setErrorEmail(true);
      document.getElementById("em").innerHTML =
        "*آدرس ایمیل وارد شده معتبر نمی باشد";
    }
    if (!errorEmail) {
      const data = new FormData();
      data.append("email", email);
      apiInstance
        .post(
          "http://mohammadosoolian.pythonanywhere.com/accounts/forgot-password/",
          data
        )
        .catch((error) => {
          if (error.status === 404) {
            setErrorEmail(true);
            console.log(error.status);
          } else if (error.status === 200) {
            console.log("ok");
          }
        });
    }
    // axios.get("/foo").catch(function (error) {
    //   if (error.status === 404) {
    //     setErrorEmail(true);
    //     console.log(error.status);
    //   }
    // });
  };

  const getRequest = async () => {
    await axios.get("/foo").catch(function (error) {
      if (error.status === 404) {
        setErrorEmail(true);
        console.log(error.status);
      }
    });
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
            <Typography
              component="h1"
              variant="h5"
              color="#fff"
              sx={{ mb: 1, fontSize: "2rem" }}
            >
              فراموشی رمز عبور
            </Typography>
            <PerTextField>
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
                    fontSize: "1.6rem",
                  },
                }}
              />
            </PerTextField>

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
                fontSize: "1.6rem",
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
