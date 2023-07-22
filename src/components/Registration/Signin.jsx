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
import "../../styles/Registration.scss";
import PerTextField from "../Shared/PerTextField";
import StyledTextField from "../Shared/StyledTextField";
import { toast } from "react-toastify";
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
  const { theme, getColor } = useTheme();
  return (
    <Typography
      variant="body2"
      color={{ color: getColor(theme.mainBg) }}
      align="center"
      {...props}
    >
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
  const { theme, getColor } = useTheme();

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
        delay(2500).then(() => (window.location.href = "/dashboard/")); // comment for tests
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

  return (
    <div style={{ width: "100%", height: "100%", display: "flex",
    alignItems: "center",
    flexFlow: "column",justifyContent: "center" }}>
      {/* <Header></Header> */}
      <Helmet>
        <title>صفحه ورود</title>
      </Helmet>
      {isPost ? <Loading /> : null}
      <Container
        component="main"
        maxWidth="xs"
        maxHeight="xs"
        style={{
          borderRadius: 3,
        }}
      >
        <Box
          className="Registration--Box"
          sx={{
            // marginTop: 8,
            padding: "1rem",
            gap: "1rem"
          }}
        >
          <Typography
            component="h1"
            variant="h5"
            className="Signin--Box-Type"
            style={{ color: getColor(theme.mainBg) }}
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
            <PerTextField>
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
            </PerTextField>
            <Button
              type="submit"
              role="submit-btn"
              fullWidth
              variant="contained"
              color="primary"
              className="Registration--StyledTextField-InputText"
              sx={{mt: "1rem",mb: "1rem"}}
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
                <Link href="/signup" variant="body2" className="Signin--Link">
                  {"اکانت ندارید؟ ثبت‌نام کنید"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </div>
  );
}
