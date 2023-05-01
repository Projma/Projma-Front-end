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
import PerTextField from "../../Shared/PerTextField";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
import Loading from "../../Shared/Loading";
import "./EditModal.css";
import { convertNumberToPersian } from "../../../utilities/helpers";

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

export default function EditModal({
  params,
  showToast,
  workspace,
  setWorkspace,
}) {
  const [isPost, setIsPost] = useState(false);
  const nameRef = React.useRef();
  const [editModalWorkspace, setEditModalWorkspace] = useState({});
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState("");
  const handleOpen = () => {
    setEditModalWorkspace(workspace);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setEditModalWorkspace(workspace);
  }, [workspace]);

  const edit_workspace = (e) => {
    setIsPost(true);
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", editModalWorkspace.name);
    form_data.append("description", editModalWorkspace.description);
    form_data.append("type", editModalWorkspace.type);
    apiInstance
      .patch(
        `workspaces/workspaceowner/${params.id}/edit-workspace/`,
        form_data
      )
      .then((res) => {
        setWorkspace(res.data);
        showToast("اطلاعات فضای کاری با موفقیت تغییر کرد");
        handleClose();
      })
      .finally(() => {
        setIsPost(null);
      });
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
          <form className="board-form">
            <PerTextField>
              <div className="ws_editmodal-inputs">
                <StyledTextField
                  className="ws_editmodal-input"
                  label="نام فضای کاری"
                  value={convertNumberToPersian(editModalWorkspace?.name)}
                  defaultValue={convertNumberToPersian(workspace?.name)}
                  onChange={(e) => {
                    setEditModalWorkspace({
                      ...editModalWorkspace,
                      name: e.target.value,
                    });
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
                  sx={{ textAlign: "center", fontFamily: "Vazir" }}
                />
                <StyledTextField
                  className="ws_editmodal-input"
                  label="توضیحات"
                  value={convertNumberToPersian(
                    editModalWorkspace?.description
                  )}
                  defaultValue={convertNumberToPersian(workspace?.description)}
                  onChange={(e) => {
                    setEditModalWorkspace({
                      ...editModalWorkspace,
                      description: e.target.value,
                    });
                  }}
                  sx={{
                    textAlign: "center",
                    fontFamily: "Vazir",
                    marginTop: "10%",
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
                  editModalWorkspace={editModalWorkspace}
                  setEditModalWorkspace={setEditModalWorkspace}
                  label="نوع فضای کار"
                />
              </div>
            </PerTextField>
            <div className="ws_editmodal-button-div">
              <input
                style={{ fontFamily: "Vazir", fontSize: "101%", width: "100%" }}
                type="submit"
                value="ذخیره"
                role="save_button"
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
