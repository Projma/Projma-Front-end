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
import { FormControl } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DehazeIcon from "@mui/icons-material/Dehaze";

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
  function handleRemove(index) {
    setListOfCheckboxes(
      listOfCheckboxes.filter((item, i) => {
        return i !== index;
      })
    );
  }
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };
  // const userData = replaceUndefinied(useSelector(state => state.auth));
  const InitialIconcircle = ({ initials }) => {
    return (
      <div
        style={{
          backgroundColor: randColor(),
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

  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [listOfCheckboxes, setListOfCheckboxes] = useState([]);
  const [showdescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("hello");
  };
  const sendData = (event) => {
    event.preventDefault();
    setListOfCheckboxes((prevState) => [...prevState, checklistTitle]);
    setChecklistTitle("");
    setShow(false);
    console.log(show);
  };
  return (
    <div>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div className="taskmodal-page">
            <div className="taskmodal-container">
              <div className="taskmodal-header flex-row flex-column-gap-2">
                <div className="flex" style={{ marginTop: "3px" }}>
                  <PersonIcon
                    fontSize="large"
                    sx={{ color: "white" }}
                  ></PersonIcon>
                </div>
                <div
                  className="flex-column"
                  style={{ gap: "9%", width: "100%" }}
                >
                  <div className="neonText taskmodal-title">موضوع این کارت</div>
                  <div className="neonText taskmodal-subtitle">
                    زیر موضوع این کارت
                  </div>
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
                      <DehazeIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      ></DehazeIcon>
                    </div>
                    <div className="flex-column" style={{ width: "90%" }}>
                      <div
                        className="neonText taskmodal-description-title"
                        style={{ marginBottom: "-2%" }}
                      >
                        توضیحات
                      </div>
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="taskmodal-body-larger-description-textbox"
                      >
                        {showdescription ? (
                          <div>
                            <StyledTextField
                              fullWidth
                              autoFocus
                              onChange={(e) => setDescription(e.target.value)}
                            ></StyledTextField>
                            <div dir="ltr" style={{ marginTop: "3%" }}>
                              <Button
                                variant="contained"
                                className="taskmodal-button-setting"
                                style={{ fontFamily: "Vazir" }}
                              >
                                ذخیره
                              </Button>
                              <Button
                                variant="outlined"
                                className="taskmodal-button-setting"
                                onClick={() => setShowDescription(false)}
                                style={{
                                  fontFamily: "Vazir",
                                  marginLeft: "2%",
                                }}
                              >
                                لغو
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            className="taskmodal-closeButton"
                            onClick={() => setShowDescription(true)}
                            sx={{
                              fontFamily: "Vazir",
                              color: "white",
                              fontSize: "100%",
                              bgcolor: "#91B9E3",
                            }}
                          >
                            اضافه کردن جزئیات بیشتر
                          </Button>
                        )}
                      </Box>
                    </div>
                  </div>
                  <div className="flex-column taskmodal-body-checklist">
                    <div className="flex taskmodal-body-checklist-icon">
                      <ContentPasteIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      ></ContentPasteIcon>
                    </div>
                    <div className="flex-row taskmodal-body-checklist-header">
                      <div className="flex taskmodal-body-checklist-title">
                        <div className="neonText taskmodal-description-title">
                          لیست کنترل
                        </div>
                        <div className="taskmodal-body-checklist-title-icons">
                          <Button
                            sx={{
                              bgcolor: "grey",
                              color: "black",
                            }}
                          >
                            پنهان کردن آیتم‌های چک شده
                          </Button>
                          <Button
                            sx={{
                              bgcolor: "grey",
                              color: "black",
                              // marginRight: "2%",
                            }}
                          >
                            حذف
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="taskmodal-body-checklist-body">
                      {listOfCheckboxes.map((item, index) => (
                        <div
                          className="flex-row"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="taskmodal-checklist-showList">
                            {item}
                          </div>
                          <div>
                            <Button onClick={() => handleRemove(index)}>
                              حذف
                            </Button>
                          </div>
                        </div>
                      ))}
                      {showChecklist ? (
                        <Box
                          component="form"
                          style={{ width: "100%" }}
                          onSubmit={handleSubmit}
                          className="taskmodal-body-larger-description-textbox"
                        >
                          <StyledTextField
                            sx={{ width: "100%" }}
                            onChange={(e) => setChecklistTitle(e.target.value)}
                          ></StyledTextField>
                          <div dir="ltr" style={{ marginTop: "3%" }}>
                            <Button
                              variant="contained"
                              className="taskmodal-button-setting"
                              style={{ fontFamily: "Vazir" }}
                            >
                              ذخیره
                            </Button>
                            <Button
                              variant="outlined"
                              className="taskmodal-button-setting"
                              onClick={() => setShowChecklist(false)}
                              style={{
                                fontFamily: "Vazir",
                                marginLeft: "2%",
                              }}
                            >
                              لغو
                            </Button>
                          </div>
                        </Box>
                      ) : (
                        <Button
                          className="taskmodal-closeButton"
                          onClick={() => setShowChecklist(true)}
                          sx={{
                            fontFamily: "Vazir",
                            color: "white",
                            fontSize: "100%",
                            bgcolor: "#91B9E3",
                          }}
                        >
                          اضافه کردن آیتم جدید
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="taskmodal-body-activity">
                    <div className="flex-row taskmodal-body-activity-header">
                      <div className="flex taskmodal-body-activity-icon">
                        <CommentIcon
                          fontSize="large"
                          sx={{ color: "white" }}
                        ></CommentIcon>
                      </div>
                      <div className="flex neonText taskmodal-description-title">
                        فعالیت
                      </div>
                    </div>
                    <div className="flex-row taskmodal-body-activity-body">
                      <div className="flex taskmodal-body-activity-body-icon">
                        <InitialIconcircle initials={"ن‌ا"}></InitialIconcircle>
                      </div>
                      <Box
                        component="form"
                        onSubmit={handleSubmit}
                        className="flex-column taskmodal-body-activity-box"
                      >
                        {showComment ? (
                          <div>
                            <TextField className="flex"></TextField>
                            <div className="flex taskmodal-iconhide">
                              <Button type="submit" className="flex">
                                ارسال
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button onClick={() => setShowComment(true)}>
                            hamid
                          </Button>
                        )}
                      </Box>
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
