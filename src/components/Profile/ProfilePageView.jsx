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
import { useParams } from "react-router-dom";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ProfileView() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = React.useState("");
  const temp = useParams();
  // console.log(temp.username);
  React.useEffect(() => {
    axios
      .get(
        `http://mohammadosoolian.pythonanywhere.com/accounts/profile/public-profile/${temp.username}/`
      )
      .then((res) => {
        setFirstName(res.data.user.first_name);
        setLastName(res.data.user.last_name);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setPassword(res.data.user.password);
        setBio(res.data.bio);
        setLoading(false);
        console.log(res.data.user.firstName);
      });
  });
  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="profile-container profile-page">
            <div className="profile-box-profile-view">
              <div
                className="box-profile-view"
                style={{ alignItems: "center" }}
              >
                <div className="profile-box-header flex justify-between">
                  <h3 style={{ color: "white" }} className="neonText">
                    اطلاعات فردی
                  </h3>
                </div>
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
                      // src={file}
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
                        <input type="file" hidden accept=".jpg,.jpeg,.png" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex" style={{ marginTop: "5%" }}>
                  <div
                    className="flex-row"
                    style={{ width: "120%", marginTop: "5%" }}
                  >
                    <div className="flex-col show-box show-box-media">
                      <label
                        for="first_name"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        نام
                      </label>
                      <h3
                        className="detail-css"
                        style={{
                          color: "white",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        {firstName}
                      </h3>
                    </div>
                    <div className="flex-col show-box show-box-media">
                      <label
                        for="last_name"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        نام خانوادگی
                      </label>
                      <h3
                        className="detail-css"
                        style={{
                          color: "white",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        {lastName}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex" style={{ marginTop: "5%" }}>
                  <div className="flex-row" style={{ width: "120%" }}>
                    <div className="flex-col show-box show-box-media">
                      <label
                        for="email"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        ایمیل
                      </label>
                      <h3
                        className="detail-css email-font-size"
                        style={{
                          color: "white",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        {email}
                      </h3>
                    </div>
                    <div className="flex-col show-box show-box-media">
                      <label
                        for="username"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        نام کاربری
                      </label>
                      <h3
                        className="detail-css"
                        style={{
                          color: "white",
                          fontWeight: "normal",
                          textAlign: "center",
                        }}
                      >
                        {username}
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <div className="flex-col show-box show-box-media">
                    <label
                      for="birthday"
                      className="title-css"
                      style={{ marginRight: "2%" }}
                    >
                      تاریخ تولد
                    </label>
                    <h3
                      className="detail-css"
                      style={{
                        color: "white",
                        fontWeight: "normal",
                        textAlign: "center",
                      }}
                    >
                      1380/10/24
                    </h3>
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <div className="flex-col show-box show-box-media bio-media">
                    <label
                      for="bio"
                      className="title-css"
                      style={{ marginRight: "2%" }}
                    >
                      درباره
                    </label>
                    <h3
                      className="detail-css"
                      style={{
                        color: "white",
                        fontWeight: "normal",
                        textAlign: "center",
                        wordBreak: "break-word",
                      }}
                    >
                      {bio}
                    </h3>
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

const style_of_fields = {
  textAlign: "right",
  color: "white",
  fontFamily: "Vazir",
  fontSize: "100%",
};
