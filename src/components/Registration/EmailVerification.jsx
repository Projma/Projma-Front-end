import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import "../../styles/Registration.scss";
import apiInstance from "../../utilities/axiosConfig";
import { Helmet } from "react-helmet";

export default function Email_verification() {
  const baseLink = window.location.href;

  const getLinkInfo = (baseLink) => {
    return baseLink.split("email-verification?")[1];
  };
  const url = "/accounts/users/active/?" + getLinkInfo(baseLink);
  apiInstance.get(`${url}`);
  return (
    <Container
      component="main"
      style={{
        width: "50%",
        borderRadius: 3,
      }}
    >
      <Helmet>
        <title>تایید ایمیل</title>
      </Helmet>
      <CssBaseline />
      <Box className="EmailVerification--Box">
        <div dir="rtl" className="EmailVerification--text">
          <p>
            <span>کاربر گرامی </span>
          </p>
          <br />
          <p>
            <div style={{ marginBottom: "3%" }}>
              ثبت‌نام شما با موفقیت انجام شد.
            </div>
            امیدواریم تجربه خوبی را در سایت ما داشته باشید.
          </p>
        </div>
      </Box>
    </Container>
  );
}
