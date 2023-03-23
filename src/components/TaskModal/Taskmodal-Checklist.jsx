import * as React from "react";
import "../../styles/TaskModal.css";
import { useState } from "react";
import StyledTextField from "../Shared/StyledTextField";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import { Box } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Checkbox from "@mui/material/Checkbox";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Taskmodal_CheckList({
  params,
  allChecklists,
  setAllChecklists,
}) {
  const [isPost, setIsPost] = useState(false);
  const [checklistTitle, setChecklistTitle] = useState("");
  const [showChecklist, setShowChecklist] = useState(false);
  const [EditCheckList, setEditCheckList] = useState(Array(1000).fill(false));

  const AddCheckList = () => {
    setIsPost(true);
    const formData = new FormData();
    formData.append("text", checklistTitle);
    apiInstance
      .post(`/workspaces/task/${params.task_id}/create-checklist/`, formData)
      .then((res) => {
        setAllChecklists((prevState) => [...prevState, res.data]);
        toast.success("با موفقیت ویرایش شد.", {
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

  const handleCheckboxIsDone = (id) => {
    setIsPost(true);
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
      .then((res) => {})
      .finally(() => setIsPost(null));
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
    setIsPost(true);
    const formData = new FormData();
    formData.append("text", checklistTitle);
    apiInstance
      .patch(`/workspaces/task/update-checklist/${id}/`, formData)
      .then((res) => {
        toast.success("با موفقیت ویرایش شد.", {
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

  const handleRemoveChecklist = (id) => {
    setAllChecklists((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
    apiInstance
      .delete(`/workspaces/task/delete-checklist/${id}/`)
      .then((response) => {});
  };
  return (
    <div>
      <div className="flex-row taskmodal-body-checklist">
        <div className="flex-taskmodal taskmodal-body-checklist-icon">
          <ContentPasteIcon
            fontSize="large"
            sx={{ color: "white" }}
          ></ContentPasteIcon>
        </div>
        <div className="taskmodal-body-checklist-body" style={{ width: "90%" }}>
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
                    onChange={(e) => setChecklistTitle(e.target.value)}
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
                  onChange={(e) => setChecklistTitle(e.target.value)}
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
    </div>
  );
}
