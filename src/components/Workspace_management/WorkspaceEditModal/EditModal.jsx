import * as React from "react";
import { useState, useSelector, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import apiInstance from "../../../utilities/axiosConfig";
import BasicSelect from "./SelectType";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField.js";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
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

export default function EditModal({ params }) {
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
    // setNewType(workspace.type);
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
    setNewDescription(workspace.description);
    setNewType(workspace.type);
  }, []);

  const edit_workspace = (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", newName);
    form_data.append("description", newDescription);
    form_data.append("type", newType);
    apiInstance
      .patch(
        `workspaces/workspaceowner/${params.id}/edit-workspace/`,
        form_data
      )
      .then((res) => {
        console.log("in edit modal");
        console.log(res.data);
        setWorkspace(res.data);
      });
  };

  return (
    <div className="ws_editmodal-main-div">
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
              <label className="ws_editmodal-label">نام فضای کار</label>
              <StyledTextField
                ref={nameRef}
                className="board-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
              />
              <label className="ws_editmodal-label">توضیحات</label>
              <StyledTextField
                ref={descriptionRef}
                className="board-name"
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
              />
              <label className="ws_editmodal-label">نوع فضای کار</label>
              <BasicSelect type={workspace.type} setNewType={setNewType} />
              {/* <StyledTextField
            className="board-name"
            value={workspace.type}
            sx={{ textAlign: "center", fontFamily: "Vazir" }}
          /> */}
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
