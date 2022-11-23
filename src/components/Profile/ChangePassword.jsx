import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/Profile.css";
import profile_preview from "../../static/images/profile/profile-preview.png";
import userEvent from "@testing-library/user-event";
import { fontWeight } from "@mui/system";
import { useState, useCallback } from "react";
import axios from "axios";
import StyledTextField from "./StyledTextField";
import { CacheProvider } from "@emotion/react";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-multi-date-picker";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import apiInstance from "../../utilities/axiosConfig";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import Box from "@mui/material/box";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ChangePassword() {
  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [password2, setPassword2] = React.useState("");
  const [errorPassword2, setErrorPassword2] = React.useState(false);
  const [password3, setPassword3] = React.useState("");
  const [errorPassword3, setErrorPassword3] = React.useState(false);

  const [userDetail, setUserDetail] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
  });
  const theme = createTheme({
    direction: "rtl",
  });
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  let errorMessage = "";
  const handleSubmit = (event) => {
    errorMessage = "";
    setErrorPassword(false);
    setErrorPassword2(false);
    setErrorPassword3(false);
    event.preventDefault();
    if (password.length < 8) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } 
    else if (password2.length < 8) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password3.length < 8) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password.search(/[a-z]/i) + password.search(/[\d]/) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } 
    else if (password2.search(/[a-z]/i) + password2.search(/[\d]/) < 0) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password3.search(/[a-z]/i) + password3.search(/[\d]/) < 0) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password.search(/[A-Z]/i) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } 
    else if (password2.search(/[A-Z]/i) < 0) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password3.search(/[A-Z]/i) < 0) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } 
    else if (password2.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password3.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    }
    else if (password2 !== password3) {
      setErrorPassword2(true);
      setErrorPassword3(true);
      errorMessage += `*رمز عبور های وارد شده یکسان نیست<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else {
      const signup_form_data = new FormData();
      signup_form_data.append("password", password);
      axios
        .post(
          "http://mohammadosoolian.pythonanywhere.com/accounts/users/signup/",
          signup_form_data
        )
        .then((res) => console.log(res));
      // .catch((error) => setErrorEmail(true));
    }
  };
  // apiInstance.get("/accounts/users/").then((res) => {
  //   setUserDetail(res.data);
  //   console.log(res.data);
  // });
  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="profile-container-password-page profile-page">
            <div className="profile-information row-gap-8">
              <div className="profile-box-body-profile-container align-center">
                <img src={profile_preview} />
              </div>
              <div className="flex-col row-gap-8 align-center">
                <h3
                  style={{ fontWeight: "400", fontSize: "90%", color: "white" }}
                  className="neonText"
                >
                  نوید ابراهیمی
                </h3>
                <h4
                  style={{ fontWeight: "400", fontSize: "90%", color: "white" }}
                  className="neonText"
                >
                  @Navidium
                </h4>
              </div>
              <div style={{ marginTop: "20%", width: "100%" }}>
                <button className="btn">
                  <a href="/profile">
                    <div className="flex-row" style={{ alignItems: "center" }}>
                      <PersonIcon
                        style={{
                          color: "white",
                          fontSize: "170%",
                          marginLeft: "10%",
                        }}
                      ></PersonIcon>
                      <h4
                        style={{
                          fontWeight: "400",
                          fontSize: "90%",
                          color: "white",
                        }}
                        className="neonText"
                      >
                        اطلاعات حساب
                      </h4>
                    </div>
                  </a>
                </button>
                <div>
                  <button className="btn">
                    <a href="/changepassword">
                      <div
                        className="flex-row"
                        style={{ alignItems: "center" }}
                      >
                        <PasswordIcon
                          style={{
                            color: "white",
                            fontSize: "170%",
                            marginLeft: "10%",
                          }}
                        ></PasswordIcon>
                        <h4
                          style={{
                            fontWeight: "400",
                            fontSize: "90%",
                            color: "white",
                          }}
                          className="neonText"
                        >
                          تغییر رمز عبور
                        </h4>
                      </div>
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile-box">
              <div className="profile-box-header flex justify-between">
                <h3 style={{ color: "white" }} className="neonText">
                  تغییر رمز عبور
                </h3>
              </div>
              <Box component="form" onSubmit={handleSubmit}>
                <div className="profile-box-body">
                  <div
                    className="flex margin-top col-gap-8"
                    style={{ justifyContent: "center", marginBottom: "1%" }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <div className="flex">
                      <StyledTextField
                        margin="normal"
                        required="required"
                        id="password1"
                        label="رمز عبور فعلی"
                        name="password1"
                        type="password"
                        InputLabelProps={{
                          style: input_text,
                        }}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                        error={errorPassword}
                        autoFocus
                        inputProps={{
                          style: {
                            height: "60px",
                            padding: "0 14px",
                            fontFamily: "Vazir",
                          },
                        }}
                      />
                    </div>
                    <div className="flex">
                      <StyledTextField
                        margin="normal"
                        required="required"
                        id="password2"
                        label="رمز عبور جدید"
                        name="password2"
                        type="password"
                        InputLabelProps={{
                          style: input_text,
                        }}
                        onChange={(e) => setPassword2(e.target.value)}
                        autoComplete="password"
                        error={errorPassword2}
                        autoFocus
                        inputProps={{
                          style: {
                            height: "60px",
                            padding: "0 14px",
                            fontFamily: "Vazir",
                          },
                        }}
                      />
                    </div>
                    <div className="flex">
                      <StyledTextField
                        margin="normal"
                        required="required"
                        id="password3"
                        label="تکرار مجدد رمز عبور جدید"
                        name="password3"
                        type="password"
                        InputLabelProps={{
                          style: input_text,
                        }}
                        onChange={(e) => setPassword3(e.target.value)}
                        autoComplete="password"
                        error={errorPassword3}
                        autoFocus
                        inputProps={{
                          style: {
                            height: "60px",
                            padding: "0 14px",
                            fontFamily: "Vazir",
                          },
                        }}
                      />
                    </div>
                    <div>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        style={style_of_fields}
                      >
                        اعمال تغییرات
                      </Button>
                      <Typography
                        id="em"
                        sx={{
                          mt: 1,
                          textAlign: "right",
                          color: "red",
                          fontWeight: "bold",
                          fontFamily: "Vazir",
                        }}
                      ></Typography>
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}

const input_text = {
  color: "#fff",
  fontFamily: "Vazir",
  height: "100px",
};

const style_of_fields = {
  textAlign: "right",
  color: "white",
  fontFamily: "Vazir",
  fontSize: "100%",
};
