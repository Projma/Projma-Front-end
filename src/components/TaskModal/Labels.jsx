import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../../utilities/axiosConfig";
import Popover from "@mui/material/Popover";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField.js";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./Labels.scss";

export default function Labels({ params, task_labels, set_task_labels }) {
  const [current, setCurrent] = useState("");
  const [createdTitle, setCreatedTitle] = useState("your title");
  const [createdColor, setCreatedColor] = useState("#ffffff");
  const [showEdit, setShowEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedColor, setEditedColor] = useState("");
  const [editItem, setEditItem] = useState({});
  // const [taskLabels, setTaskLabels] = React.useState([]);
  const [boardLabels, setBoardLabels] = React.useState([]);
  useEffect(() => {
    apiInstance
      .get(`workspaces/board/${params.board_id}/get-board-labels/`)
      .then((res) => {
        console.log("board labels");
        console.log(res.data);
        const board_labels = res.data.map((obj) => ({
          id: obj.id,
          title: obj.title,
          color: obj.color,
        }));
        console.log(board_labels);
        setBoardLabels(board_labels);
      });
    // setCurrent(mainPage);
    // setTaskLabels(task_labels);
  }, []);

  React.useEffect(() => {
    setCurrent(EditPage);
  }, [editItem, editedTitle, editedColor]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    // setTaskLabels(task_labels);
    setCurrent(mainPage);
    console.log("task labels");
    console.log(task_labels);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setCurrent(mainPage);
    console.log("task labels");
    console.log(task_labels);
    setAnchorEl(null);
  };

  const delete_label_from_task = (inputElem, label_id) => {
    apiInstance
      .patch(`workspaces/task/${params.task_id}/delete-labels-from-task/`, {
        labels: [label_id],
      })
      .then((res) => {
        console.log("in delete label");
        console.log(res.data);
        set_task_labels((prevState) =>
          prevState.filter((label) => label.id !== label_id)
        );
        // setBoardLabels((prevState) => [...prevState, res.data])
      });
    console.log("task labels");
    console.log(task_labels);
    // setTaskLabels((prevState) =>
    //   prevState.filter((label) => label.id !== label_id)
    // );
    // console.log(taskLabels);
  };
  const add_label_to_task = (inputElem, label_id) => {
    console.log("add label to task");
    apiInstance
      .patch(`workspaces/task/${params.task_id}/add-labels-to-task/`, {
        labels: [label_id],
      })
      .then((res) => {
        console.log("in add label");
        console.log(res.data);
        // set_task_labels((prevState) => [
        //   ...prevState,
        //   res.data[res.data.length - 1],
        // ]);
        // setBoardLabels((prevState) =>
        //   prevState.filter((label) => label.id !== label_id)
        // );
        // setTaskLabels((prevState) => [...prevState, res.data]);
      });
    console.log("task labels");
    console.log(task_labels);
    // boardLabels.forEach((label) => {
    //   if (label.id === label_id) {
    //     console.log(label.id);
    //     setTaskLabels((prevState) => [...prevState, label]);
    //   }
    // });
    console.log("board labels");
    console.log(boardLabels);
    console.log("task labels");
    // console.log(taskLabels);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEditPage = (list, id) => {
    list.forEach((item) => {
      if (item.id === id) {
        setEditItem(item);
        setEditedTitle((prevTitle) => {
          return item.title;
        });
        setEditedColor((prevColor) => {
          return item.color;
        });
      }
    });
    // setCurrent(EditPage);
  };
  const handleCreatePage = () => {
    setCreatedTitle("your title");
    setCreatedColor("#ffffff");
    setCurrent(CreatePage);
  };
  const editThisItem = (e) => {
    // e.preventDefault();
    console.log("edit this item");
    console.log(editItem);
    apiInstance
      .patch(`workspaces/label/${editItem.id}/update-label/`, {
        title: editedTitle,
        color: editedColor,
      })
      .then((res) => {
        console.log("in edit label");
        console.log(res.data);
        let flag = 0;
        set_task_labels((prevState) =>
          prevState.map((label) => {
            if (label.id === res.data.id) {
              console.log("FLAG");
              flag = 1;
              return {
                id: res.data.id,
                title: res.data.title,
                color: res.data.color,
              };
            } else {
              return label;
            }
          })
        );
        if (flag === 1) {
          console.log("FLAG 2");
          setBoardLabels((prevState) =>
            prevState.filter((label) => label.id !== res.data.id)
          );
          return;
        }
        setBoardLabels((prevState) =>
          prevState.map((label) => {
            if (label.id === editItem.id) {
              console.log("FLAG 3");
              console.log(res.data);
              return {
                id: res.data.id,
                title: res.data.title,
                color: res.data.color,
              };
            } else {
              return label;
            }
          })
        );
      });
    // setShowEdit(false);
  };
  const createThisItem = (e) => {
    // e.preventDefault();
    const form_data = new FormData();
    form_data.append("title", createdTitle);
    form_data.append("color", createdColor);
    console.log("create this item");
    console.log(createdTitle);
    console.log(createdColor);

    apiInstance
      .post(`workspaces/board/${params.board_id}/create-label/`, form_data)
      .then((res) => {
        console.log(res.data);
        setBoardLabels((prevState) => [...prevState, res.data]);
      });
    // setShowEdit(false);
  };
  const test = () => {
    console.log("test labels");
    console.log(task_labels);
    console.log(boardLabels);
  };

  const mainPage = (
    <>
      <header className="tm_labels-header">
        <h2 className="tm_labels-header-title">برچسب‌ها</h2>
        <Divider sx={{ backgroundColor: "black" }} />
      </header>
      <div className="tm_labels-div-inner">
        <ul className="tm_labels-ul">
          {task_labels.map((taskLabel, idx) => (
            <li className="tm_labels-li">
              <div className="tm_labels-li-div flex">
                <input
                  type="checkbox"
                  className="tm_labels-li-div-input"
                  defaultChecked={true}
                  onChange={(e) => {
                    delete_label_from_task(this, taskLabel.id);
                  }}
                />
                <span className="tm_labels-li-div-span flex">
                  <div
                    className="tm_labels-li-color-box"
                    style={{ backgroundColor: taskLabel.color + "55" }}
                  >
                    <div
                      className="tm_labels-labels-symbol"
                      style={{ backgroundColor: taskLabel.color }}
                    ></div>
                    <p className="tm_labels-labels-title">{taskLabel.title}</p>
                  </div>
                  <EditIcon
                    className="tm_labels-labels-edit-icon"
                    onClick={() => handleEditPage(task_labels, taskLabel.id)}
                  />
                </span>
              </div>
            </li>
          ))}
          {boardLabels.map((boardLabel, idx) => {
            if (
              task_labels.filter(
                (taskLabel) => taskLabel?.id === boardLabel?.id
              ).length === 0
            ) {
              return (
                <li className="tm_labels-li">
                  <div className="tm_labels-li-div flex">
                    <input
                      type="checkbox"
                      className="tm_labels-li-div-input"
                      onChange={(e) => {
                        add_label_to_task(this, boardLabel.id);
                      }}
                    />
                    <span className="tm_labels-li-div-span flex">
                      <div
                        className="tm_labels-li-color-box"
                        style={{ backgroundColor: boardLabel?.color + "55" }}
                      >
                        <div
                          className="tm_labels-labels-symbol"
                          style={{ backgroundColor: boardLabel.color }}
                        ></div>
                        <p className="tm_labels-labels-title">
                          {boardLabel.title}
                        </p>
                      </div>
                      <EditIcon
                        className="tm_labels-labels-edit-icon"
                        onClick={() =>
                          handleEditPage(boardLabels, boardLabel.id)
                        }
                      />
                    </span>
                  </div>
                </li>
              );
            }

            return null;
          })}
        </ul>
        <button
          className="tm_labels-add-label-button"
          onClick={handleCreatePage}
        >
          <AddIcon />
        </button>
      </div>
    </>
  );
  const EditPage = (
    <>
      <header className="tm_edit-labels-header">
        <h2 className="tm_edit-labels-header-title">ویرایش برچسب</h2>
        <Divider sx={{ backgroundColor: "black", marginTop: "5%" }} />
      </header>
      <div className="tm_edit-labels-main-div">
        <div
          style={{
            backgroundColor: editedColor,
            width: "12rem",
            height: "3rem",
            borderRadius: "5px",
            margin: 0 + " auto",
            marginBottom: "2rem",
          }}
        ></div>
        <PerTextField>
          <label
            style={{
              fontFamily: "Vazir",
              color: "#000",
              fontSize: "1.5rem",
              display: "block",
              marginBottom: "2%",
            }}
          >
            عنوان برچسب
          </label>
          <StyledTextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              backgroundColor: "#265D97",
              marginRight: "3rem",
              display: "inline-block",
            }}
          />
        </PerTextField>
        <label
          style={{
            fontFamily: "Vazir",
            color: "#000",
            fontSize: "1.5rem",
            display: "block",
            marginTop: "5%",
          }}
        >
          رنگ برچسب
        </label>
        <input
          type="color"
          id={editItem.id}
          value={editedColor}
          onChange={(e) => setEditedColor(e.target.value)}
        />
      </div>
      <button onClick={(e) => editThisItem(e)}>ویرایش</button>
    </>
  );
  const CreatePage = (
    <>
      <div className="tm_create-labels-main-div">
        <div
          style={{
            backgroundColor: createdColor,
            width: "12rem",
            height: "3rem",
            borderRadius: "5px",
            margin: 0 + " auto",
            marginBottom: "2rem",
          }}
        ></div>
        <PerTextField>
          <label
            style={{
              fontFamily: "Vazir",
              color: "#000",
              fontSize: "1.5rem",
              display: "block",
              marginBottom: "2%",
            }}
          >
            عنوان برچسب
          </label>
          <StyledTextField
            value={createdTitle}
            onChange={(e) => setCreatedTitle(e.target.value)}
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              backgroundColor: "#265D97",
              marginRight: "3rem",
              display: "inline-block",
            }}
          />
        </PerTextField>
        <label
          style={{
            fontFamily: "Vazir",
            color: "#000",
            fontSize: "1.5rem",
            display: "block",
            marginTop: "5%",
          }}
        >
          رنگ برچسب
        </label>
        <input
          type="color"
          // id={editItem.id}
          value={createdColor}
          onChange={(e) => setCreatedColor(e.target.value)}
        />
        <button onClick={(e) => editThisItem(e)}>ویرایش</button>
      </div>
    </>
  );

  // if (!showEdit && !showCreate) {
  //   current = mainPage;
  // } else if (showCreate) {
  //   current = CreatePage;
  // } else {
  //   current = EditPage;
  // }
  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
        }}
      >
        <LabelIcon rotate="90" fontSize="large"></LabelIcon>{" "}
        <div className="taskmodal-smaller-button">لیبل</div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="tm_labels-main-div">{current}</div>
        <button onClick={test}>test button</button>
      </Popover>
    </div>
  );
}
// {!showEdit ? mainPage : EditPage}
