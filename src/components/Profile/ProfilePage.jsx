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
  const handleSubmit = (event) => {
    setErrorFirstName(false);
    setErrorLastName(false);
    setErrorUsername(false);
    setErrorEmail(false);
    setErrorPassword(false);
    event.preventDefault();
    if (firstName === "") {
      setErrorFirstName(true);
      return;
    } else if (lastName === "") {
      setErrorLastName(true);
      return;
    } else if (username === "") {
      setErrorUsername(true);
      return;
    } else if (email === "") {
      setErrorEmail(true);
      return;
    }

    const signup_form_data = new FormData();
    signup_form_data.append("first_name", firstName);
    signup_form_data.append("last_name", lastName);
    signup_form_data.append("username", username);
    signup_form_data.append("email", email);
    signup_form_data.append("password", password);
    axios
      .post(
        "http://mohammadosoolian.pythonanywhere.com/accounts/users/signup/",
        signup_form_data
      )
      .then((res) => console.log(res));
    // .catch((error) => setErrorEmail(true));
  };
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
  apiInstance.get("/accounts/users/").then((res) => {
    setUserDetail(res.data);
    console.log(res.data);
  });

  const [message, setMessage] = useState("");
  const handleInputKeyDown = useCallback((event) => {
    if (event.keyCode === 8 || event.keyCode === 46) {
      setMessage("Reset through handleInputKeyDown");
      setBirthDate(null);
    }
  }, []);
  const handleReset = useCallback(() => {
    setMessage("Reset through handleReset");
    setBirthDate(null);
  }, []);
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
              <div style={{ marginTop: "20%", width: "100%" }}>
                <button className="btn">
                  <a href="/profile">
                    <div
                      className="flex-row-information"
                      style={{ alignItems: "center" }}
                    >
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
                        className="neonText text-information-media"
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
                        className="flex-row-information"
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
                          className="neonText text-information-media"
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
                  اطلاعات فردی
                </h3>
              </div>
              <Box component="form" onSubmit={handleSubmit}>
                <div className="profile-box-body">
                  <div
                    className="flex margin-top col-gap-8"
                    style={{ justifyContent: "center", marginBottom: "1%" }}
                  >
                    <div
                      className="avatar-container"
                      style={{ marginTop: "-50px" }}
                    >
                      <Avatar
                        className="Avatar"
                        src={file}
                        alt="profile"
                        sx={{
                          mt: 1,
                          width: "15vmin",
                          height: "15vmin",
                          borderRadius: "50%",
                        }}
                      />
                      <div className="button-container">
                        <Button
                          variant="contained"
                          component="label"
                          color="info"
                        >
                          <p style={{ fontSize: "0.8rem" }}>انتخاب عکس</p>
                          {/* <p>aafaf</p> */}
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
                  <div className="flex">
                    <div className="flex-row" style={{ width: "120%" }}>
                      <StyledTextField
                        className="StyledTextField-media"
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
                        className="StyledTextField-media"
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
                        className="StyledTextField-media"
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
                        className="StyledTextField-media"
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
                  <div
                    className="birthday-border-media"
                    style={{
                      direction: "rtl",
                      marginTop: "4%",
                      marginBottom: "4%",
                      border: "1px solid #66B2FF",
                      borderRadius: "5px",
                      paddingTop: "1.75%",
                      paddingBottom: "1.75%",
                      paddingRight: "1.75%",
                      width: "50%",
                    }}
                  >
                    <div className="birthday-media">
                      <label
                        style={{
                          marginLeft: "2%",
                          color: "#fff",
                          fontSize: "14px",
                        }}
                      >
                        تاریخ تولد
                      </label>
                    </div>
                    <DatePicker
                      className="rmdp-input-media"
                      calendar={persian}
                      locale={persian_fa}
                      value={birthDate}
                      onChange={(val) => setBirthDate(val)}
                      calendarPosition="bottom-right"
                      backgroundColor="#000"
                    />
                  </div>
                  <div className="StyledTextField-media">
                    <StyledTextField
                      className="StyledTextField-media"
                      margin="normal"
                      required="required"
                      id="bio"
                      sx={{ width: "50%" }}
                      label="درباره"
                      name="bio"
                      multiline
                      rows={2}
                      InputLabelProps={{
                        style: input_text,
                      }}
                      autoComplete="bio"
                      autoFocus
                      // style={{ height: "500%" }}
                      inputProps={{
                        style: {
                          height: "100px",
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
