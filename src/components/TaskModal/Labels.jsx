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

const task_labels = [
  { id: 4, title: "new_new", color: "#FFEAC7", board: 2 },
  { id: 5, title: "very_new", color: "#DC15FF", board: 2 },
];

export default function Labels({ params }) {
  const [current, setCurrent] = useState("");
  const [createdColor, setCreatedColor] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedColor, setEditedColor] = useState("");
  const [editItem, setEditItem] = useState({});
  const [taskLabels, setTaskLabels] = React.useState([]);
  const [boardLabels, setBoardLabels] = React.useState([]);
  useEffect(() => {
    // apiInstance
    //   .get(`workspaces/board/${params.task_id}/get_task_labels/`)
    //   .then((res) => {
    //     console.log("task labels");
    //     console.log(res.data);
    //     setTaskLabels(res.data);
    //   });
    setTaskLabels(task_labels);
    apiInstance
      .get(`workspaces/board/${params.board_id}/get_board_labels/`)
      .then((res) => {
        console.log("board labels");
        console.log(res.data);
        setBoardLabels(res.data);
      });
    // setCurrent(mainPage);
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setCurrent(mainPage);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setCurrent(mainPage);
    setAnchorEl(null);
  };

  const delete_label_from_task = (inputElem, label_id) => {
    console.log("delete label from task");
    console.log(label_id);
    // const form_data = new FormData();
    // const labels = [];
    // labels.push(label_id);
    // form_data.append("labels", labels);
    // apiInstance
    //   .delete(
    //     `workspaces/task/${params.task_id}/delete_labels_from_task/`,
    //     form_data
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     setTaskLabels((prevState) =>
    //       prevState.filter((label) => label.id !== label_id)
    //     );
    //   });
    setTaskLabels((prevState) =>
      prevState.filter((label) => label.id !== label_id)
    );
    console.log(taskLabels);
  };
  const add_label_to_task = (inputElem, label_id) => {
    console.log("add label to task");
    const form_data = new FormData();
    const labels = [];
    labels.push(label_id);
    form_data.append("labels", labels);
    // apiInstance
    //   .patch(`workspaces/task/${params.task_id}/add_labels_to_task/`, form_data)
    //   .then((res) => {
    //     console.log("in add label");
    //     console.log(res.data);
    //     setTaskLabels((prevState) => [...prevState, res.data]);
    //   });
    boardLabels.forEach((label) => {
      if (label.id === label_id) {
        console.log(label.id);
        setTaskLabels((prevState) => [...prevState, label]);
      }
    });
    console.log("board labels");
    console.log(boardLabels);
    console.log("task labels");
    console.log(taskLabels);
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
    setCurrent(EditPage);
  };
  const handleCreatePage = () => {
    setCurrent(CreatePage);
  };
  const editThisItem = (e) => {
    e.preventDefault();
    console.log("edit this item");
    console.log(editedTitle);
    console.log(editedColor);
    const form_data = new FormData();
    form_data.append("title", editedTitle);
    form_data.append("color", editedColor);
    apiInstance
      .patch(`workspaces/label/${editItem.id}/update_label/`, form_data)
      .then((res) => {
        console.log(res.data);
        setBoardLabels((prevState) =>
          prevState.map((label) => {
            if (label.id === editItem.id) {
              console.log("FLAG");
              console.log(res.data);
              return res.data;
            } else {
              return label;
            }
          })
        );
        setTaskLabels((prevState) =>
          prevState.map((label) => {
            if (label.id === editItem.id) {
              console.log("FLAG");
              return res.data;
            } else {
              return label;
            }
          })
        );
      });
    setShowEdit(false);
  };
  const test = () => {
    console.log("test");
    console.log(taskLabels);
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
          {taskLabels.map((taskLabel, idx) => (
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
                    onClick={() => handleEditPage(taskLabels, taskLabel.id)}
                  />
                </span>
              </div>
            </li>
          ))}
          {boardLabels.map((boardLabel, idx) => {
            if (
              taskLabels.filter((taskLabel) => taskLabel.id === boardLabel.id)
                .length === 0
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
                        style={{ backgroundColor: boardLabel.color + "55" }}
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
  const CreatePage = <>salam.</>;

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
