import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditLabel from "./EditLabel";
import CreateLabel from "./CreateLabel";
import apiInstance from "../../utilities/axiosConfig";
import Modal from "../Asset/Modal";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import useTheme from "../../hooks/useTheme";
import "../../styles/TaskModal.scss";
import Loading from "../Shared/Loading";
import ShowListOfLabels from "./ShowListOfLabels";
import "./Labels.scss";
// // persian num
import { convertNumberToPersian } from "../../utilities/helpers";

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
  const [open,setOpen] = useState(false);
  const {theme,getColor} = useTheme();
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
    setOpen(true);
  };

  const handleClose = () => {
    setShowEdit(false);
    setShowCreate(false);
    setOpen(false);
  };

  const editThisItem = (editedTitle, editedColor, editedId) => {
    ////console.log("edit this item");
    if (editedTitle === "") {
      toast.error("عنوان برچسب نمیتواند خالی باشد", {
        position: toast.POSITION.BOTTOM_LEFT,
        rtl: true,
      });
      return;
    }
    setIsPost(true);
    apiInstance
      .patch(`board/label/${editedId}/update-label/`, {
        title: editedTitle,
        color: editedColor,
      })
      .then((res) => {
        ////console.log("in edit label");
        ////console.log(res.data);
        let flag = 0;
        set_task_labels((prevState) =>
          prevState.map((label) => {
            if (label.id === editedId) {
              return { ...label, title: res.data.title, color: res.data.color };
            } else {
              return label;
            }
          })
        );
        setAllLabels((prevState) =>
          prevState.map((label) => {
            if (label.id === editedId) {
              flag = 1;
              return { ...label, title: res.data.title, color: res.data.color };
            } else {
              return label;
            }
          })
        );
        toast.success("ویرایش برچسب با موفقیت انجام شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .finally(() => {
        setIsPost(null);
      });
    setShowEdit(false);
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
    <div className="taskmodal-flexibale-icon" style={{width:"100%"}}>
      {isPost ? <Loading /> : null}
      <Button
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        style={{width:"100%"}}
      >
        <LabelIcon rotate="90" ></LabelIcon>{" "}
        <div>برچسب</div>
      </Button>
      <Modal
        id={id}
        open={open}
        onClose={handleClose}
      >
        <div className="tm_labels-main-div">
          {showEdit && (
            <EditLabel
              setShowEdit={setShowEdit}
              item={editItem}
              editThisItem={editThisItem}
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
                    style={{ color: getColor(theme.minorBg) }}
                    className="tm_labels-header-title"
                  >
                    برچسب‌ها
                  </h2>
                  <Divider
                    sx={
                      {
                        backgroundColor: "black"
                      }
                    }
                  />
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
      </Modal>
    </div>
  );
}
