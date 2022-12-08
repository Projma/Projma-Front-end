import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import apiInstance from "../../utilities/axiosConfig";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./Attachment.scss";

export default function Attachments({ params }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [binaryFile, setBinaryFile] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
      console.log(URL.createObjectURL(file));
    }
  };
  const createAttachment = () => {
    console.log("create attachment");
    const formData = new FormData();
    formData.append("file", binaryFile);
    apiInstance.patch(
      `workspaces/task/${params.task_id}/add-attachment-to-task/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
        }}
      >
        <LabelIcon rotate="90" fontSize="large"></LabelIcon>{" "}
        <div className="taskmodal-smaller-button">پیوست</div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="tm_attachments-main-div">
          <div className="tm_attachments-header">
            <h2>اضافه کردن پیوست</h2>
          </div>
          <Divider />
          <div className="tm_attachments-body">
            <input type="file" onChange={(e) => handleFileChange(e)} />
            <button onClick={(e) => createAttachment()}>اضافه کردن</button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
