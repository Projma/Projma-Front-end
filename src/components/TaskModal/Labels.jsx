import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditLabel from "./EditLabel";
import CreateLabel from "./CreateLabel";
import apiInstance from "../../utilities/axiosConfig";
import Popover from "@mui/material/Popover";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField.js";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/TaskModal.css";
import Loading from "../Shared/Loading";
import ShowListOfLabels from "./ShowListOfLabels";
import "./Labels.scss";
// // persian num
import { convertNumberToPersian } from "../../utilities/helpers.js";

export default function Labels({ params, task_labels, set_task_labels }) {
  const [current, setCurrent] = useState("");
  const [createdTitle, setCreatedTitle] = useState("");
  const [createdColor, setCreatedColor] = useState("#ffffff");
  const [showEdit, setShowEdit] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedColor, setEditedColor] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [boardLabels, setBoardLabels] = React.useState([]);
  const [allLabels, setAllLabels] = React.useState([]);
  useEffect(() => {
    apiInstance
      .get(`board/${params.board_id}/get-board-labels/`)
      .then((res) => {
        ////console.log("board labels");
        ////console.log(res.data);
        const board_labels = res.data.map((obj) => ({
          id: obj.id,
          title: obj.title,
          color: obj.color,
          checked: false,
        }));

        const board_labels_but_not_task_labels = board_labels.filter(
          (label) =>
            !task_labels.some((task_label) => task_label.id === label.id)
        );
        task_labels.map((label) => (label.checked = true));
        setAllLabels([...task_labels, ...board_labels_but_not_task_labels]);

        setBoardLabels(board_labels_but_not_task_labels);
      });
  }, [task_labels]);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setShowEdit(false);
    setShowCreate(false);
    setAnchorEl(null);
  };

  const delete_label_from_task = (label_id) => {
    setIsPost(true);
    apiInstance
      .patch(`task/${params.task_id}/delete-labels-from-task/`, {
        labels: [label_id],
      })
      .then((res) => {
        toast.success("برچسب با موفقیت از فعالیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        set_task_labels((prevState) => {
          const new_label = allLabels.find((label) => label.id === label_id);
          new_label.checked = false;
          return prevState.filter((label) => label.id !== label_id);
        });
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const add_label_to_task = (inputElem, label_id) => {
    //console.log("add label to task");
    setIsPost(true);
    apiInstance
      .patch(`task/${params.task_id}/add-labels-to-task/`, {
        labels: [label_id],
      })
      .then((res) => {
        toast.success("برچسب با موفقیت به فعالیت اضافه شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        set_task_labels((prevState) => {
          const new_label = allLabels.find((label) => label.id === label_id);
          new_label.checked = true;
          return [...prevState, new_label];
        });
      })
      .finally(() => {
        setIsPost(null);
      });
    ////console.log("task labels");
    ////console.log(task_labels);
    ////console.log("board labels");
    ////console.log(boardLabels);
    ////console.log("task labels");
  };
  const change_label_checked = (label_id) => {
    const label = allLabels.find((label) => label.id === label_id);
    if (label.checked) {
      delete_label_from_task(label_id);
    } else {
      add_label_to_task(null, label_id);
    }
    setAllLabels((prevState) =>
      prevState.map((label) => {
        if (label.id === label_id) {
          label.checked = !label.checked;
        }
        return label;
      })
    );
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
    setShowEdit(true);
  };
  const handleCreatePage = () => {
    setShowCreate(true);
  };

  return (
    <div className="taskmodal-flexibale-icon">
      {isPost ? <Loading /> : null}
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
          borderRadius: "35px",
          height: "80%",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <LabelIcon rotate="90" fontSize="large"></LabelIcon>{" "}
        <div className="taskmodal-smaller-button">برچسب</div>
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
        <div className="tm_labels-main-div">
          {showEdit && (
            <EditLabel
              setShowEdit={setShowEdit}
              item={editItem}
              setAllLabels={setAllLabels}
              set_task_labels={set_task_labels}
            />
          )}
          {showCreate && (
            <CreateLabel
              setShowCreate={setShowCreate}
              params={params}
              setAllLabels={setAllLabels}
            />
          )}
          {!showEdit && !showCreate && (
            <>
              <div className="tm_labels-div-inner">
                <header className="tm_labels-header">
                  <h2
                    style={{ color: "#fff" }}
                    className="tm_labels-header-title"
                  >
                    برچسب‌ها
                  </h2>
                  <Divider sx={{ backgroundColor: "black" }} />
                </header>
                <ShowListOfLabels
                  allLabels={allLabels}
                  change_label_checked={change_label_checked}
                  handleEditPage={handleEditPage}
                />
                <div
                  className="flex"
                  style={{ marginTop: "2rem", marginBottom: "2rem" }}
                >
                  <button
                    className="tm_labels-add-label-button"
                    onClick={handleCreatePage}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Popover>
    </div>
  );
}
