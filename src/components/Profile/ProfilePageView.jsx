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

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ProfileView() {
  const [file, setFile] = useState(profile_preview);
  const [userDetail, setUserDetail] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
  });
  apiInstance.get("/accounts/users/").then((res) => {
    setUserDetail(res.data);
    console.log(res.data);
  });
  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="profile-container profile-page">
            <div className="profile-box">
              <div className="profile-box-header flex justify-between">
                <h3 style={{ color: "white" }} className="neonText">
                  اطلاعات فردی
                </h3>
              </div>
              <div className="profile-box-body" style={{ textAlign: "center" }}>
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
                        <input type="file" hidden accept=".jpg,.jpeg,.png" />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex" style={{ marginTop: "5%" }}>
                  <div className="flex-row" style={{ width: "120%" }}>
                    <div
                      className="flex-col"
                      style={{
                        rowGap: 7,
                        width: "50%",
                        border: "1px solid #66B2FF",
                        borderRadius: "5px",
                        paddingTop: "0.5%",
                        paddingBottom: "0.5%",
                      }}
                    >
                      <label for="first_name" className="title-css">
                        نام
                      </label>
                      <h3
                        className="detail-css"
                        style={{ color: "white", fontWeight: "normal" }}
                      >
                        نوید
                      </h3>
                    </div>
                    <div
                      className="flex-col"
                      style={{
                        rowGap: 7,
                        width: "50%",
                        border: "1px solid #66B2FF",
                        borderRadius: "5px",
                        paddingTop: "0.5%",
                        paddingBottom: "0.5%",
                      }}
                    >
                      <label for="last_name" className="title-css">
                        نام خانوادگی
                      </label>
                      <h3
                        className="detail-css"
                        style={{ color: "white", fontWeight: "normal" }}
                      >
                        ابراهیمی
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="flex" style={{ marginTop: "5%" }}>
                  <div className="flex-row" style={{ width: "120%" }}>
                    <div
                      className="flex-col"
                      style={{
                        rowGap: 7,
                        width: "50%",
                        border: "1px solid #66B2FF",
                        borderRadius: "5px",
                        paddingTop: "0.5%",
                        paddingBottom: "0.5%",
                      }}
                    >
                      <label for="email" className="title-css">
                        ایمیل
                      </label>
                      <h3
                        className="detail-css"
                        style={{ color: "white", fontWeight: "normal" }}
                      >
                        Navid@gmail.com
                      </h3>
                    </div>
                    <div
                      className="flex-col"
                      style={{
                        rowGap: 7,
                        width: "50%",
                        border: "1px solid #66B2FF",
                        borderRadius: "5px",
                        paddingTop: "0.5%",
                        paddingBottom: "0.5%",
                      }}
                    >
                      <label for="username" className="title-css">
                        نام کاربری
                      </label>
                      <h3
                        className="detail-css"
                        style={{ color: "white", fontWeight: "normal" }}
                      >
                        Navidium
                      </h3>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <div
                    className="flex-col"
                    style={{
                      rowGap: 7,
                      width: "50%",
                      border: "1px solid #66B2FF",
                      borderRadius: "5px",
                      paddingTop: "0.5%",
                      paddingBottom: "0.5%",
                    }}
                  >
                    <label for="birthday" className="title-css">
                      تاریخ تولد
                    </label>
                    <h3
                      className="detail-css"
                      style={{ color: "white", fontWeight: "normal" }}
                    >
                      1380/10/24
                    </h3>
                  </div>
                </div>
                <div style={{ marginTop: "5%" }}>
                  <div
                    className="flex-col"
                    style={{
                      rowGap: 7,
                      width: "50%",
                      border: "1px solid #66B2FF",
                      borderRadius: "5px",
                      paddingTop: "0.5%",
                      paddingBottom: "0.5%",
                    }}
                  >
                    <label for="bio" className="title-css">
                      درباره
                    </label>
                    <h3
                      className="detail-css"
                      style={{ color: "white", fontWeight: "normal" }}
                    >
                      نوید ابراهیمی هستم
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
