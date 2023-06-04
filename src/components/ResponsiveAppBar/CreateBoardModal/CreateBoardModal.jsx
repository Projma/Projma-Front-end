import * as React from "react";
import { useState, useSelector, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateBoardModal.scss";
import { toast } from "react-toastify";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import Loading from "../../Shared/Loading";
import MenuItem from "@mui/material/MenuItem";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers";

export default function CreateBoardModal({}) {
  const { theme, getColor } = useTheme();
  const style = {
    color: theme.text,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "42rem",
    height: "62rem",
    backgroundColor: theme.minorBg,
    // bgcolor: "background.paper",
    border: `2px solid ${theme.tertiary}`,
    borderRadius: "10px",
    boxShadow: 50,
    p: 4,
    fontFamily: "Vazir",
    // overflow: 'hidden', scroll
    overflow: "auto",
    color: getColor(theme.minorBg),
  };
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
      .finally(() => setIsPost(null));
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
      {/* <div className="workspace-modal--add-button-container">
                <button className="workspace-modal--add-button" onClick={handleOpen}>
                    <p className="workspace-modal--add-button-title">+ افزودن بورد</p>
                </button>
            </div> */}
      {isPost ? <Loading /> : null}
      <Button
        onClick={handleOpen}
        sx={{
          // color: '#00bfff',
          ":hover": {
            color: getColor(theme.tertiary),
            backgroundColor: theme.tertiary,
            borderRadius: "5px",
          },
          transition: "0.3s",
          backgroundColor: theme.minorBg,
          color: getColor(theme.mainBg),
          fontFamily: "Vazir",
          textDecoration: "none",
          display: "block",
          transition: "0.3s",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{ fontFamily: "Vazir", fontSize: "87%" }}
          // style={{color: 'black',}}
        >
          افزودن بورد +
        </div>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ height: "83%" }}>
          <Typography
            variant="h6"
            id="modal-modal-title"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              color: getColor(theme.mainBg),
              fontSize: "185%",
            }}
            className="neonText"
          >
            ساخت بورد جدید
          </Typography>
          <Divider
            sx={{
              color: getColor(theme.mainBg),
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
                }}
                InputLabelProps={{
                  style: {
                    fontFamily: "Vazir",
                    fontSize: "85%",
                    alignItems: "center",
                  },
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
                      color: theme.text, // #0A1929
                      // backgroundColor: '#265D97',
                      backgroundColor: theme.minorBg,
                      // margin: '0%',
                      // padding: '3%',
                      ":hover": {
                        backgroundColor: theme.secondary,
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
                <p style={{ fontSize: "76%" }}>انتخاب عکس</p>
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
              style={{ fontFamily: "Vazir", fontSize: "185%" }}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
