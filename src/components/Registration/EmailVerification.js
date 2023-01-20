import { useParams } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../../styles/Registration.css";
import axios from "axios";
import { useState } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { Helmet } from "react-helmet";

export default function Email_verification() {
  const baseLink = window.location.href;

  const getLinkInfo = (baseLink) => {
    return baseLink.split("email-verification?")[1];
  };
  // //console.log(getLinkInfo(baseLink));
  // React.useEffect(() => {
  //   // ?user_id=8&confirmation_token=bfif3c-384b7a6cff61d1f98dc95f9a5f0516c1
  //   //console.log(temp.id);
  // }, []);
  const url = "/accounts/users/active/?" + getLinkInfo(baseLink);
  //console.log(url);
  axios
    .get(`http://mohammadosoolian.pythonanywhere.com${url}`);
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
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bgcolor: "white",
          paddingBottom: 10,
          backgroundImage:
            "linear-gradient(to right bottom, #001E3C 0%, #0059B2 130%)",
          borderRadius: 3,
        }}
        style={{ backgroundColor: "white" }}
      >
        <div
          dir="rtl"
          style={{
            fontFamily: "Nazanin",
            fontWeight: "bold",
            paddingTop: 45,
            color: "white",
            fontSize: 19,
          }}
        >
          <p>
            <span style={{ fontFamily: "vazir", fontWeight: "bold" }}>
              کاربر گرامی{" "}
            </span>
            {/* <span>{Email_verification_2().userId}</span> */}
          </p>
          <br />
          <p style={{ fontFamily: "vazir", fontWeight: "bold" }}>
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
