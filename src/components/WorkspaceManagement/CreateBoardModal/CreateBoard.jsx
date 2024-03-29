import * as React from "react";
import { useState, useSelector } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import { useNavigate } from "react-router-dom";
import PerTextField from "../../Shared/PerTextField";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
import apiInstance from "../../../utilities/axiosConfig";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

// import file from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateBoard.scss";
import { convertNumberToPersian } from "../../../utilities/helpers";
import useTheme from "../../../hooks/useTheme";

export default function CreateBoardModal({
  // params,
  // on_submit,
  boards,
  setBoards,
}) {
  const { theme, getColor } = useTheme();
  const [result, setResult] = useState("");
  const [binaryFile, setBinaryFile] = useState(null);
  const [open, setOpen] = React.useState(false);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "fit-content",
    height: "fit-content",
    backgroundColor: theme.minorBg,
    color: getColor(theme.minorBg),
    border: `0.2rem solid ${theme.primary}`,
    borderRadius: "0.5rem",
    boxShadow: 50,
    p: 4,
    overflow: "auto",
  };
  const handleChange = (e) => {
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
    }
  };
  const navigateToBoard = (boardId) => {
    console.log(`workspace/${params.id}/kanban/${boardId}/board`);
    navigate(`/workspace/${params.id}/kanban/${boardId}/board`);
  };
  let params = useParams();
  const on_submit = (form_data) => {
    console.log("hereeererereer");
    console.log(form_data);
    console.log(params);
    setIsPost(true);
    apiInstance
      .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
      .then((res) => {
        const new_board = {
          id: res.data.id,
          name: res.data.name,
          background_pic: res.data.background_pic,
        };
        const updatedItems = [...boards, new_board];
        setBoards(updatedItems);
        // delay(6000).then(() => navigateToBoard(res.data.id));
        toast.success("بورد با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .finally(() => {
        setIsPost(null);
        setBinaryFile(null);
      });
  };

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
  const [disableButton, setDisableButton] = React.useState(false);
  const [isPost, setIsPost] = useState(false);
  const create_board = (e) => {
    e.preventDefault();
    let board_name = document.getElementById("board_name").value;
    // let board_name = "test";
    let isValid = true;
    ////console.log(board_name);
    ////console.log("board name");
    if (board_name === "") {
      setErrorBoardName(true);
      isValid = false;
    } else {
      setErrorBoardName(false);
    }
    if (isValid === false) {
      ////console.log("false");
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
      <div
        className="workspace-modal--add-button-container"
        style={{ width: "100%", height: "100%" }}
      >
        <Button
          // className="workspace-modal--add-button"
          id="add_button"
          onClick={handleOpen}
          variant="outlined"
          style={{ width: "20rem", height: "8rem" }}
        >
          <p
            className="workspace-modal--add-button-title"
            // style={{ color: getColor(theme.primary) }}
          >
            + افزودن بورد
          </p>
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{
        //   height: "100%",
        // }}
      >
        <Box sx={style}>
          <Typography
            variant="h6"
            id="modal-modal-title"
            component="h2"
            sx={{
              textAlign: "center",
              fontFamily: "Vazir",
              color: getColor(theme.minorBg),
              fontSize: "109%",
            }}
            className="neonText"
          >
            ساخت بورد جدید
          </Typography>
          <Divider
            sx={{
              backgroundColor: theme.mainBg,
              marginTop: "0.5rem",
              marginBottom: "0.75rem",
            }}
          />
          <img
            style={{ marginTop: "5%" }}
            src={x}
            className="workspace-modal--board-image"
          />
          <form className="workspace-modal--board-form">
            <PerTextField>
              <StyledTextField
                className="workspace-modal--board-name"
                id="board_name"
                label="نام بورد"
                value={convertNumberToPersian(title)}
                onChange={(e) => {
                  setTitle(convertNumberToPersian(e.target.value));
                }}
                required
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "75%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.7rem",
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
                error={errorBoardName}
                helperText={
                  errorBoardName ? "نام بورد نمی تواند خالی باشد" : ""
                }
              />
              <StyledTextField
                className="workspace-modal--board-name"
                id="description"
                label="توضیحات"
                value={convertNumberToPersian(description)}
                onChange={(e) => {
                  setDescription(convertNumberToPersian(e.target.value));
                }}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "75%" },
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
                variant="text"
                component="label"
                sx={{
                  // backgroundColor: themeProps.primaryColor,
                  width: "120px",
                  mt: 2,
                  marginTop: 0,
                }}
              >
                <p style={{ fontSize: "1rem" }}>انتخاب عکس</p>
                <input
                  type="file"
                  hidden
                  onChange={handleChange}
                  accept=".jpg,.jpeg,.png"
                />
              </Button>
            </div>
            {/* <input
              type="file"
              // ref="file"
              onChange={handleChange}
              // name="user[image]"
              // multiple="true"
              // name="img"
              // id="img"
            /> */}
            {/* <img src={this.state.imgSrc} alt="img" /> */}
            {/* <label id="title">عنوان بورد</label>
            <input type="text" id="title" className="workspace-modal--title-inp" /> */}
            {/* <button onClick={create_board}>submit</button> */}
            {/* <input
              type="submit"
              value="بساز"
              className="workspace-modal--button-29"
              onClick={create_board}
              style={{ fontFamily: "Vazir", fontSize: "101%",textAlign:"center" }}
            /> */}
            <Button
              variant="contained"
              type="submit"
              onClick={create_board}
              style={{ marginTop: "1rem" }}
            >
              بساز
            </Button>
          </form>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </div>
  );
}
