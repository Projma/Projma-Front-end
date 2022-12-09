import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/Profile.css";
import profile_preview from "../../static/images/profile/profile-preview.png";
import { useState } from "react";
import StyledTextField from "./StyledTextField";
import { CacheProvider } from "@emotion/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
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
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [errorFirstName, setErrorFirstName] = React.useState(false);
  const [errorLastName, setErrorLastName] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [file, setFile] = useState(profile_preview);
  const [changeImage, setChangeImage] = useState(false);
  const [binaryFile, setBinaryFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bio, setBio] = React.useState("");
  const [name, setName] = useState("");

  React.useEffect(() => {
    apiInstance.get("/accounts/profile/myprofile/").then((res) => {
      setFirstName(res.data.user.first_name);
      setLastName(res.data.user.last_name);
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setBio(res.data.bio);
      setChangeImage(res.data.user.image);
      setLoading(false);
    });
  }, []);
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]));
    setChangeImage(true);

    let picture = e.target.files[0];
    console.log("picture", picture);
    setBinaryFile(picture);
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
    if (firstName === "") {
      setErrorFirstName(true);
      errormessage += "*فیلد نام نمیتواد خالی باشد.";
      sign += 1;
    }
    if (lastName === "") {
      errormessage += "*فیلد نام خانوادگی نمیتواد خالی باشد.<br>";
      setErrorLastName(true);
      sign += 1;
    }
    if (sign !== 0) {
      document.getElementById("em").innerHTML = errormessage;
      return;
    }
    const profile_without_name_form_data = new FormData();
    const profile_with_name_form_data = new FormData();
    profile_with_name_form_data.append("first_name", firstName);
    profile_with_name_form_data.append("last_name", lastName);
    apiInstance
      .patch("/accounts/users/myaccount/", profile_with_name_form_data)
      .then((res) => {
        console.log(res);
      });

    const birthd = "";
    profile_without_name_form_data.append("bio", bio);
    profile_without_name_form_data.append("birth_date", "2022-04-04");
    // profile_without_name_form_data.append("profile_pic", binaryFile);
    // birthd += `${birthDate.getFullYear()}-${birthDate.getMonth()}-${birthDate.getDay()}`;
    apiInstance
      .patch("/accounts/profile/myprofile/", profile_without_name_form_data)
      .then((res) => {
        console.log(res);
      });
  };
  const [message, setMessage] = useState("");

  if (!loading) {
    return (
      <div>
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <div className="profile-container profile-page">
              <div className="profile-information row-gap-8 profile-information-media">
                <div className="profile-box-body-profile-container">
                  <img src={profile_preview} />
                </div>
                <div className="flex-col row-gap-8 align-center">
                  <h3
                    style={{
                      fontWeight: "400",
                      fontSize: "90%",
                      color: "white",
                    }}
                    className="neonText vazir"
                  >
                    {firstName} {lastName}
                  </h3>
                  <h4
                    style={{
                      fontWeight: "400",
                      fontSize: "90%",
                      color: "white",
                    }}
                    className="neonText"
                  >
                    {`${username}@`}
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
                          className="neonText text-information-media vazir"
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
                            className="neonText text-information-media vazir"
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
                  <h3
                    style={{ color: "white", marginBottom: "8%" }}
                    className="neonText vazir"
                  >
                    اطلاعات فردی
                  </h3>
                </div>
                <Box
                  className="profile-box-body"
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
                        className="Avatar"
                        src={binaryFile}
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
                          <p
                            style={{
                              fontSize: "0.8rem",
                              fontFamily: "Vazir",
                            }}
                          >
                            انتخاب عکس
                          </p>
                          {/* <p>aafaf</p> */}
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleChange(e)}
                            accept=".jpg,.jpeg,.png"
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    <div
                      className="flex-col col-gap-16"
                      style={{ width: "100%", marginTop: "10%" }}
                    >
                      <StyledTextField
                        className="StyledTextField-media otherStyledTextField-media otherStyledTextField"
                        margin="normal"
                        id="firstName"
                        fullWidth
                        value={firstName}
                        label="نام"
                        name="firstName"
                        InputLabelProps={{
                          style: input_text,
                        }}
                        InputProps={{ style: { fontFamily: "Vazir" } }}
                        onChange={(e) => setFirstName(e.target.value)}
                        autoComplete="firstname"
                        error={errorFirstName}
                        autoFocus
                      />
                      <StyledTextField
                        className="StyledTextField-media otherStyledTextField-media otherStyledTextField"
                        margin="normal"
                        id="lastname"
                        fullWidth
                        value={lastName}
                        label="نام خانوادگی"
                        name="lastname"
                        InputLabelProps={{
                          style: input_text,
                        }}
                        InputProps={{ style: { fontFamily: "Vazir" } }}
                        onChange={(e) => setLastName(e.target.value)}
                        autoComplete="lastname"
                        error={errorLastName}
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="flex-col" style={{ width: "100%" }}>
                    <div className="flex-col show-box show-box-media, row-gap-8">
                      <label for="email" className="title-css">
                        ایمیل
                      </label>
                      <h3 className="email-text-box email-font-size">
                        {email}
                      </h3>
                    </div>
                    <div
                      className="flex-col show-box show-box-media row-gap-8"
                      style={{ marginTop: "2%" }}
                    >
                      <label for="username" className="title-css">
                        نام کاربری
                      </label>
                      <h3 className="email-text-box">{username}</h3>
                    </div>
                  </div>
                  <div className="birthday-border-media">
                    <div className="birthday-media flex">
                      <label
                        style={{
                          marginLeft: "2%",
                          color: "#fff",
                          fontSize: "14px",
                          fontFamily: "Vazir",
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
                      // backgroundColor="#000"
                    />
                  </div>
                  <div className="StyledTextField-media">
                    <StyledTextField
                      className="StyledTextField-media otherStyledTextField"
                      margin="normal"
                      id="bio"
                      label="درباره"
                      fullWidth
                      name="bio"
                      multiline
                      onChange={(e) => setBio(e.target.value)}
                      value={bio}
                      rows={2}
                      InputProps={{ style: { fontFamily: "Vazir" } }}
                      InputLabelProps={{
                        style: input_text,
                      }}
                      autoComplete="bio"
                      autoFocus
                    />
                  </div>
                  <Typography
                    id="em"
                    sx={{
                      mt: 1,
                      textAlign: "right",
                      color: "rgba(255, 0, 0, 0.837)",
                      fontWeight: "bold",
                      fontFamily: "Vazir",
                      marginTop: "5%",
                    }}
                  ></Typography>
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
                </Box>
              </div>
            </div>
          </ThemeProvider>
        </CacheProvider>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
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
