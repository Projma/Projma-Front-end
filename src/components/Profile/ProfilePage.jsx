import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/Profile.css";
import profile_preview from "../../static/images/profile/profile-preview.png";
import userEvent from "@testing-library/user-event";
import { fontWeight } from "@mui/system";
import { useState } from "react";
import axios from "axios";
import StyledTextField from "./StyledTextField";
import { CacheProvider } from "@emotion/react";
import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "react-multi-date-picker";
import DatePicker from "react-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function Profile() {
  // const userData = replaceUndefinied(useSelector(state => state.auth));
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
  const [file, setFile] = useState(profile_preview);
  const [changeImage, setChangeImage] = useState(false);
  const [binaryFile, setBinaryFile] = useState(null);

  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setChangeImage(true);

    let picture = e.target.files[0];
    console.log("picture", picture);
    setBinaryFile(picture);
  };
  const [birthDate, setBirthDate] = useState(new Date());
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
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjY4OTc5MTQ4LCJpYXQiOjE2Njg5NzU1NDgsImp0aSI6IjNiY2YwOGQ1MDkyOTRmZWFiMmQyYWFiZGNlY2IyNDkxIiwidXNlcl9pZCI6NH0.UNt3gpUaMS5KacVqlKOw-wu57ywKrJpXKxr79MneH24";
  const header = `Authorization: token ${token}`;
  // axios
  //   .get("https://mohammadosoolian.pythonanywhere.com/accounts/users/", {
  //     headers: {
  //       header,
  //     },
  //   })
  //   .then((res) => {
  //     setUserDetail(res.data);
  //     console.log(res.data);
  //   });

  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="profile-container profile-page">
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
              <div
                style={{ marginTop: "20%", direction: "rtl", color: "white" }}
              >
                <h5>درباره</h5>
                <p>متن بیو</p>
              </div>
            </div>
            <div className="profile-box">
              <div className="profile-box-header flex justify-between">
                <h3 style={{ color: "white" }} className="neonText">
                  اطلاعات فردی
                </h3>
              </div>
              <div className="profile-box-body">
                <div className="flex">
                  <div className="flex-row" style={{ width: "120%" }}>
                    <StyledTextField
                      margin="normal"
                      required="required"
                      id="firstName"
                      fullWidth
                      label="نام"
                      name="firstName"
                      InputLabelProps={{
                        style: input_text,
                      }}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="firstname"
                      error={errorFirstName}
                      autoFocus
                      inputProps={{
                        style: {
                          height: "60px",
                          padding: "0 14px",
                          fontFamily: "Vazir",
                        },
                      }}
                    />
                    <StyledTextField
                      margin="normal"
                      required="required"
                      id="lastname"
                      fullWidth
                      label="نام خانوادگی"
                      name="lastname"
                      InputLabelProps={{
                        style: input_text,
                      }}
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="lastname"
                      error={errorLastName}
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
                </div>
                <div className="flex">
                  <div className="flex-row" style={{ width: "120%" }}>
                    <StyledTextField
                      margin="normal"
                      required="required"
                      id="email"
                      fullWidth
                      label="ایمیل"
                      name="email"
                      InputLabelProps={{
                        style: input_text,
                      }}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      error={errorEmail}
                      autoFocus
                      inputProps={{
                        style: {
                          height: "60px",
                          padding: "0 14px",
                          fontFamily: "Vazir",
                        },
                      }}
                    />
                    <StyledTextField
                      margin="normal"
                      required="required"
                      id="username"
                      fullWidth
                      label="نام کاربری"
                      name="username"
                      InputLabelProps={{
                        style: input_text,
                      }}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      error={errorUsername}
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
                </div>
                <div style={{ direction: "rtl", marginTop: "4%", marginBottom: "4%" }}>
                  <span
                    className=""
                    style={{
                      marginLeft: "2%",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  >
                    تاریخ تولد
                  </span>
                  <DatePicker
                    calendar="persian"
                    locale="fa"
                    calendarPosition="bottom-right"
                    value={birthDate}
                    onChange={setBirthDate}
                  />
                </div>
                <div className="flex">
                  <StyledTextField
                    margin="normal"
                    required="required"
                    id="bio"
                    sx={{ width: "50%", height: "100" }}
                    label="درباره"
                    name="bio"
                    InputLabelProps={{
                      style: input_text,
                    }}
                    autoComplete="bio"
                    autoFocus
                    style={{ height: "100px" }}
                    inputProps={{
                      style: {
                        height: "100px",
                        fontFamily: "Vazir",
                      },
                    }}
                  />
                </div>
                <div className="flex-row margin-top col-gap-8">
                  <Avatar
                    src={file}
                    alt="profile"
                    sx={{
                      mt: 1,
                      width: "15vmin",
                      height: "15vmin",
                      borderRadius: "50%",
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      width: "20%",
                    }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        color: "white",
                        width: "100%",
                        height: "30%",
                        mt: 2,
                        // display: "flex",
                        // flexDirection: "column",
                        // alignSelf: "flex-end",
                      }}
                    >
                      <p style={{ fontSize: "0.8rem" }}>انتخاب عکس</p>
                      <input
                        type="file"
                        hidden
                        onChange={handleChange}
                        accept=".jpg,.jpeg,.png"
                      />
                    </Button>
                  </div>
                </div>
              </div>
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
