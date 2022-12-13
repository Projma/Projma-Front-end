import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import Labels from "./Labels";
import Members from "./Members";
import Attachments from "./Attachments";
import CheckList from "./Checklist";
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
import {Box} from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormControl } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DehazeIcon from "@mui/icons-material/Dehaze";
import LabelIcon from "@mui/icons-material/Label";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Checkbox from "@mui/material/Checkbox";
import { useEffect } from "react";
import { baseUrl } from "../../utilities/constants";
import { Link } from "react-router-dom";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export default function TaskModal() {
  // const params = useParams();
  const cars = ["ن‌ا", "وم", "س‌ع"];
  function handleRemove(index) {
    setListOfCheckboxes(
      listOfCheckboxes.filter((item, i) => {
        return i !== index;
      })
    );
  }
  function handleRemoveOfComment(id) {
    apiInstance
      .delete(`/workspaces/comment/${id}/delete-comment/`)
      .then((response) => {
        console.log(response);
        setListOfComments((prevState) => {
          return prevState.filter((item) => item.id !== id);
        });
      });
  }
  function handleEditComment(index, comment) {
    const formData = new FormData();
    formData.append("text", comment);
    apiInstance
      .patch(`/workspaces/comment/${index}/eddit-comment/`, formData)
      .then((response) => {
        console.log(response);
        setListOfComments((prevState) => {
          return prevState.map((item) => {
            if (item.id === index) {
              item.text = comment;
            }
            return item;
          });
        });
      });
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
      <Button
        component={Link}
        to={`/profileview/${initials.username}`}
        sx={{ borderRadius: "50%" }}
        style={{
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
          padding: "0px",
          marginLeft: "3px",
        }}
      >
        <div
          style={{
            backgroundColor: randColor(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            width: 30,
            height: 30,
          }}
        >
          {initials.profile_pic != null ? (
            <img
              src={initials.profile_pic}
              alt={initials.first_name}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Vazir",
                color: "white",
                fontSize: "12px",
              }}
            >
              {initials.first_name[0] + "‌" + initials.last_name[0]}
            </div>
          )}
        </div>
      </Button>
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
  const [ListOfDoers, setListOfDoers] = useState([]);
  const [Comment, setComment] = useState("");
  const [editcomment, setEditComment] = useState(false);
  const [editcommentText, setEditCommentText] = useState("");
  const [user, setUser] = useState({});
  const [title, setTitle] = useState("");
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  const params = useParams();
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDescription(false);
    const formData = new FormData();
    formData.append("description", description);
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/update-task/`, formData)
      .then((res) => {
        console.log(res);
      });
  };
  const sendData = (event) => {
    event.preventDefault();
    setListOfCheckboxes((prevState) => [...prevState, checklistTitle]);
    setListOfCheckboxesStatus((prevState) => [...prevState, false]);
    setChecklistTitle("");
    setShowChecklist(false);
    console.log(show);
  };
  const handleCommentSubmit = (event, user_id) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("text", Comment);
    apiInstance
      .post(`/workspaces/task/${params.task_id}/new-comment/`, formData)
      .then((response) => {
        console.log(response.data);
        setListOfComments((prevState) => [
          ...prevState,
          {
            text: Comment,
            created: response.data.created_at,
            id: response.data.id,
            updated: response.data.updated_at,
            task: response.data.task,
            reply: response.data.reply_to,
            sender: {
              id: user.user.id,
              username: user.user.username,
              first_name: user.user.first_name,
              last_name: user.user.last_name,
              profile_pic: user.profile_pic,
            },
          },
        ]);
      })
      .catch((error) => {
        console.log(error);
      });
    setComment("");
    setShowComment(false);
  };
  const handleDeleteDescription = () => {
    setDescription("");
    setShowDescription(false);
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/update-task/`, {
        description: "",
      })
      .then((res) => {
        console.log(res);
      });
  };
  useEffect(() => {
    apiInstance.get(`/accounts/profile/myprofile/`).then((res) => {
      setUser(res.data);
      console.log(user);
    });
    apiInstance
      .get(`/workspaces/task/${params.task_id}/get-task/`)
      .then((res) => {
        console.log(res);
        setDescription(res.data.description);
        setTitle(res.data.title);
        const doer = res.data.doers.map((item) => ({
          email: item.email,
          username: item.username,
          first_name: item.first_name,
          last_name: item.last_name,
          profile_pic: item.profile_pic,
        }));
        setListOfDoers(doer);
        const comments = res.data.comments.map((obj) => ({
          text: obj.text,
          created: obj.created_at,
          sender: obj.sender,
          updated: obj.updated_at,
          task: obj.task,
          reply: obj.reply_to,
          id: obj.id,
        }));
        setListOfComments(comments);
      });
  }, []);

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => console.log(ListOfDoers)}
      ></Button>
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
                  <div className="neonText taskmodal-title">{title}</div>
                  <div className="neonText taskmodal-subtitle">
                    زیر موضوع این کارت
                  </div>
                </div>
              </div>
              <div
                className="taskmodal-larger_smaller"
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
                        {ListOfDoers.map((doer) => (
                          <InitialIconcircle
                            initials={doer}
                          ></InitialIconcircle>
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
                              multiline
                              rows={2}
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
                                    onClick={handleDeleteDescription}
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
                        <div className="flex taskmodal-body-activity-body-icon">
                          {user.profile_pic !== null ? (
                            <img
                              src={`${baseURL}${user.profile_pic}`}
                              alt="profile"
                              style={{
                                borderRadius: 30,
                                width: 30,
                                height: 30,
                              }}
                            />
                          ) : (
                            <InitialIconcircle
                              initials={
                                user?.user.first_name[0] +
                                "‌" +
                                user?.user.last_name[0]
                              }
                            ></InitialIconcircle>
                          )}
                        </div>
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
                            {item.sender?.profile_pic !== null ? (
                              <img
                                src={`${item.sender?.profile_pic}`}
                                alt="profile"
                                style={{
                                  borderRadius: 30,
                                  width: 30,
                                  height: 30,
                                }}
                              />
                            ) : (
                              <InitialIconcircle
                                initials={
                                  item.sender?.first_name[0] +
                                  "‌" +
                                  item.sender?.last_name[0]
                                }
                              ></InitialIconcircle>
                            )}
                          </div>
                          <div className="taskmodal-comment-showList">
                            <div className="flex-row taskmodal-comment-showList-auther">
                              <div className="taskmodal-comment-showList-auther-name">
                                {item.sender?.first_name +
                                  " " +
                                  item.sender?.last_name}
                              </div>
                              <div className="taskmodal-comment-showList-auther-time">
                                {item.updated}
                              </div>
                            </div>
                            {editcomment ? (
                              <div>
                                <StyledTextField
                                  fullWidth
                                  autoFocus
                                  onChange={(e) => {
                                    setEditCommentText(e.target.value);
                                  }}
                                  value={editcommentText}
                                  // defaultValue={item.text}
                                ></StyledTextField>
                                <div dir="ltr" style={{ marginTop: "3%" }}>
                                  <Button
                                    onClick={() => {
                                      setEditComment(false);
                                      handleEditComment(
                                        item.id,
                                        editcommentText
                                      );
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
                                  {item.text}
                                </div>
                                <div className="taskmodal-comment-button">
                                  <Button
                                    onClick={() =>
                                      handleRemoveOfComment(item.id)
                                    }
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
                                      setEditCommentText(item.text);
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
                  <Members params={params} />
                  <Labels params={params} />
                  <CheckList params={params} />
                  <Attachments params={params} />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
