import * as React from "react";
import { useState, useSelector, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { baseUrl } from "../../../utilities/constants";
import axios from "axios";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import apiInstance from "../../../utilities/axiosConfig";
import BasicSelect from "./SelectType";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField.js";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
import Loading from "../../Shared/Loading";
import "./EditModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "38rem",
  height: "55rem",
  backgroundColor: "#001E3C",
  // bgcolor: "background.paper",
  // border: "0.5rem solid #dfe6e5",
  borderRadius: "1rem",
  boxShadow: 50,
  p: 4,
};

export default function EditModal({ params, update_navbar }) {
  const [isPost, setIsPost] = useState(false);
  const nameRef = React.useRef();
  const descriptionRef = React.useRef();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("");
  const handleOpen = () => {
    setOpen(true);
    // setPage(body);
    // nameRef.current.value = workspace.name;
    // descriptionRef.current.value = workspace.description;
    console.log(workspace);
  };
  const handleClose = () => {
    setNewType(workspace.type);
    console.log("herrrr");
    console.log(workspace);
    // setNewName(workspace.name);
    // setNewDescription(workspace.description);
    setOpen(false);
    // setPage("");
  };
  // console.log("workspace in edit modal", name, description, type);
  const [newType, setNewType] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [workspace, setWorkspace] = React.useState({});
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        console.log(res.data);
        console.log(
          "*********************************************************"
        );
        setWorkspace(res.data);
        console.log(workspace);
      })
      .catch((err) => {
        console.log(err);
      });
    setNewName(workspace.name);
    console.log(newName);
    setNewDescription(workspace.description);
    setNewType(workspace.type);
    console.log(workspace.description);
    console.log(workspace.type);
  }, []);

  const edit_workspace = (e) => {
    setIsPost(true);
    e.preventDefault();
    const form_data = new FormData();
    if (newName == undefined || newName == "" || newName == workspace.name) {
      form_data.append("name", workspace.name);
    } else {
      form_data.append("name", newName);
    }
    console.log("newDescription");
    console.log(newDescription);
    if (
      newDescription == undefined ||
      newDescription == "" ||
      newDescription == workspace.description
    ) {
      console.log("yesss");
      form_data.append("description", workspace.description);
    } else {
      console.log("nooo");
      form_data.append("description", newDescription);
    }
    if (newType == undefined || newType == "" || newType == workspace.type) {
      form_data.append("type", workspace.type);
    } else {
      form_data.append("type", newType);
    }
    console.log("form_data");
    console.log(form_data);
    apiInstance
      .patch(
        `workspaces/workspaceowner/${params.id}/edit-workspace/`,
        form_data
      )
      .then((res) => {
        update_navbar(workspace);
        handleClose();
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const setWorkspaceType = (type) => {
    setWorkspace({ ...workspace, type: type });
  };
  return (
    <div className="ws_editmodal-main-div">
      {isPost ? <Loading /> : null}
      <div className="add-button-container">
        <EditIcon className="ws_navbar-edit-icon" onClick={handleOpen} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            id="modal-modal-title"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              color: "#fff",
            }}
          >
            بروزرسانی اطلاعات فضای کار
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#007fff",
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
            }}
          />
          {/* <img src={x} className="board-image" /> */}
          <form className="board-form">
            <PerTextField>
              <StyledTextField
                className="ws_editmodal-input"
                value={workspace.name}
                defaultValue={workspace.name}
                onChange={(e) =>
                  setWorkspace({ ...workspace, name: e.target.value })
                }
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
              />
              <label className="ws_editmodal-label">نام فضای کار</label>

              <StyledTextField
                ref={descriptionRef}
                className="ws_editmodal-input"
                onChange={(e) =>
                  setWorkspace({ ...workspace, description: e.target.value })
                }
                value={workspace.description}
                defaultValue={workspace.description}
                sx={{
                  textAlign: "center",
                  fontFamily: "Vazir",
                  marginTop: "5%",
                  fontSize: "1.5rem",
                  // direction: "rtl",
                }}
              />
              <label className="ws_editmodal-label">توضیحات</label>
              <label className="ws_editmodal-label">نوع فضای کار</label>
              <BasicSelect
                type={workspace.type}
                setWorkspaceType={setWorkspaceType}
                workspace={workspace}
              />
            </PerTextField>
            <input
              type="submit"
              value="ذخیره"
              className="button-29"
              onClick={edit_workspace}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
