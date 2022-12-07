import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import Labels from "./Labels";
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
import LabelIcon from "@mui/icons-material/Label";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Checkbox from "@mui/material/Checkbox";

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
  function handleRemoveOfComment(index) {
    setListOfComments(
      ListOfComments.filter((item, i) => {
        return i !== index;
      })
    );
  }

  function handleEditCommentSubmit(index, comment) {
    console.log("comment", comment, "index", index);
    setListOfComments(
      ListOfComments.map((item, i) => {
        if (i === index) {
          ListOfComments[i] = comment;
          return ListOfComments[i];
        }
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
    const color = randColor();
    return (
      <div
        className="flex-row"
        style={{
          backgroundColor: color + "55",
          alignItems: "center",
          justifyContent: "center",
          width: 70,
          height: 25,
          borderRadius: 30,
        }}
      >
        <div
          style={{
            backgroundColor: color,
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
  const [listOfCheckboxesStatus, setListOfCheckboxesStatus] = useState([]);
  const [ListOfComments, setListOfComments] = useState([]);
  const [showdescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [Comment, setComment] = useState("");
  const [editcomment, setEditComment] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDescription(false);
  };
  const sendData = (event) => {
    event.preventDefault();
    setListOfCheckboxes((prevState) => [...prevState, checklistTitle]);
    setListOfCheckboxesStatus((prevState) => [...prevState, false]);
    setChecklistTitle("");
    setShowChecklist(false);
    console.log(show);
  };
  const handleCommentSubmit = (event) => {
    event.preventDefault();
    setListOfComments((prevState) => [...prevState, Comment]);
    console.log(Comment);
    setComment("");
    console.log(ListOfComments);

    setShowComment(false);
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
                              value={description}
                            ></StyledTextField>
                            <div dir="ltr" style={{ marginTop: "3%" }}>
                              <Button
                                type="submit"
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
                          <div>
                            {description == "" ? (
                              <Button
                                className="taskmodal-closeButton"
                                onClick={() => setShowDescription(true)}
                                sx={{
                                  fontFamily: "Vazir",
                                  color: "white",
                                  fontSize: "100%",
                                  bgcolor: "#1d4b7a",
                                }}
                              >
                                اضافه کردن جزئیات بیشتر
                              </Button>
                            ) : (
                              <div>
                                <div
                                  className="taskmodal-comment-showList-comment"
                                  style={{
                                    height: "70px",
                                    width: "100%",
                                    padding: "5%",
                                    borderRadius: "10px",
                                    marginRight: "0px",
                                  }}
                                >
                                  {description}
                                </div>
                                <div className="taskmodal-comment-button">
                                  <Button
                                    onClick={() => {
                                      setDescription("");
                                      setShowDescription(false);
                                    }}
                                    sx={{
                                      fontFamily: "Vazir",
                                      color: "white",
                                      fontSize: "10px",
                                      paddingRight: "0px",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    حذف
                                  </Button>
                                  <Button
                                    sx={{
                                      fontFamily: "Vazir",
                                      color: "white",
                                      fontSize: "10px",
                                      paddingLeft: "0px",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() => {
                                      setShowDescription(true);
                                    }}
                                  >
                                    ویرایش
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </Box>
                    </div>
                  </div>
                  <div className="flex-row taskmodal-body-checklist">
                    <div className="flex taskmodal-body-checklist-icon">
                      <ContentPasteIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      ></ContentPasteIcon>
                    </div>
                    <div
                      className="taskmodal-body-checklist-body"
                      style={{ width: "90%" }}
                    >
                      <div className="flex taskmodal-body-checklist-title">
                        <div className="neonText taskmodal-description-title">
                          لیست کنترل
                        </div>
                        <div className="taskmodal-body-checklist-title-icons"></div>
                      </div>

                      {listOfCheckboxes.map((item, index) => (
                        <div
                          className="flex-row"
                          style={{
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Checkbox
                            onClick={() => {
                              listOfCheckboxesStatus[index] =
                                !listOfCheckboxesStatus[index];
                              // console.log(listOfCheckboxesStatus[index]);
                              // console.log(index);
                            }}
                            sx={{
                              color: "white",
                              "& .MuiSvgIcon-root": { fontSize: 18 },
                            }}
                          />
                          {listOfCheckboxesStatus[index] ? (
                            <div
                              className="taskmodal-checklist-showList"
                              style={{ textDecoration: "underline" }}
                            >
                              {item}
                            </div>
                          ) : (
                            <div className="taskmodal-checklist-showList">
                              {item}
                            </div>
                          )}
                          <div>
                            <Button
                              onClick={() => handleRemove(index)}
                              sx={{ fontFamily: "Vazir", fontSize: "10px" }}
                            >
                              حذف
                            </Button>
                          </div>
                        </div>
                      ))}
                      <Box
                        component="form"
                        onSubmit={sendData}
                        className="taskmodal-body-larger-description-textbox"
                      >
                        {showChecklist ? (
                          <div>
                            <StyledTextField
                              sx={{ width: "100%" }}
                              onChange={(e) =>
                                setChecklistTitle(e.target.value)
                              }
                            ></StyledTextField>
                            <div dir="ltr" style={{ marginTop: "3%" }}>
                              <Button
                                type="submit"
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
                          </div>
                        ) : (
                          <Button
                            className="taskmodal-closeButton"
                            onClick={() => setShowChecklist(true)}
                            sx={{
                              fontFamily: "Vazir",
                              color: "white",
                              fontSize: "100%",
                              bgcolor: "#1d4b7a",
                            }}
                          >
                            اضافه کردن آیتم جدید
                          </Button>
                        )}
                      </Box>
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
                        onSubmit={handleCommentSubmit}
                        className="flex-column taskmodal-body-activity-box"
                      >
                        {showComment ? (
                          <div>
                            <StyledTextField
                              fullWidth
                              autoFocus
                              onChange={(e) => setComment(e.target.value)}
                            ></StyledTextField>
                            <div dir="ltr" style={{ marginTop: "3%" }}>
                              <Button
                                type="submit"
                                variant="contained"
                                className="taskmodal-button-setting"
                                style={{ fontFamily: "Vazir" }}
                              >
                                ذخیره
                              </Button>
                              <Button
                                variant="outlined"
                                className="taskmodal-button-setting"
                                onClick={() => setShowComment(false)}
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
                            onClick={() => setShowComment(true)}
                            sx={{
                              fontFamily: "Vazir",
                              color: "white",
                              fontSize: "100%",
                              bgcolor: "#1d4b7a",
                            }}
                          >
                            نوشتن کامنت
                          </Button>
                        )}
                      </Box>
                    </div>
                    <div className="taskmodal-body-listofcomments">
                      {ListOfComments.map((item, index) => (
                        <div
                          className="flex-row taskmodal-listofcomments-item"
                          style={{ justifyContent: "space-between" }}
                        >
                          <div className="flex taskmodal-body-activity-body-icon">
                            <InitialIconcircle
                              initials={"ن‌ا"}
                            ></InitialIconcircle>
                          </div>
                          <div className="taskmodal-comment-showList">
                            <div className="taskmodal-comment-showList-auther">
                              نوید
                            </div>
                            {editcomment ? (
                              <div>
                                <StyledTextField
                                  fullWidth
                                  autoFocus
                                  onChange={(e) => {
                                    setComment(e.target.value);
                                    console.log("navid");
                                  }}
                                  value={Comment}
                                ></StyledTextField>
                                <div dir="ltr" style={{ marginTop: "3%" }}>
                                  <Button
                                    onClick={() => {
                                      ListOfComments[index] = Comment;
                                      setEditComment(false);
                                      setComment("");
                                    }}
                                    variant="contained"
                                    className="taskmodal-button-setting"
                                    style={{ fontFamily: "Vazir" }}
                                  >
                                    ذخیره
                                  </Button>
                                  <Button
                                    variant="outlined"
                                    className="taskmodal-button-setting"
                                    onClick={() => setEditComment(false)}
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
                              <div>
                                <div className="taskmodal-comment-showList-comment">
                                  {item}
                                </div>
                                <div className="taskmodal-comment-button">
                                  <Button
                                    onClick={() => handleRemoveOfComment(index)}
                                    sx={{
                                      fontFamily: "Vazir",
                                      color: "white",
                                      fontSize: "10px",
                                      paddingRight: "0px",
                                      textDecoration: "underline",
                                    }}
                                  >
                                    حذف
                                  </Button>
                                  <Button
                                    sx={{
                                      fontFamily: "Vazir",
                                      color: "white",
                                      fontSize: "10px",
                                      paddingLeft: "0px",
                                      textDecoration: "underline",
                                    }}
                                    onClick={() => {
                                      setEditComment(true);
                                      setComment(ListOfComments[index]);
                                    }}
                                  >
                                    ویرایش
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-column taskmodal-body-smaller">
                  <Button
                    className="taskmodal-smaller-button-inner"
                    sx={{ bgcolor: "#173b5e" }}
                  >
                    <PersonIcon fontSize="large"></PersonIcon>{" "}
                    <div className="taskmodal-smaller-button">اعضا</div>
                  </Button>
                  {/* <Button
                    className="taskmodal-smaller-button-inner"
                    sx={{
                      bgcolor: "#173b5e",
                      marginTop: "5%",
                    }}
                  >
                    <LabelIcon rotate="90" fontSize="large"></LabelIcon>{" "}
                    <div className="taskmodal-smaller-button">لیبل</div>
                  </Button> */}
                  <Labels />
                  <Button
                    className="taskmodal-smaller-button-inner"
                    sx={{
                      bgcolor: "#173b5e",
                      marginTop: "5%",
                    }}
                  >
                    <ContentPasteIcon fontSize="large"></ContentPasteIcon>{" "}
                    <div className="taskmodal-smaller-button">لیست کنترل</div>
                  </Button>
                  <Button
                    className="taskmodal-smaller-button-inner"
                    sx={{
                      bgcolor: "#173b5e",
                      marginTop: "5%",
                    }}
                  >
                    <AttachFileIcon fontSize="large"></AttachFileIcon>{" "}
                    <div className="taskmodal-smaller-button">پیوست</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
