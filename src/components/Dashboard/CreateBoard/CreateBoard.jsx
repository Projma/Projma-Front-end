import * as React from "react";
import { useState, useSelector , useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateBoard.scss";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
import Loading from "../../Shared/Loading";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "42rem",
  height: "62rem",
  backgroundColor: "#001E3C",
  // bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "10px",
  boxShadow: 50,
  p: 4,
  fontFamily: "Vazir",
  // overflow: 'hidden', scroll
  overflow: "auto",
};

export default function CreateBoardModal({}) {
  const navigate = useNavigate();
  const navigateToBoard = (boardId) => {
    navigate(`/kanban/${boardId}`);
  };
  const handleChange = (e) => {
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };
  const [binaryFile, setBinaryFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [workspaceId, setWorkspaceId] = React.useState(-1);
  const handleOpen = () => {
    setWorkspaceId(-1);
    setTitle("");
    setDescription("");
    setFile(x);
    setOpen(true);
  };
  const handleClose = () => {
    setWorkspaceId(-1);
    setTitle("");
    setDescription("");
    setFile(x);
    setOpen(false);
  };
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [errorBoardName, setErrorBoardName] = React.useState(false);
  const [errorWorkspace, setErrorWorkspace] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const [isPost, setIsPost] = useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const on_submit = (form_data) => {
    setIsPost(true);
    apiInstance
      .post(
        `/workspaces/workspaceowner/${workspaceId}/create-board/`,
        form_data
      )
      .then((res) => {
        toast.success("بورد با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });

        delay(6000).then(() => navigateToBoard(res.data.id));
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const create_board = (e) => {
    e.preventDefault();
    let board_name = document.getElementById("board_name").value;
    let isValid = true;
    if (board_name === "") {
      setErrorBoardName(true);
      isValid = false;
    } else {
      setErrorBoardName(false);
    }
    if (workspaceId === -1) {
      setErrorWorkspace(true);
      isValid = false;
    } else {
      setErrorWorkspace(false);
    }
    if (isValid === false) {
      return;
    } else {
      setDisableButton(true); // make text spinning and disable button
    }

    const form_data = new FormData();
    form_data.append("name", title);
    form_data.append("description", description);
    // form_data.append("type", "education");
    if (binaryFile !== null) {
      form_data.append("background_pic", binaryFile);
    }
    on_submit(form_data);
    handleClose();
    // navigate to board page that created
  };
  let [workspaces, setWorkspaces] = useState([]);
  useEffect(() => {
    apiInstance
      .get("/workspaces/dashboard/myworkspaces/")
      .then((response) => {
        setWorkspaces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {isPost ? <Loading /> : null}
      {/* {isPost ? <Loading /> : null} */}
      <Button
        onClick={handleOpen}
        sx={{
          // color: '#00bfff',
          color: "#000",
          ":hover": {
            color: "#E2EDF8",
            backgroundColor: "#007fff",
            borderRadius: "5px",
          },
          // marginTop: '8%',
          // padding: '10%',
          // paddingTop: '1%',
          // paddingBottom: '1%',
          // margin: '10%',
          // padding: '10%',
          // paddingTop: '5%',
          // marginTop: '5%',

          fontFamily: "Vazir",
          textDecoration: "none",
          display: "block",
          transition: "0.3s",
          display: "flex",
          alignItems: "center",
          color: "white",
        }}
      >

        <h3>بوردتو بساز!😁</h3>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="createBoard-flexible"
          style={{ height: "86%" }}
        >
          <Typography
            variant="h6"
            id="modal-modal-title"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              color: "#fff",
              fontSize: "183%",
            }}
            className="neonText"
          >
            ساخت بورد جدید
          </Typography>
          <Divider
            sx={{
              backgroundColor: "#007fff",
              marginTop: "3%",
              marginBottom: "5%",
            }}
          />
          <img src={x} className="workspace-modal--board-image" />
          <form className="workspace-modal--board-form">
            <PerTextField>
              <StyledTextField
                className="workspace-modal--board-name"
                id="board_name"
                label="نام بورد"
                value={title}
                onChange={(e) => {
                  setTitle(convertNumberToPersian(e.target.value));
                }}
                required
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "135%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
                  },
                }}
                name="board_name"
                autoComplete="board_name"
                autoFocus
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Vazir",
                    color: "red",
                    fontSize: "1.3rem",
                  },
                }}
                error={errorBoardName}
                helperText={
                  errorBoardName ? "نام بورد نمی تواند خالی باشد" : ""
                }
              />
              <StyledTextField
                className="workspace-modal--board-name"
                label="نام فضای کاری"
                // value={workspaceName}
                onChange={(e) => {
                  setWorkspaceId(e.target.value);
                }}
                required
                sx={{
                  fontFamily: "Vazir",
                  fontSize: "1.7rem",
                  marginTop: "3%",
                  marginBottom: "3%",
                }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "80%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
                  },
                }}
                SelectProps={{
                  style: {
                    fontFamily: "Vazir",
                    fontSize: "1.6rem",
                  },
                }}
                name="workspace_name"
                autoComplete="workspace_name"
                autoFocus
                FormHelperTextProps={{
                  style: {
                    fontFamily: "Vazir",
                    color: "red",
                    fontSize: "1.3rem",
                  },
                }}
                error={errorWorkspace}
                helperText={
                  errorWorkspace ? "نام فضای کاری نمی تواند خالی باشد" : ""
                }
                select // https://mui.com/material-ui/react-text-field/#basic-textfield
              >
                {workspaces.map((workspace) => (
                  <MenuItem
                    key={workspace.id}
                    value={workspace.id}
                    sx={{
                      fontFamily: "Vazir",
                      color: "#007fff", // #0A1929
                      // backgroundColor: '#265D97',
                      backgroundColor: "#001E3C",
                      // margin: '0%',
                      // padding: '3%',
                      ":hover": {
                        backgroundColor: "#132F4C",
                        // borderRadius: '5px',
                      },
                      fontSize: "1.5rem",
                    }}
                  >
                    {workspace.name}
                  </MenuItem>
                ))}
              </StyledTextField>

              <StyledTextField
                className="workspace-modal--board-name"
                label="توضیحات"
                value={description}
                onChange={(e) => {
                  setDescription(convertNumberToPersian(e.target.value));
                }}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "135%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
                  },
                }}
              />
            </PerTextField>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                rowGap: "1rem",
              }}
            >
              <Avatar
                src={file ? file : x}
                alt="profile"
                className="workspace-modal--board-flexible"
                sx={{
                  mt: 1,
                  width: "11vmin",
                  height: "11vmin",
                  borderRadius: "50%",
                }}
              />

              <Button
                variant="contained"
                component="label"
                sx={{
                  // backgroundColor: themeProps.primaryColor,
                  color: "white",
                  width: "120px",
                  mt: 2,
                  marginTop: 0,
                }}
              >
                <p style={{ fontSize: "85%" }}>انتخاب عکس</p>
                <input
                  type="file"
                  hidden
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png"
                />
              </Button>
            </div>
            <input
              type="submit"
              value="بساز"
              className="workspace-modal--button-29"
              onClick={create_board}
              style={{ fontFamily: "Vazir", fontSize: "190%" }}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
