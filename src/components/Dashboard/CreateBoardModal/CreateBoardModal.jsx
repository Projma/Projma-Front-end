import * as React from "react";
import { useState, useSelector } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Modal from "@mui/material/Modal";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField.js";
import x from "../../../static/images/workspace_management/create_board/board.jpeg";
// import file from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateBoardModal.scss";
import { ToastContainer, toast } from "react-toastify";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import { convertNumberToPersian } from "../../../utilities/helpers.js";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "38rem",
    width: "42rem",
    // height: "55rem",
    height: "62rem",
    backgroundColor: "#001E3C",
    // bgcolor: "background.paper",
    border: '2px solid #000',
    // borderRadius: "1rem",
    borderRadius: '10px',
    boxShadow: 50,
    p: 4,
    fontFamily: "Vazir",
    // overflow: 'hidden', scroll
    overflow: 'auto',
};

export default function CreateBoardModal({
    workspace_id,
}) {
    const navigate = useNavigate();
    const navigateToBoard = (boardId) => {
        // navigate(`/board/`);
        navigate(`/kanban/${boardId}`);
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
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [file, setFile] = React.useState(null);
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // const on_submit = (form_data, boards, setBoards) => {
    const on_submit = (form_data) => {
        console.log("here");
        apiInstance
            .post(`/workspaces/workspaceowner/${workspace_id}/create-board/`, form_data)
            .then((res) => {
                console.log("here");
                console.log(res.data);
                console.log("here");
                toast.success("بورد با موفقیت ساخته شد", {
                    // position: toast.POSITION.BOTTOM_LEFT,
                    position: toast.POSITION.TOP_CENTER,
                    rtl: true,
                });
                
                // navigateToBoard(res.data.id);
                delay(6000).then(() => navigateToBoard(res.data.id));
            });
    };
    const create_board = (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append("name", title);
        form_data.append("description", description);
        form_data.append("type", "education");
        // on_submit(form_data, boards, setBoards);
        on_submit(form_data);
        handleClose();
        // navigate to board page that created
    };
    return (
        <div >
            {/* <div className="workspace-modal--add-button-container">
                <button className="workspace-modal--add-button" onClick={handleOpen}>
                    <p className="workspace-modal--add-button-title">+ افزودن بورد</p>
                </button>
            </div> */}
            <Button  onClick={handleOpen} 
            sx={{
                // color: '#00bfff',
                color: '#000',
                ":hover": {
                    color: '#E2EDF8',
                    backgroundColor: '#007fff',
                    borderRadius: '5px',
                },
                // marginTop: '8%',
                // padding: '10%',
                // paddingTop: '1%',
                // paddingBottom: '1%',
                // margin: '10%',
                // padding: '10%',
                // paddingTop: '5%',
                // marginTop: '5%',

                fontFamily: 'Vazir',
                textDecoration: 'none',
                display: 'block',
                transition: '0.3s',
                display: 'flex',
                alignItems: 'center',
            }}
            >
                {/* <h2 
                // style={{color: 'black',}}
                >
                    افزودن بورد +
                </h2> */}
                <h4 
                // style={{color: 'black',}}
                >
                    افزودن بورد +
                </h4>
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
                        }}
                    >
                        ساخت برد جدید
                    </Typography>
                    <Divider
                        sx={{
                            backgroundColor: "#007fff",
                            marginTop: "0.5rem",
                            marginBottom: "0.75rem",
                        }}
                    />
                    <img src={x} className="workspace-modal--board-image" />
                    <form className="workspace-modal--board-form">
                        <PerTextField>
                            <StyledTextField
                                className="workspace-modal--board-name"
                                label="نام برد"
                                value={title}
                                onChange={(e) => {
                                    setTitle(convertNumberToPersian(e.target.value));
                                }}
                                required
                                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                                InputLabelProps={{
                                    style: { fontFamily: "Vazir", fontSize: "1.6rem", },
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
                            <StyledTextField
                                className="workspace-modal--board-name"
                                label="توضیحات"
                                value={description}
                                onChange={(e) => {
                                    setDescription(convertNumberToPersian(e.target.value));
                                }}
                                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                                InputLabelProps={{
                                    style: { fontFamily: "Vazir", fontSize: "1.6rem", },
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
                                marginRight: "1.5rem",
                                marginTop: 0,
                            }}
                        >
                            <p style={{ fontSize: "1.5rem" }}>انتخاب عکس</p>
                            <input
                                type="file"
                                hidden
                                onChange={handleChange}
                                accept=".jpg,.jpeg,.png"
                            />
                        </Button>
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
                        {/* <label id="title">عنوان برد</label>
            <input type="text" id="title" className="workspace-modal--title-inp" /> */}
                        {/* <button onClick={create_board}>submit</button> */}
                        <input
                            type="submit"
                            value="بساز"
                            className="workspace-modal--button-29"
                            onClick={create_board}
                            style={{ fontFamily: "Vazir" }}
                        />
                    </form>
                    {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
                </Box>
            </Modal>
        </div>
    );
}
