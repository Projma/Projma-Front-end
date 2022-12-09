import { useParams } from "react-router-dom";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import "../../styles/Registration.css";
import axios from "axios";
import { useState } from "react";
import apiInstance from "../../utilities/axiosConfig";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright ©"}
      <Link color="inherit" href="https://projma.com/">
        Projma
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Email_verification() {
  const baseLink = window.location.href;

  const getLinkInfo = (baseLink) => {
    return baseLink.split("email-verification?")[1];
  };
  // console.log(getLinkInfo(baseLink));
  // React.useEffect(() => {
  //   // ?user_id=8&confirmation_token=bfif3c-384b7a6cff61d1f98dc95f9a5f0516c1
  //   console.log(temp.id);
  // }, []);
  const url =
    "http://mohammadosoolian.pythonanywhere.com/accounts/email-verification/?" +
    getLinkInfo(baseLink);
  console.log(url);
  apiInstance.post(url, "Fuck").then((res) => console.log(res));
  const [loading, setLoading] = useState(true);
  if (!loading) {
    return (
      <Container
        component="main"
        style={{
          width: "50%",
          borderRadius: 3,
        }}
      >
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
              fontSize: 22,
            }}
          >
            <p>
              <span style={{ fontFamily: "Nazanin", fontWeight: "bold" }}>
                کاربر گرامی جناب{" "}
              </span>
              {/* <span>{Email_verification_2().userId}</span> */}
            </p>
            <p style={{ fontFamily: "Nazanin", fontWeight: "bold" }}>
              ثبت‌نام شما با موفقیت انجام شد.
              <br></br>
              امیدواریم تجربه خوبی را در سایت ما داشته باشید.
            </p>
          </div>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    );
  } else {
    return (
      <div>
        <h1>loading</h1>
      </div>
    );
  }
}
