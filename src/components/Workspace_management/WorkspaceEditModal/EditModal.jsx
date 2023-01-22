import * as React from "react";
import { useState, useSelector, useEffect } from "react";
import { Box } from "@mui/material";
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
import { convertNumberToPersian } from "../../../utilities/helpers.js";

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
  };
  const handleClose = () => {
    setWorkspace(oldWorkspace);
    setOpen(false);
  };
  // ////console.log("workspace in edit modal", name, description, type);
  const [newType, setNewType] = React.useState("");
  const [newName, setNewName] = React.useState("");
  const [newDescription, setNewDescription] = React.useState("");
  const [workspace, setWorkspace] = React.useState({});
  const [oldWorkspace, setOldWorkspace] = React.useState({});
  const [change, setChange] = React.useState(false);
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        setWorkspace(res.data);
        setOldWorkspace(res.data);
        ////console.log(workspace);
      })
      .catch((err) => {
        ////console.log(err);
      });
    setNewName(workspace.name);
    ////console.log(newName);
    setNewDescription(workspace.description);
    setNewType(workspace.type);
    ////console.log(workspace.description);
    ////console.log(workspace.type);
  }, [change]);

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        setWorkspace(res.data);
        setOldWorkspace(res.data);
        ////console.log(workspace);
      })
      .catch((err) => {
        ////console.log(err);
      });
    setNewName(workspace.name);
    ////console.log(newName);
    setNewDescription(workspace.description);
    setNewType(workspace.type);
    ////console.log(workspace.description);
    ////console.log(workspace.type);
  }, []);

  const edit_workspace = (e) => {
    // setOldWorkspace(workspace);
    setIsPost(true);
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", workspace.name);
    form_data.append("description", workspace.description);
    form_data.append("type", workspace.type);
    apiInstance
      .patch(
        `workspaces/workspaceowner/${params.id}/edit-workspace/`,
        form_data
      )
      .then((res) => {
        update_navbar(workspace);
        setChange(!change);
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
              fontSize: "109%",
            }}
            className="neonText"
          >
            بروزرسانی اطلاعات فضای کار
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#007fff",
              marginTop: "5%",
              marginBottom: "8%",
            }}
          />
          {/* <img src={x} className="board-image" /> */}
          <form className="board-form">
            <PerTextField>
              <div className="ws_editmodal-inputs">
                <StyledTextField
                  className="ws_editmodal-input"
                  label="نام فضای کاری"
                  value={convertNumberToPersian(workspace.name)}
                  defaultValue={convertNumberToPersian(workspace.name)}
                  onChange={(e) =>
                    setWorkspace({
                      ...workspace,
                      name: convertNumberToPersian(e.target.value),
                    })
                  }
                  InputLabelProps={{
                    style: { fontFamily: "Vazir", fontSize: "75%" },
                  }}
                  inputProps={{
                    style: {
                      height: "50px",
                      padding: "0 14px",
                      fontFamily: "Vazir",
                      fontSize: "1.5rem",
                    },
                  }}
                  sx={{ textAlign: "center", fontFamily: "Vazir" }}
                />
                <StyledTextField
                  ref={descriptionRef}
                  className="ws_editmodal-input"
                  label="توضیحات"
                  onChange={(e) =>
                    setWorkspace({
                      ...workspace,
                      description: convertNumberToPersian(e.target.value),
                    })
                  }
                  value={convertNumberToPersian(workspace.description)}
                  defaultValue={convertNumberToPersian(workspace.description)}
                  sx={{
                    textAlign: "center",
                    fontFamily: "Vazir",
                    marginTop: "10%",
                    // direction: "rtl",
                  }}
                  InputLabelProps={{
                    style: { fontFamily: "Vazir", fontSize: "75%" },
                  }}
                  inputProps={{
                    style: {
                      height: "50px",
                      padding: "0 14px",
                      fontFamily: "Vazir",
                      fontSize: "1.5rem",
                    },
                  }}
                />
                <br></br>
                <label
                  style={{
                    color: "white",
                    fontSize: "76%",
                    marginBottom: "3%",
                  }}
                >
                  نوع فضای کار
                </label>
                <BasicSelect
                  type={workspace.type}
                  setWorkspaceType={setWorkspaceType}
                  workspace={workspace}
                  label="نوع فضای کار"
                />
              </div>
            </PerTextField>
            <div className="ws_editmodal-button-div">
              <input
                style={{ fontFamily: "Vazir", fontSize: "101%", width: "100%" }}
                type="submit"
                value="ذخیره"
                className="edit_workspace-modal-button-29"
                onClick={edit_workspace}
              />
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
