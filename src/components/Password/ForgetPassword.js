import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import StyledTextField from "../Shared/StyledTextField";
import Footer from "../Shared/Footer";
import apiInstance from "../../utilities/axiosConfig";
import PerTextField from "../Shared/PerTextField";
import axios, { AxiosResponse, AxiosError } from "axios";
import Loading from "../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/ReactToastify.css";
import { Navigate, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [isPost, setIsPost] = useState(null);
  const [isFail, setIsFail] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();
  // const [valid,setValid] = (false);

  useEffect(() => {
    setErrorEmail(false);
  }, [email]);

  const postreq = () => {
    const data = new FormData();
    data.append("email", email);
    axios
      .post(
        "http://mohammadosoolian.pythonanywhere.com/accounts/forgot-password/",
        data
      )
      .then(() => {
        setIsFail(true);
        toast.success("ایمیل تغییر رمز عبور با موفقیت ارسال شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
        const getLinkInfo = () => {
          return email.split("@")[1];
        };
        const emailURL = getLinkInfo();
        console.log(emailURL);
        if (
          emailURL === "gmail.com" ||
          emailURL === "yahoo.com" ||
          emailURL === "outlook.com"
        )
          delay(7000).then(() =>
            window.location.replace("https://" + emailURL)
          );
        else delay(7000).then(() => navigate("/"));
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsFail(true);
          setErrorEmail(true);
          toast.error("ایمیل وارد شده در سایت پروجما ثبت نشده است", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
        // setIsFail(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("em").innerHTML = "";
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
      setIsPost(true);
      postreq();
    }
  };

  document.body.style.backgroundColor = "#0A1929";

  return (
    <>
      {isPost ? <Loading /> : null}
      {isFail ? <ToastContainer autoClose={5000} style={{fontSize:"1.2rem"}}/> : null}
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
              sx={{ mb: 1, fontSize: "2rem(10)" }}
            >
              فراموشی رمز عبور
            </Typography>
            <PerTextField>
              {/* <CssBaseline /> */}
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
                    fontSize: "1.6rem(10)",
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
                fontSize: "1.6rem(10)",
              }}
            >
              ارسال ایمیل
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
