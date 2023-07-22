import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/Profile.scss";
import profile_preview from "../../static/images/profile/blank.png";
import { useState, useCallback } from "react";
import StyledTextField from "./StyledTextField";
import { CacheProvider } from "@emotion/react";
import { Button, Box } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import apiInstance from "../../utilities/axiosConfig";
import PersonIcon from "@mui/icons-material/Person";
import PasswordIcon from "@mui/icons-material/Password";
import Typography from "@mui/material/Typography";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

import Loading from "../Shared/Loading";
import { baseUrl } from "../../utilities/constants";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ChangePassword() {
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  const [password, setPassword] = React.useState("");
  const [errorPassword, setErrorPassword] = React.useState(false);
  const [password2, setPassword2] = React.useState("");
  const [errorPassword2, setErrorPassword2] = React.useState(false);
  const [password3, setPassword3] = React.useState("");
  const [errorPassword3, setErrorPassword3] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [getImage, setGetImage] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [file, setFile] = useState(profile_preview);

  React.useEffect(() => {
    apiInstance.get("/accounts/profile/myprofile/").then((res) => {
      setFirstName(res.data.user.first_name);
      setLastName(res.data.user.last_name);
      setUsername(res.data.user.username);
      setGetImage(res.data.profile_pic);
    });
  }, []);
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
    document.getElementById("em").innerHTML = errorMessage;
    setErrorPassword(false);
    setErrorPassword2(false);
    setErrorPassword3(false);
    event.preventDefault();
    if (password.length < 8) {
      setErrorPassword(true);
      errorMessage += `*رمز عبور باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password2.length < 8) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password3.length < 8) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید بالای 8 کاراکتر باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password2.search(/[a-z]/i) + password2.search(/[\d]/) < 0) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password3.search(/[a-z]/i) + password3.search(/[\d]/) < 0) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید شامل کاراکتر و عدد باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password2.search(/[A-Z]/i) < 0) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password3.search(/[A-Z]/i) < 0) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید حداقل شامل یک حرف بزرگ باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password2.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword2(true);
      errorMessage += `*رمز عبور جدید باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password3.search(/[!|@|#|$|%|^|&|*]/) < 0) {
      setErrorPassword3(true);
      errorMessage += `*تکرار رمز عبور جدید باید شامل حداقل یکی از کاراکتر های !@#$%^&* باشد<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else if (password2 !== password3) {
      setErrorPassword2(true);
      setErrorPassword3(true);
      errorMessage += `*رمز عبور های وارد شده یکسان نیست<br>`;
      document.getElementById("em").innerHTML = errorMessage;
    } else {
      const change_password_form_data = new FormData();
      change_password_form_data.append("old_password", password);
      change_password_form_data.append("new_password", password2);
      setIsPost(true);
      apiInstance
        .post("/accounts/profile/change-password/", change_password_form_data)
        .then((res) => {
          toast.success("رمز عبور با موفقیت تغییر کرد", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        })
        .catch((err) => {
          toast.error("رمز عبور قبلی اشتباه است", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        })
        .finally(() => {
          setIsPost(null);
        });
    }
  };
  return (
    <div>
      <Helmet>
        <title>تغییر رمز عبور</title>
      </Helmet>
      {isPost ? <Loading /> : null}
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div
            className="profile--container profile--page"
            style={{ marginTop: "2%" }}
          >
            <div className="profile--information row-gap-8">
              <div className="profile--box-body-profile-container">
                <Avatar
                  className="Avatar profile--pictureView"
                  src={getImage !== null ? `${baseURL}${getImage}` : file}
                  alt="profile"
                />
              </div>
              <div
                className="flex-col row-gap-8 align-center"
                style={{ width: "100%", marginTop: "20%" }}
              >
                <h3 className="flex profile--information-fname-lname profile--leftMenu-text">
                  {convertNumberToPersian(firstName)}
                </h3>
                <h3 className="flex profile--information-fname-lname profile--leftMenu-text">
                  {convertNumberToPersian(lastName)}
                </h3>
                <h4 className="neonText profile--leftMenu-text">
                  {`${convertNumberToPersian(username)}@`}
                </h4>
              </div>
              <div
                style={{
                  color: "white",
                  rowGap: "13px",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "13%",
                }}
              >
                <Button variant="text" href="/profile">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <PersonIcon className="profile--rightMenu-icon"></PersonIcon>
                    <div
                      style={{
                        fontSize: "11px",
                        width: "84px",
                        color: "white",
                      }}
                    >
                      اطلاعات حساب
                    </div>
                  </div>
                </Button>
                <Button variant="text" href="/changepassword">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <PasswordIcon className="profile--rightMenu-icon"></PasswordIcon>
                    <div
                      style={{
                        fontSize: "11px",
                        width: "84px",
                        color: "white",
                      }}
                    >
                      تغییر رمز عبور
                    </div>
                  </div>
                </Button>
              </div>
            </div>

            <Box
              className="profile--box-changePassword"
              component="form"
              onSubmit={handleSubmit}
            >
              <div className="profile--box-header flex justify-between">
                <h3 className="neonText">تغییر رمز عبور</h3>
              </div>
              <div className="profile--box-body">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div className="flex" style={{ marginTop: "20%" }}>
                    <StyledTextField
                      role="textbox"
                      margin="normal"
                      required="required"
                      id="password1"
                      label="رمز عبور فعلی"
                      name="password1"
                      type="password"
                      InputLabelProps={{
                        className: "profile--styleTextField-labelText",
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
                      role="textbox"
                      margin="normal"
                      required="required"
                      id="password2"
                      label="رمز عبور جدید"
                      name="password2"
                      type="password"
                      InputLabelProps={{
                        className: "profile--styleTextField-labelText",
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
                  <div className="flex" style={{ marginBottom: "15%" }}>
                    <StyledTextField
                      role="textbox"
                      margin="normal"
                      required="required"
                      id="password3"
                      label="تکرار رمز عبور جدید"
                      name="password3"
                      type="password"
                      InputLabelProps={{
                        className: "profile--styleTextField-labelText",
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
                      role="submit-btn"
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      className="profile--submitButton"
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
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
