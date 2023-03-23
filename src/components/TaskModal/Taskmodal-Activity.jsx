import * as React from "react";
import "../../styles/TaskModal.css";
import { useState } from "react";
import StyledTextField from "../Shared/StyledTextField";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { convertNumberToPersian } from "../../utilities/helpers";
import { toast } from "react-toastify";
import CommentIcon from "@mui/icons-material/Comment";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../utilities/constants";
import { Link } from "react-router-dom";

export default function TaskModal_Activity({
  params,
  user,
  done,
  setDone,
  ListOfComments,
  setListOfComments,
  estimate,
  setEstimate,
}) {
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  const [taskdoner, setTaskDoner] = useState("");
  const [EditCommentList, setEditCommentList] = useState(
    Array(1000).fill(false)
  );
  const [changePlus, setChangePlus] = useState(false);
  const [Comment, setComment] = useState("");
  const [editcomment, setEditComment] = useState(false);
  const [editcommentText, setEditCommentText] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [listOfCheckboxes, setListOfCheckboxes] = useState([]);

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
              src={
                initials.profile_pic.toString().includes("http")
                  ? initials.profile_pic
                  : baseUrl + initials.profile_pic
              }
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

  function handleRemoveOfComment(id) {
    apiInstance
      .delete(`/workspaces/comment/${id}/delete-comment/`)
      .then((response) => {
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
        setListOfComments((prevState) => {
          return prevState.map((item) => {
            if (item.id === index) {
              item.text = comment;
            }
            return item;
          });
        });
        toast.success("نظر شما با موفقیت ویرایش شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((error) => {
        toast.error("مشکلی پیش آمده است. دوباره تلاش کنید.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
  }

  const handleCommentSubmit = (event, user_id) => {
    setIsPost(true);
    event.preventDefault();
    const formData = new FormData();
    setComment(convertNumberToPersian(Comment));
    formData.append("text", Comment);
    apiInstance
      .post(`/workspaces/task/${params.task_id}/new-comment/`, formData)
      .then((response) => {
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
        toast.success("با موفقیت ثبت شد.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((error) => {
        toast.error("مشکلی پیش آمده است. دوباره تلاش کنید.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .finally(() => setIsPost(null));
    setComment("");
    setShowComment(false);
  };

  const plusforprojma = () => {
    setIsPost(true);
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
        toast.success("با موفقیت ثبت شد.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((err) => {
        toast.error("مشکلی پیش آمده است. دوباره تلاش کنید.", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .finally(() => setIsPost(null));
  };

  return (
    <div>
      <div className="taskmodal-body-activity">
        <div className="flex-row taskmodal-body-activity-header">
          <div className="flex-taskmodal taskmodal-body-activity-icon">
            <CommentIcon fontSize="large" sx={{ color: "white" }}></CommentIcon>
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
                    user?.user.first_name[0] + "‌" + user?.user.last_name[0]
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
                    setComment(convertNumberToPersian(e.target.value))
                  }
                  inputProps={{
                    style: {
                      padding: "1%",
                      fontFamily: "Vazir",
                      fontSize: "152%",
                    },
                  }}
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
                    src={
                      `${item.sender?.profile_pic}`.toString().includes("http")
                        ? `${item.sender?.profile_pic}`
                        : `${baseURL}${item.sender?.profile_pic}`
                    }
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
                    {item.sender?.first_name + " " + item.sender?.last_name}
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
                      inputProps={{
                        style: {
                          padding: "1%",
                          fontFamily: "Vazir",
                          fontSize: "152%",
                        },
                      }}
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
                    {item.sender?.username === user?.user.username ? (
                      <div className="taskmodal-comment-button">
                        <Button
                          onClick={() => handleRemoveOfComment(item.id)}
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
  );
}
