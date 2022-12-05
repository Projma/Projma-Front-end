import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import "../../styles/TaskModal.css";
import profile_preview from "../../static/images/profile/profile-preview.png";
import userEvent from "@testing-library/user-event";
import { fontWeight } from "@mui/system";
import { useState, useCallback } from "react";
import axios from "axios";
import StyledTextField from "../Shared/StyledTextField";
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
export default function TaskModal() {
  const cars = ["ن‌ا", "وم", "س‌ع"];

  // const userData = replaceUndefinied(useSelector(state => state.auth));
  const InitialIconcircle = ({ initials }) => {
    return (
      <div
        style={{
          backgroundColor: "red",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          width: 30,
          height: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 12,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {initials}
        </div>
      </div>
    );
  };
  const InitialIcon = ({ initials }) => {
    return (
      <div
        className="flex-row"
        style={{
          backgroundColor: "#D3F6E4",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          height: 30,
        }}
      >
        <div
          style={{
            backgroundColor: "#6DECA9",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            width: 20,
            height: 20,
            marginLeft: 7,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 15,
            width: "50",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          {initials}
        </div>
      </div>
    );
  };
  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="taskmodal-page">
            <div className="taskmodal-container">
              <div className="taskmodal-header flex-row flex-column-gap-2">
                <div className="flex" style={{ marginTop: "1px" }}>
                  <span>
                    <PersonIcon></PersonIcon>
                  </span>
                </div>
                <div
                  className="flex-column"
                  style={{ gap: "9%", width: "100%" }}
                >
                  <div className="taskmodal-title">موضوع این کارت</div>
                  <div className="taskmodal-subtitle">زیر موضوع این کارت</div>
                </div>
              </div>
              <div
                className="flex-row"
                style={{ height: "80%", marginRight: "2%" }}
              >
                <div className="taskmodal-body-larger">
                  <div className="flex-row taskmodal-body-options flex-gap">
                    <div className="taskmodal-body-members">
                      <div className="taskmodel-body-members-title">اعضا</div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexGrow: 1,
                          gap: "3%",
                        }}
                      >
                        {cars.map((car) => (
                          <InitialIconcircle initials={car}></InitialIconcircle>
                        ))}
                      </div>
                    </div>
                    <div className="taskmodal-body-labels">
                      <div className="taskmodal-body-members">
                        <div className="taskmodel-body-members-title">
                          برچسب
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                            gap: "3%",
                          }}
                        >
                          {cars.map((car) => (
                            <InitialIcon initials={car}></InitialIcon>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex-row taskmodal-body-larger-description"
                    style={{ gap: "3%" }}
                  >
                    <div className="flex">
                      <PasswordIcon></PasswordIcon>
                    </div>
                    <div className="flex-column">
                      <div>توضیحات</div>
                      <div className="taskmodal-body-larger-description-textbox">
                        <StyledTextField fullWidth></StyledTextField>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex taskmodal-body-smaller">hamid</div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
