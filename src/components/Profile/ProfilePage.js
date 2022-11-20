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

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function Profile() {
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
  axios
    .get("https://mohammadosoolian.pythonanywhere.com/accounts/users/", {
      headers: {
        header,
      },
    })
    .then((res) => {
      setUserDetail(res.data);
      console.log(res.data);
    });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div className="profile-container profile-page">
          <div className="profile-information row-gap-8">
            <div className="profile-box-body-profile-container align-center">
              <img src={profile_preview} />
            </div>
            <div className="flex-col row-gap-8 align-center">
              <h3 style={{ fontWeight: "400", fontSize: "90%" }}>
                نوید ابراهیمی
              </h3>
              <h4 style={{ fontWeight: "400", fontSize: "90%" }}>@Navidium</h4>
            </div>
            <div style={{ marginTop: "20%", direction: "rtl" }}>
              <h5>درباره</h5>
              <p>متن بیو</p>
            </div>
          </div>
          <div className="profile-box">
            <div className="profile-box-header flex justify-between">
              <h3 style={{ color: "white" }}>اطلاعات فردی</h3>
              {/* <div className="flex align-center col-gap-8">
                <img src={editIcon} />
                <span>ویرایش</span>
              </div> */}
            </div>
            <div className="profile-box-body row-gap-16">
              <div className="flex justify-between row-gap-16">
                <div className="flex-row justify-content">
                  <div className="flex">
                    <StyledTextField
                      margin="normal"
                      fullWidth
                      required="required"
                      id="username"
                      label="نام"
                      name="username"
                      InputLabelProps={{
                        style: input_text,
                      }}
                      // onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      // error={errorUsername}
                      autoFocus
                    />
                  </div>
                  <div className="flex">
                    <StyledTextField
                      margin="normal"
                      required="required"
                      id="username"
                      label="نام خانوادگی"
                      name="username"
                      InputLabelProps={{
                        style: input_text,
                      }}
                      // onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                      // error={errorUsername}
                      autoFocus
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex-col w-50 row-gap-8">
                  <StyledTextField
                    required
                    fullWidth
                    id="username"
                    label="نام کاربری"
                    name="username"
                    autoComplete="username"
                    InputLabelProps={{
                      style: input_text,
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    // error={errorEmail}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex-col w-50 row-gap-8">
                  <StyledTextField
                    required
                    fullWidth
                    id="email"
                    label="ایمیل"
                    name="email"
                    autoComplete="email"
                    InputLabelProps={{
                      style: input_text,
                    }}
                    // onChange={(e) => setEmail(e.target.value)}
                    // error={errorEmail}
                  />
                </div>
              </div>
              <div className="flex">
                <StyledTextField
                  margin="normal"
                  required="required"
                  id="username"
                  sx={{ width: "50%", height: "100" }}
                  label="درباره"
                  name="username"
                  InputLabelProps={{
                    style: input_text,
                  }}
                  // onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  // error={errorUsername}
                  autoFocus
                  style={{ height: "100px" }}
                  inputProps={{
                    style: {
                      height: "100px",
                      // padding: '0 14px',
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

const input_text = {
  color: "#fff",
  fontFamily: "Vazir",
  height: "100px",
};

{
  /* <div className="profile-container"> */
}
{
  /* <div className="profile-box">
        <div className="profile-box-header flex justify-between">
          <h3>اطلاعات فردی</h3>
          <div className="flex align-center col-gap-8">
            <img src={editIcon} />
            <span>ویرایش</span>
          </div>
        </div>
        <div className="profile-box-body row-gap-8">
          <div className="profile-box-body-profile-container align-center">
            <img src={profile_preview} />
            <div className="flex-col row-gap-8">
              <h3 style={{ fontWeight: "400" }}>نوید ابراهیمی</h3>
              <h4>@Navidium</h4>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-col w-50 row-gap-8">
              <h3>نام</h3>
              <h4>نوید </h4>
            </div>
            <div className="flex-col w-50 row-gap-8">
              <h3>نام خانوادگی</h3>
              <h4>ابراهیمی</h4>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-col w-50 row-gap-8">
              <h3 className="not-bold">ایمیل</h3>
              <h4>Navid@gmail.com</h4>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex-col w-50 row-gap-8">
              <h3></h3>
              <h4>نوید</h4>
            </div>
            <div className="flex-col w-50 row-gap-8">
              <h3>نام خانوادگی</h3>
              <h4>ابراهیمی</h4>
            </div>
          </div>
        </div>
      </div>
    </div> */
}
