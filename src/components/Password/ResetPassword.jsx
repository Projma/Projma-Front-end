import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import StyledTextField from "../Shared/StyledTextField";
import Footer from "../Shared/Footer";
import PerTextField from "../Shared/PerTextField";
import Loading from "../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utilities/axiosConfig";
import axios from "axios";
import { Helmet } from "react-helmet";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorconfirmPassword] = useState(false);
  const [isPost, setIsPost] = useState(null);
  const [isFail, setIsFail] = useState(false);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();

  useEffect(() => {
    setErrorPassword(false);
    setErrorconfirmPassword(false);
  }, [password]);

  const postreq = () => {
    const getLinkInfo = () => {
      return window.location.href.split("reset-password?")[1];
    };
    ////console.log(getLinkInfo(baseLink));
    const data = new FormData();
    data.append("password", password);
    apiInstance
      .post("accounts/reset-password/?" + getLinkInfo(), data)
      .then(() => {
        setIsFail(true);
        toast.success("رمز عبور با موفقیت تغییر کرد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        delay(7000).then(() => navigate("/signin"));
        setIsFail(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsFail(true);
          toast.error("عملیات با خطا مواجه شد ", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
          delay(7000).then(() => navigate("/forget-password"));
        } else if (error.response.status === 400) {
          setIsFail(true);
          setErrorconfirmPassword(true);
          setErrorPassword(true);
          toast.error("رمز وارد شده تکراری است", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
        // setIsFail(false);
      });
  };

  let errorMessage = "";

  const handleSubmit = (event) => {
    event.preventDefault();
    document.getElementById("em").innerHTML = "";
    errorMessage = "";

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
      setIsPost(true);
      postreq();
    }
  };

  document.body.style.backgroundColor = "var(--minor-background)";

  return (
    <>
      {isPost ? <Loading /> : null}

      <Container maxWidth="xs">
        <Helmet>
          <title>تغییر رمز عبور</title>
        </Helmet>
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
            // backgroundColor: "var(--main-background)",
            opacity: 1,
            backgroundImage:
                  "linear-gradient(to right bottom, #001E3C 0%, #0059B2 130%)",
          }}
          inputProps={{
            style: {
              fontFamily: "Vazir",
            },
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
              inputProps={{
                style: {
                  fontFamily: "Vazir",
                },
              }}
            >
              تغییر رمز عبور
            </Typography>
            <PerTextField>
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
                inputProps={{
                  style: {
                    fontFamily: "Vazir",
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
                inputProps={{
                  style: {
                    fontFamily: "Vazir",
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
              inputProps={{
                style: {
                  fontFamily: "Vazir",
                },
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
              inputProps={{
                style: {
                  fontFamily: "Vazir",
                },
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
