import * as React from "react";
import { useState, useSelector } from "react";
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
import { convertNumberToPersian } from "../../../utilities/helpers";
import Loading from "../../Shared/Loading";
import useTheme from "../../../hooks/useTheme";

export default function CreateBoardModal({ workspace_id }) {
  const { theme } = useTheme();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "42rem",
    height: "62rem",
    backgroundColor: "#001E3C",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 50,
    p: 4,
    fontFamily: "Vazir",
    // overflow: 'hidden', scroll
    overflow: "auto",
  };
  const navigate = useNavigate();
  const navigateToBoard = (boardId) => {
    // navigate(`/kanban/${boardId}`);
    navigate(`/workspace/${workspace_id}/kanban/${boardId}/board`);
  };
  const handleChange = (e) => {
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };
  const [result, setResult] = useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setTitle("");
    setDescription("");
    setFile(x);
    setOpen(true);
  };
  const handleClose = () => {
    setTitle("");
    setDescription("");
    setFile(x);
    setOpen(false);
  };
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [errorBoardName, setErrorBoardName] = React.useState(false);
  const [isPost, setIsPost] = useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const on_submit = (form_data) => {
    setIsPost(true);
    apiInstance
      .post(
        `/workspaces/workspaceowner/${workspace_id}/create-board/`,
        form_data
      )
      .then((res) => {
        toast.success("بورد با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        console.log(res.data);
        const id = res.data.id;
        apiInstance.post("/calendar/simple-calenadr", {board: id});
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
  return (
    <div>
      {isPost ? <Loading /> : null}
      <Button
        onClick={handleOpen}
        sx={{
          // color: '#00bfff',
          color: theme.text,
          ":hover": {
            color: theme.tertiary,
            backgroundColor: theme.secondary,
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
        }}
      >
        <h3>افزودن بورد</h3>
      </Button>
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
              fontSize: "185%",
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
                <p style={{ fontSize: "84%" }}>انتخاب عکس</p>
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
              style={{ fontFamily: "Vazir" }}
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
