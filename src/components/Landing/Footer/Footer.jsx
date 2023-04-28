import React from "react";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import "./Footer.css";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid"; // Grid version 1

const Footer = () => {
  return (
    <div style={{
      position: "relative",
      bottom: "0",
    }}>
      <Grid
        container
        // spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 8 }}
        sx={{
          backgroundColor: "#91B9E3",
          // display: "flex",
          // justifyContent: "center",
          // alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={{
              backgroundColor: "#91B9E3",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              gap: "5%",
              flexBasis: "58%",
              fontSize: "1.5rem",
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                backgroundcolor: "rgb(255, 153, 0)",
                // color: "rgb(255, 153, 0)",
              }}
            >
              <h3 className="margin--5 responsive--font--size--1 black--text">
                اجتماعی
              </h3>
              <h4 className="margin--5 responsive--font--size--1 black--text">تلگرام</h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">
                اینستاگرام
              </h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">توییتر</h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">لینکدین</h4>
            </Box>
            <Box
              sx={{
                display: "grid",
                // justifyItems: "start",
                gridTemplateColumns: "1fr",
                // backgroundColor: "rgb(240, 64, 149)",
              }}
            >
              <h3 className="margin--5 responsive--font--size--1 black--text">
                تماس با ما
              </h3>
              <h4 className="margin--5 responsive--font--size--1 black--text">تلفن</h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">آدرس</h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">ایمیل</h4>
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                // backgroundColor: "rgb(0, 210, 210)",
              }}
            >
              <h3 className="margin--5 responsive--font--size--1 black--text">درباره ما</h3>
              <h4 className="margin--5 responsive--font--size--1 black--text">خدمات</h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">پشتیبانی</h4>
              <h4 className="margin--5 responsive--font--size--1 black--text">
                قیمت گذاری
              </h4>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            sx={{
              // width: "35%",
              flexBasis: "42%",
              flexGrow: 1,
              padding: "5%",
              // marginLeft: "5%",
              fontSize: "1.5rem",
            }}
          >
            <h3 style={{
              color: "black",
              }}>
              با پروجما می‌توانید در یک محیط امن و آنلاین پروژه های مختلف خود را
              به صورت تیمی و پویا مدیریت کنید. همکاری تیمی بیشتر و ارتباطات موثر
              با استفاده از پروژما امکان‌پذیر می‌شود.
            </h3>
          </Box>
        </Grid>
      </Grid>
      <Divider />
      <Box
        sx={{
          color: "#E2EDF8",
          backgroundColor: "#173A5E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          // marginBottom: "2%",
        }}
      >
        <p className="margin--top--bottom">All Rights Reserved © Projma.ir</p>
      </Box>
    </div>
  );
};

export default Footer;
