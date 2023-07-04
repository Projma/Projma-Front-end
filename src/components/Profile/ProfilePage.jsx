import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/Profile.scss";
import profile_preview from "../../static/images/profile/blank.png";
import { useState } from "react";
import StyledTextField from "./StyledTextField";
import { CacheProvider } from "@emotion/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
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
// import Header from "../Header/Header";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers";

const theme = createTheme({
  direction: "rtl",
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
export default function Profile() {
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [errorFirstName, setErrorFirstName] = React.useState(false);
  const [errorLastName, setErrorLastName] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [file, setFile] = useState(profile_preview);
  const [getImage, setGetImage] = useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = React.useState("");
  const [isPost, setIsPost] = useState(false);
  const [changeImage, setChangeImage] = React.useState(false);

  React.useEffect(() => {
    apiInstance.get("accounts/profile/myprofile/").then((res) => {
      // ////console.log(res);
      setFirstName(res.data.user.first_name);
      setLastName(res.data.user.last_name);
      setUsername(res.data.user.username);
      setBirthDate(res.data.birth_date);
      setEmail(res.data.user.email);
      setGetImage(res.data.profile_pic);
      setLoading(false);
      if (res.data.bio != "null") {
        setBio(res.data.bio);
      }
    });
  }, []);
  const handleDeleteProfileImage = (res) => {
    setBinaryFile(null);
    const profile_without_name_form_data = new FormData();
    profile_without_name_form_data.append("profile_pic", binaryFile);
    apiInstance
      .patch(
        "accounts/profile/delete-myprofile-pic/",
        profile_without_name_form_data
      )
      .then((res) => {
        setGetImage(null);
        toast.success("با موفقیت بروز شد.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((err) => {
        toast.error("مشکلی پیش آمده است.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
  };
  const [birthDate, setBirthDate] = useState(new Date());
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  let errormessage = "";
  const handleSubmit = (event) => {
    let sign = 0;
    setErrorFirstName(false);
    setErrorLastName(false);
    event.preventDefault();
    errormessage = "";
    document.getElementById("em").innerHTML = errormessage;
    const formData = new FormData();
    console.log(firstName);
    const user = JSON.stringify({
      first_name: firstName,
      last_name: lastName,
    });

    let birthd = "";
    if (birthDate !== "") {
      birthd = birthDate;
    }
    if (typeof birthDate !== "string" && birthDate !== null) {
      birthd = `${birthDate.year}-${birthDate.month.number}-${birthDate.day}`;
    }
    if (binaryFile !== null) {
      formData.append("profile_pic", binaryFile);
    }
    if (birthDate == null) {
      birthd = null;
    }

    const data = {
      user: {
        first_name: firstName,
        last_name: lastName,
      },
      birth_date: birthd,
      bio: bio,
    };
    setIsPost(true);
    apiInstance
      .patch("/accounts/profile/edit-myprofile/", data)
      .then((res) => {
        console.log(res);
        toast.success("با موفقیت بروز شد.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((err) => {
        toast.error("مشکلی پیش آمده است.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
    apiInstance
      .patch("/accounts/profile/edit-myprofile/", formData)
      .then((res) => {})
      .catch((err) => {
        toast.error("مشکلی پیش آمده است.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  return (
    <div className="profile-total-page">
      {isPost ? <Loading /> : null}
      {/* <Header></Header> */}
      <CacheProvider value={cacheRtl}>
        <Helmet>
          <title>حساب کاربری</title>
        </Helmet>
        <ThemeProvider theme={theme}>
          <div className="profile--container profile--page">
            <div className="profile--information-pro row-gap-8">
              <div className="profile--box-body-profile-container">
                <Avatar
                  className="Avatar profile--pictureView"
                  src={getImage !== null ? `${baseURL}${getImage}` : file}
                  alt="profile"
                />
              </div>
              <div
                className="flex-col align-center"
                style={{
                  width: "100%",
                  marginTop: "20%",
                  justifyContent: "flex-start",
                }}
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
              <div style={{ marginTop: "20%", width: "100%" }}>
                <button className="btn">
                  <a href="/profile">
                    <div
                      className="flex-row-information"
                      style={{ alignItems: "center" }}
                    >
                      <PersonIcon className="profile--rightMenu-icon"></PersonIcon>
                      <h4 className="neonText profile--leftMenu-text">
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
                        <PasswordIcon className="profile--rightMenu-icon"></PasswordIcon>
                        <h4 className="neonText profile--leftMenu-text">
                          تغییر رمز عبور
                        </h4>
                      </div>
                    </a>
                  </button>
                </div>
              </div>
            </div>
            <div className="profile--box">
              <div className="profile--box-header flex justify-between">
                <h3 style={{ marginBottom: "8%" }} className="neonText">
                  اطلاعات فردی
                </h3>
              </div>
              <Box
                className="profile--box-body"
                component="form"
                onSubmit={handleSubmit}
              >
                <div
                  className="flex margin-top col-gap-8"
                  style={{ justifyContent: "center", marginBottom: "1%" }}
                >
                  <div
                    className="avatar-container"
                    style={{ marginTop: "-50px" }}
                  >
                    <Avatar
                      className="Avatar profile--pictureView"
                      src={
                        getImage !== null && !changeImage
                          ? `${baseURL}${getImage}`
                          : file
                      }
                      alt="profile"
                    />
                    <div className="button-container">
                      <Button
                        variant="contained"
                        component="label"
                        color="info"
                      >
                        <p
                          style={{
                            fontSize: "0.8rem",
                            fontFamily: "Vazir",
                          }}
                        >
                          انتخاب عکس
                        </p>
                        <input
                          type="file"
                          hidden
                          onChange={(e) => {
                            setBinaryFile(e.target.files[0]);
                            setChangeImage(true);
                            const [filee] = e.target.files;
                            setFile(URL.createObjectURL(filee));
                          }}
                          accept=".jpg,.jpeg,.png"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                {getImage !== null ? (
                  <div className="profile-delete-image">
                    <Button
                      style={{ fontFamily: "Vazir" }}
                      variant="contained"
                      onClick={handleDeleteProfileImage}
                    >
                      {" "}
                      حذف{" "}
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}

                <div className="flex">
                  <div
                    className="flex-col col-gap-16"
                    style={{ width: "100%", marginTop: "10%" }}
                  >
                    <StyledTextField
                      className="otherStyledTextField"
                      margin="normal"
                      id="firstName"
                      fullWidth
                      value={convertNumberToPersian(firstName)}
                      label="نام"
                      name="firstName"
                      InputLabelProps={{
                        className: "profile--styleTextField-labelText",
                      }}
                      InputProps={{ style: { fontFamily: "Vazir" } }}
                      onChange={(e) =>
                        setFirstName(convertNumberToEnglish(e.target.value))
                      }
                      autoComplete="firstname"
                      error={errorFirstName}
                      autoFocus
                    />
                    <StyledTextField
                      className="otherStyledTextField"
                      margin="normal"
                      id="lastname"
                      fullWidth
                      value={convertNumberToPersian(lastName)}
                      label="نام خانوادگی"
                      name="lastname"
                      InputLabelProps={{
                        className: "profile--styleTextField-labelText",
                      }}
                      InputProps={{ style: { fontFamily: "Vazir" } }}
                      onChange={(e) =>
                        setLastName(convertNumberToEnglish(e.target.value))
                      }
                      autoComplete="lastname"
                      error={errorLastName}
                      autoFocus
                    />
                  </div>
                </div>
                <div className="flex-col" style={{ width: "100%" }}>
                  <div className="flex-col show-box show-box-media, row-gap-8">
                    <label htmlFor="email" className="title-css">
                      ایمیل
                    </label>
                    <h3 className="email-text-box email-font-size">
                      {convertNumberToPersian(email)}
                    </h3>
                  </div>
                  <div
                    className="flex-col show-box show-box-media row-gap-8"
                    style={{ marginTop: "2%" }}
                  >
                    <label htmlFor="username" className="title-css">
                      نام کاربری
                    </label>
                    <h3 className="email-text-box">
                      {convertNumberToPersian(username)}
                    </h3>
                  </div>
                </div>
                <div className="profile--birthday-border">
                  <div className="profile--birthday-media flex">
                    <label className="profile--birthday-label">
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
                    style={{ width: "100%" }}
                  />
                </div>
                <div>
                  <StyledTextField
                    className="otherStyledTextField"
                    margin="normal"
                    id="bio"
                    label="درباره"
                    fullWidth
                    name="bio"
                    multiline
                    onChange={(e) =>
                      setBio(convertNumberToPersian(e.target.value))
                    }
                    value={bio}
                    rows={2}
                    InputProps={{ style: { fontFamily: "Vazir" } }}
                    InputLabelProps={{
                      className: "profile--styleTextField-labelText",
                    }}
                    autoComplete="bio"
                    autoFocus
                  />
                </div>
                <Typography id="em" className="profile--errorText"></Typography>
                <div>
                  <Button
                    type="submit"
                    fullWidth
                    role="submit-btn"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className="profile--submitButton"
                  >
                    اعمال تغییرات
                  </Button>
                </div>
              </Box>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
