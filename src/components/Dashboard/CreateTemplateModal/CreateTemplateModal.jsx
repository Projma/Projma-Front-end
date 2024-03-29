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
// import file from "../../../static/images/workspace_management/create_board/board.jpeg";
import "./CreateTemplateModal.scss";
import {  toast } from "react-toastify";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";

import MenuItem from "@mui/material/MenuItem";
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
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 50,
    p: 4,
    fontFamily: "Vazir",
    overflow: "auto",
};

export default function CreateTemplateModal(props) {
    const navigate = useNavigate();
    const [workspaceId, setWorkspaceId] = React.useState(-1);
    const navigateToBoard = (boardId) => {
        // navigate(`/kanban/${boardId}`);
        navigate(`/workspace/${workspaceId}/kanban/${boardId}/board`);
    };
    const [binaryFile, setBinaryFile] = useState(null);
    const [open, setOpen] = React.useState(false);
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
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const on_submit = (form_data) => {
        apiInstance
            .get(
                // `/workspaces/templates/${props.template_id}/create-board-from-template/${workspaceId}/`// ,
                `/template/${props.template_id}/create-board-from-template/${workspaceId}/`
            )
            .then((res) => {

                toast.success("تمپلیت با موفقیت ساخته شد", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    rtl: true,
                });

                delay(6000).then(() => navigateToBoard(res.data.id));
            }).catch((err) => {
                console.log(err);
                toast.error("خطا در ساخت تمپلیت", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    rtl: true,
            })});
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
        form_data.append("type", "education");
        form_data.append("background_pic", binaryFile);
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
                    margin: '0%',

                    fontFamily: "Vazir",
                    textDecoration: "none",
                    display: "block",
                    transition: "0.3s",
                    display: "flex",
                    alignItems: "center",
                }}
            >

                <h3
                // style={{color: 'black',}}
                >
                    افزودن تمپلیت
                </h3>
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
                        ساخت تمپلیت {props.template_name}
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
                                id="board_name"
                                label="نام تمپلیت"
                                value={title}
                                onChange={(e) => {
                                    setTitle(convertNumberToPersian(e.target.value));
                                }}
                                required
                                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                                InputLabelProps={{
                                    style: { fontFamily: "Vazir", fontSize: "1.6rem" },
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
                                helperText={errorBoardName ? "نام تمپلیت نمی تواند خالی باشد" : ""}
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
                                    style: { fontFamily: "Vazir", fontSize: "1.6rem" },
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
                                    style: { fontFamily: "Vazir", fontSize: "1.6rem" },
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
                        {/* <Avatar
                            src={file ? file : x}
                            alt="profile"
                            sx={{
                                mt: 1,
                                width: "11vmin",
                                height: "11vmin",
                                borderRadius: "50%",
                            }}
                        /> */}
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
