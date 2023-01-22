import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/Profile.css";
import { useState } from "react";
import axios from "axios";
import { CacheProvider } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import profile_preview from "../../static/images/profile/profile-preview.png";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function ProfileView() {
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [getImage, setGetImage] = useState("");

  const [bio, setBio] = React.useState("");
  const temp = useParams();
  // ////console.log(temp.username);
  React.useEffect(() => {
    apiInstance
      .get(`/accounts/profile/public-profile/${temp.username}/`)
      .then((res) => {
        ////console.log(res.data);
        setFirstName(res.data.user.first_name);
        setLastName(res.data.user.last_name);
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setGetImage(res.data.profile_pic);
        setBio(res.data.bio);
        ////console.log(res.data.user.firstName);
      });
  });
  return (
    <div>
      <Helmet>
        <title>{firstName + " " + lastName}</title>
      </Helmet>
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
                      src={
                        getImage !== null
                          ? `${baseURL}${getImage}`
                          : profile_preview
                      }
                      alt="profile"
                      sx={{
                        mt: 1,
                        width: "15vmin",
                        height: "15vmin",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="flex"
                  style={{ marginTop: "10%", width: "100%" }}
                >
                  <div
                    className="profile-view-box"
                    style={{ width: "100%", marginTop: "5%" }}
                  >
                    <div className="flex-col profile-view-show-box profile-view-show-box-media">
                      <label
                        for="first_name"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        نام
                      </label>
                      <h3 className="profile-detail-css">{firstName}</h3>
                    </div>
                    <div className="flex-col profile-view-show-box profile-view-show-box-media">
                      <label
                        for="last_name"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        نام خانوادگی
                      </label>
                      <h3 className="profile-detail-css">{lastName}</h3>
                    </div>
                  </div>
                </div>
                <div
                  className="flex"
                  style={{ marginTop: "10%", width: "100%" }}
                >
                  <div className="profile-view-box" style={{ width: "100%" }}>
                    <div className="flex-col profile-view-show-box profile-view-show-box-media">
                      <label
                        for="first_name"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        ایمیل
                      </label>
                      <h3 className="profile-detail-css">{email}</h3>
                    </div>
                    <div className="flex-col profile-view-show-box profile-view-show-box-media">
                      <label
                        for="last_name"
                        className="title-css"
                        style={{ marginRight: "2%" }}
                      >
                        نام کاربری
                      </label>
                      <h3 className="profile-detail-css">{username}</h3>
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: "10%" }}>
                  <div className="flex-col profile-view-show-box profile-view-show-box-media bio-media">
                    <label
                      for="bio"
                      className="title-css"
                      style={{ marginRight: "2%" }}
                    >
                      درباره
                    </label>
                    <h3
                      className="profile-detail-css"
                      style={{
                        wordBreak: "break-word",
                        fontSize: "15px",
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
