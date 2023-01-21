import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import Labels from "./Labels";
import Members from "./Members";
import DueTime from "./dueTime";
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
import { useParams } from "react-router";
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
import { Box } from "@mui/material";
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
import { Calendarr } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import { convertNumberToPersian } from "../../utilities/helpers";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function APIcall() {}

export default function TaskModal(props) {
  const params = { task_id: props.cardId, board_id: props.boardId };
  //console.log(params);
  const handleRemoveChecklist = (id) => {
    setAllChecklists((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
    apiInstance
      .delete(`/workspaces/task/delete-checklist/${id}/`)
      .then((response) => {
        //console.log(response);
      });
  };

  function handleRemoveOfComment(id) {
    apiInstance
      .delete(`/workspaces/comment/${id}/delete-comment/`)
      .then((response) => {
        //console.log(response);
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
        //console.log(response);
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
              {/* {initials.first_name[0] + "‌" + initials.last_name[0]} */}
            </div>
          )}
        </div>
      </Button>
    );
  };
  const InitialIcon = ({ initials }) => {
    return (
      <div
        className="flex-row"
        style={{
          backgroundColor: initials.color + "55",
          alignItems: "center",
          justifyContent: "start",
          width: 90,
          height: 30,
          borderRadius: 30,
        }}
      >
        <div
          style={{
            backgroundColor: initials.color,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            marginRight: "8%",
            width: 17,
            height: 17,
            marginLeft: 7,
          }}
        ></div>
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 13,
            width: "50",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            overflowX: "auto",
            paddingTop: 2,
            paddingRight: -10,
          }}
        >
          {initials.title}
        </div>
      </div>
    );
  };

  const [show, setShow] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [listOfCheckboxes, setListOfCheckboxes] = useState([]);
  const [ListOfComments, setListOfComments] = useState([]);
  const [showdescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [ListOfDoers, setListOfDoers] = useState([]);
  const [Comment, setComment] = useState("");
  const [editcomment, setEditComment] = useState(false);
  const [editcommentText, setEditCommentText] = useState("");
  const [user, setUser] = useState({});
  const [allChecklists, setAllChecklists] = useState([]);
  const [ListOfLabels, setListOfLabels] = useState([]);
  const [ListOfMembers, setListOfMembers] = React.useState([]);
  const [estimate, setEstimate] = useState("");
  const [tasklistName, setTasklistName] = useState("");
  const [done, setDone] = useState("");
  const [changePlus, setChangePlus] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [taskdoner, setTaskDoner] = useState("");
  const [allAttachments, setAllAttachments] = useState([]);
  const [EditCheckList, setEditCheckList] = useState(Array(1000).fill(false));
  const [EditCommentList, setEditCommentList] = useState(
    Array(1000).fill(false)
  );
  const [title, setTitle] = useState("");
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  // const params = useParams();
  const handleRemoveAttachment = (id) => {
    setAllAttachments((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
    apiInstance
      .delete(`/workspaces/attachment/${id}/delete-attachment-from-task/`)
      .then((res) => {
        //console.log(res);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setShowDescription(false);
    const formData = new FormData();
    formData.append("description", description);
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/update-task/`, formData)
      .then((res) => {
        //console.log(res);
      });
  };
  const handleEditChecklist = (id) => {
    setAllChecklists((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          item.text = checklistTitle;
        }
        return item;
      });
    });
    const formData = new FormData();
    formData.append("text", checklistTitle);
    apiInstance
      .patch(`/workspaces/task/update-checklist/${id}/`, formData)
      .then((res) => {
        //console.log(res);
      });
  };

  const plusforprojma = () => {
    //console.log("plusforprojma");
    const formdata = new FormData();
    formdata.append("estimate", estimate);
    formdata.append("spend", done);
    if (estimate == "") {
      formdata.append("estimate", 0);
    }
    if (done == "") {
      formdata.append("spend", 0);
    }
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/update-task/`, formdata)
      .then((res) => {
        //console.log("navid");
        // //console.log(res);
      });
  };

  const AddCheckList = () => {
    //console.log("navid");
    const formData = new FormData();
    formData.append("text", checklistTitle);
    apiInstance
      .post(`/workspaces/task/${params.task_id}/create-checklist/`, formData)
      .then((res) => {
        //console.log(res);
        setAllChecklists((prevState) => [...prevState, res.data]);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const handleCommentSubmit = (event, user_id) => {
    event.preventDefault();
    const formData = new FormData();
    setComment(convertNumberToPersian(Comment));
    formData.append("text", Comment);
    apiInstance
      .post(`/workspaces/task/${params.task_id}/new-comment/`, formData)
      .then((response) => {
        //console.log(response.data);
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
        //console.log(error);
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
        //console.log(res);
      });
  };
  const handleCheckboxIsDone = (id) => {
    setAllChecklists((prevState) =>
      prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            is_done: !item.is_done,
          };
        }
        return item;
      })
    );
    const formData = new FormData();
    allChecklists.map((item) => {
      if (item.id === id) {
        if (item.is_done === false) {
          formData.append("is_done", true);
        } else {
          formData.append("is_done", false);
        }
        return formData;
      }
    });
    apiInstance
      .patch(`/workspaces/task/update-checklist/${id}/`, formData)
      .then((res) => {
        //console.log(res);
      });
  };
  useEffect(() => {
    apiInstance
      .get(`/workspaces/board/${params.board_id}/members/`)
      .then((res) => {
        // //console.log(res);
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic,
        }));
        setListOfMembers(members);
      });
    apiInstance
      .get(`/workspaces/task/${params.task_id}/get-all-checklists/`)
      .then((res) => {
        //console.log(res);
        setAllChecklists(res.data);
      });
    apiInstance.get(`/accounts/profile/myprofile/`).then((res) => {
      setUser(res.data);
      //console.log(user);
    });
    apiInstance
      .get(`/workspaces/task/${params.task_id}/get-task/`)
      .then((res) => {
        //console.log(res);
        setDueDate(res.data.end_date);
        setEstimate(res.data.estimate);
        setTasklistName(res.data.tasklist_name);
        setDone(res.data.spend);
        setDescription(res.data.description);
        setTitle(res.data.title);
        const attachments = res.data.attachments.map((obj) => ({
          id: obj.id,
          file: obj.file,
          created_at: obj.created_at,
        }));
        setAllAttachments(attachments);
        const labels = res.data.labels.map((item) => ({
          id: item.id,
          title: item.title,
          color: item.color,
        }));
        setListOfLabels(labels);
        const doer = res.data.doers.map((item) => ({
          // id: item.id,
          email: item.email,
          username: item.username,
          first_name: item.first_name,
          last_name: item.last_name,
          profile_pic: item.profile_pic,
        }));
        console.log("HHHHHHHHHHHHHHHHHHH");
        console.log(doer);
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
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div
            className="taskmodal-page"
            style={{ width: "50vw", marginTop: 0 }}
          >
            <div className="taskmodal-container" style={{ width: "100%" }}>
              <div className="taskmodal-header flex-row flex-column-gap-2">
                <div className="flex-taskmodal" style={{ marginTop: "3px" }}>
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
                    در لیست {tasklistName}
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
                        className="flex-gap"
                        style={{
                          width: "100%",
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
                      <div className="taskmodel-body-members-title">برچسب</div>
                      <div
                        className="flex-gap"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexGrow: 1,
                          gap: "3%",
                        }}
                      >
                        {ListOfLabels.map((label) => (
                          <InitialIcon initials={label}></InitialIcon>
                        ))}
                      </div>
                    </div>
                    <div className="taskmodal-body-duetime">
                      <div
                        className="flex-taskmodal taskmodel-body-members-title"
                        style={{ marginBottom: "0px" }}
                      >
                        تاریخ اتمام
                      </div>
                      <div
                        className="flex-taskmodal"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            width: "47%",
                            height: "37px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {dueDate != null ? (
                            <div className="duetime-showDate">
                              {dueDate.toString().replaceAll("-", "/")}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex-row taskmodal-body-larger-description"
                    style={{ gap: "3%" }}
                  >
                    <div className="flex-taskmodal">
                      <DehazeIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      ></DehazeIcon>
                    </div>
                    <div className="flex-column" style={{ width: "90%" }}>
                      <div
                        className="neonText taskmodal-description-title"
                        style={{ marginBottom: "2%" }}
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
                              onChange={(e) =>
                                setDescription(
                                  convertNumberToPersian(e.target.value)
                                )
                              }
                              value={description}
                              multiline
                              sx={{ fontFamily: "Vazir", color: "white" }}
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
                          <div style={{ marginBottom: "2px" }}>
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
                                <Typography
                                  className="taskmodal-comment-showList-comment"
                                  style={{
                                    height: "70px",
                                    // width: "100%",
                                    padding: "5%",
                                    borderRadius: "10px",
                                    marginRight: "0px",
                                    color: "white",
                                    overflow: "auto",
                                  }}
                                  multiline
                                  rows={2}
                                  // defalutValue={description}
                                >
                                  {description}
                                </Typography>
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
                    <div className="flex-taskmodal taskmodal-body-checklist-icon">
                      <ContentPasteIcon
                        fontSize="large"
                        sx={{ color: "white" }}
                      ></ContentPasteIcon>
                    </div>
                    <div
                      className="taskmodal-body-checklist-body"
                      style={{ width: "90%" }}
                    >
                      <div className="flex-taskmodal taskmodal-body-checklist-title">
                        <div className="neonText taskmodal-description-title">
                          لیست کنترل
                        </div>
                        <div className="taskmodal-body-checklist-title-icons"></div>
                      </div>

                      {allChecklists.map((item) => (
                        <div>
                          {EditCheckList[item.id] ? (
                            <div
                              className="flex-row"
                              style={{
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <StyledTextField
                                fullWidth
                                autoFocus
                                onChange={(e) =>
                                  setChecklistTitle(e.target.value)
                                }
                                value={checklistTitle}
                              ></StyledTextField>
                              <div dir="ltr" style={{ marginTop: "3%" }}>
                                <Button
                                  onClick={() => {
                                    {
                                      setEditCheckList((oldState) => {
                                        const newState = [...oldState];
                                        newState[item.id] = false;
                                        return newState;
                                      });
                                      handleEditChecklist(item.id);
                                    }
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
                                  onClick={() => {
                                    //console.log("navid");
                                    //console.log(item.id);
                                    setEditCheckList((oldState) => {
                                      const newState = [...oldState];
                                      newState[item.id] = false;
                                      return newState;
                                    });
                                  }}
                                  style={{
                                    fontFamily: "Vazir",
                                  }}
                                >
                                  لغو
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div
                              className="flex-row"
                              style={{
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Checkbox
                                onClick={() => {
                                  handleCheckboxIsDone(item.id);
                                  //console.log(allChecklists);
                                  // //console.log(i);
                                }}
                                sx={{
                                  color: "white",
                                  "& .MuiSvgIcon-root": { fontSize: 18 },
                                }}
                                checked={item.is_done}
                              />
                              {item.is_done ? (
                                <Button
                                  className="taskmodal-checklist-showList Vazir"
                                  style={{
                                    textDecoration: "line-through",
                                    fontSize: "12px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    //console.log(item.id);
                                    setEditCheckList((oldState) => {
                                      const newState = [...oldState];
                                      newState[item.id] = true;
                                      return newState;
                                    });
                                    setChecklistTitle(item.text);
                                  }}
                                >
                                  {item.text}
                                </Button>
                              ) : (
                                <Button
                                  className="taskmodal-checklist-showList Vazir"
                                  style={{
                                    fontSize: "12px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    color: "white",
                                  }}
                                  onClick={() => {
                                    //console.log(item.id);
                                    setEditCheckList((oldState) => {
                                      const newState = [...oldState];
                                      newState[item.id] = true;
                                      return newState;
                                    });
                                    setChecklistTitle(item.text);
                                  }}
                                >
                                  {item.text}
                                </Button>
                              )}
                              <div className="flex-row">
                                <Button
                                  onClick={() => handleRemoveChecklist(item.id)}
                                  sx={{
                                    fontFamily: "Vazir",
                                    fontSize: "10px",
                                    paddingLeft: "0px",
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    color: "white",
                                  }}
                                >
                                  حذف
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      <Box
                        component="form"
                        onSubmit={AddCheckList}
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
                          <div></div>
                        )}
                      </Box>
                    </div>
                  </div>

                  <div className="taskmodal-body-attachment">
                    <div className="flex-row taskmodal-body-attachment-header">
                      <div className="flex-taskmodal taskmodal-body-attachment-icon">
                        <AttachFileIcon
                          fontSize="large"
                          sx={{ color: "white" }}
                        ></AttachFileIcon>
                      </div>
                      <div className="flex neonText taskmodal-description-title">
                        پیوست
                      </div>
                    </div>
                    <div>
                      <div className="taskmodal-body-attachment-list">
                        {allAttachments.map((item, i) => (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              // component={Link}
                              href={`${item.file}`}
                              className="taskmodal-attachment-link-btn"
                            >
                              <div className="flex-taskmodal taskmodal-body-attachment-list-item-icon">
                                <AttachFileIcon
                                  sx={{ color: "white", fontSize: "46px" }}
                                ></AttachFileIcon>
                              </div>
                              <div className="flex-row taskmodal-body-attachment-list-item">
                                <div className="flex-taskmodal taskmodal-body-attachment-list-item-title">
                                  {item.file.toString().split("/")[5]}
                                </div>
                                <div className="flex-row">
                                  <div className="flex-taskmodal taskmodal-body-attachment-list-item-createdTime">
                                    <div style={{ width: "72px" }}>
                                      {item.created_at}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Button>
                            <Button
                              onClick={() => handleRemoveAttachment(item.id)}
                              sx={{
                                fontFamily: "Vazir",
                                fontSize: "10px",
                                display: "flex",
                                paddingTop: "0px",
                                marginLeft: "2%",
                                justifyContent: "center",
                                color: "white",
                              }}
                            >
                              حذف
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="taskmodal-body-activity">
                    <div className="flex-row taskmodal-body-activity-header">
                      <div className="flex-taskmodal taskmodal-body-activity-icon">
                        <CommentIcon
                          fontSize="large"
                          sx={{ color: "white" }}
                        ></CommentIcon>
                      </div>
                      <div className="flex neonText taskmodal-description-title">
                        فعالیت
                      </div>
                    </div>
                    <div className="taskmodal-plusforprojma">
                      <Box
                        onSubmit={plusforprojma}
                        component="form"
                        className="flex-taskmodal form-plusforprojma"
                      >
                        <StyledTextField
                          size="small"
                          variant="outlined"
                          sx={{
                            width: "20%",
                            color: "white",
                            paddingLeft: "0px",
                            paddingRight: "0px",
                          }}
                          label="تخمین"
                          name="estimate"
                          id="estimate"
                          value={estimate}
                          onChange={(e) => {
                            setEstimate(convertNumberToPersian(e.target.value));
                            setChangePlus(true);
                          }}
                          InputLabelProps={{
                            style: { fontFamily: "Vazir", fontSize: "11px" },
                          }}
                          InputProps={{
                            style: { fontFamily: "Vazir", fontSize: "11px" },
                          }}
                          autoFocus
                        />
                        <StyledTextField
                          size="small"
                          variant="outlined"
                          sx={{
                            width: "20%",
                            color: "white",
                            paddingLeft: "0px",
                            paddingRight: "0px",
                            marginLeft: "3%",
                          }}
                          label="عملی"
                          name="done"
                          id="done"
                          value={done}
                          onChange={(e) => {
                            setDone(convertNumberToPersian(e.target.value));
                            setChangePlus(true);
                          }}
                          InputLabelProps={{
                            style: { fontFamily: "Vazir", fontSize: "11px" },
                          }}
                          InputProps={{
                            style: { fontFamily: "Vazir", fontSize: "11px" },
                          }}
                          autoFocus
                        />
                        {changePlus ? (
                          <Button
                            style={{
                              marginRight: "13%",
                              borderRadius: "6px",
                              borderColor: "white",
                              display: "flex",
                              alignItems: "center",
                              color: "white",
                              fontFamily: "Vazir",
                              fontSize: "10px",
                              height: "30%",
                            }}
                            // type="submit"
                            onClick={plusforprojma}
                            variant="contained"
                          >
                            ثبت
                          </Button>
                        ) : (
                          <div></div>
                        )}
                      </Box>
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
                              onChange={(e) =>
                                setComment(
                                  convertNumberToPersian(e.target.value)
                                )
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
                            {EditCommentList[item.id] ? (
                              <div>
                                <StyledTextField
                                  fullWidth
                                  autoFocus
                                  onChange={(e) => {
                                    setEditCommentText(
                                      convertNumberToPersian(e.target.value)
                                    );
                                  }}
                                  value={editcommentText}
                                  // defaultValue={item.text}
                                ></StyledTextField>
                                <div dir="ltr" style={{ marginTop: "3%" }}>
                                  <Button
                                    onClick={() => {
                                      setEditCommentList((oldState) => {
                                        const newState = [...oldState];
                                        newState[item.id] = false;
                                        return newState;
                                      });
                                      handleEditComment(
                                        item.id,
                                        convertNumberToPersian(editcommentText)
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
                                    onClick={() => {
                                      setEditCommentList((oldState) => {
                                        const newState = [...oldState];
                                        newState[item.id] = false;
                                        return newState;
                                      });
                                    }}
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
                                {item.sender?.username ===
                                user?.user.username ? (
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
                                        setEditCommentList((oldState) => {
                                          const newState = [...oldState];
                                          newState[item.id] = true;
                                          return newState;
                                        });
                                        setEditCommentText(
                                          convertNumberToPersian(item.text)
                                        );
                                      }}
                                    >
                                      ویرایش
                                    </Button>
                                  </div>
                                ) : (
                                  <div></div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-column taskmodal-body-smaller">
                  <Members
                    params={params}
                    setDoers={setListOfDoers}
                    doer={ListOfDoers}
                  />
                  <Labels
                    params={params}
                    task_labels={ListOfLabels}
                    set_task_labels={setListOfLabels}
                  />
                  <CheckList
                    params={params}
                    setAllChecklists={setAllChecklists}
                  />
                  <Attachments
                    params={params}
                    setAllAttachments={setAllAttachments}
                  />
                  <DueTime
                    params={params}
                    dueDate={dueDate}
                    setDueTime={setDueDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
