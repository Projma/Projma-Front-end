import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import apiInstance from "../../utilities/axiosConfig";
import LabelIcon from "@mui/icons-material/Label";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import Loading from "../Shared/Loading";
import {  toast } from "react-toastify";

import "./Attachment.scss";

export default function Attachments({ params, setAllAttachments }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [isPost, setIsPost] = React.useState(false);
  const [binaryFile, setBinaryFile] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFileChange = (e) => {
    ////console.log(e.target.files[0]);
    const [file] = e.target.files;
    setBinaryFile(e.target.files[0]);
    if (file) {
      setFile(URL.createObjectURL(file));
      ////console.log(URL.createObjectURL(file));
    }
  };
  const createAttachment = () => {
    const formData = new FormData();
    formData.append("file", binaryFile);
    setIsPost(true);
    handleClose();
    apiInstance
      .patch(
        `task/attachment/${params.task_id}/add-attachment-to-task/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toast.success("پیوست جدید اضافه شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        setAllAttachments((prev) => [...prev, res.data]);
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="taskmodal-flexibale-icon">
      {isPost ? <Loading /> : null}
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        role="open_attachment"
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
          borderRadius: "35px",
          height: "80%",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <AttachFileIcon rotate="90" fontSize="large"></AttachFileIcon>{" "}
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
            <h2 style={{ color: "#fff" }}>اضافه کردن پیوست</h2>
          </div>
          <Divider />
          <div
            className="tm_attachments-body"
            style={{ display: "flex", justifyContents: "space-between" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContents: "center",
                // marginRight: "5%",
              }}
            >
              {console.log(binaryFile)}
              {/* <input type="file" onChange={(e) => handleFileChange(e)} /> */}
              <label
                htmlFor="files"
                className="btn"
                style={{
                  fontSize: "100%",
                  padding: "3% 8%",
                  display: "flex",
                  justifyContent: "center",
                  border: "1px solid white",
                  borderRadius: "5px",
                  width: "36%",
                }}
              >
                انتخاب فایل
              </label>
              <input
                type="file"
                id="files"
                name="fileUpload"
                style={{ visibility: "hidden", width: "5%" }}
                onChange={(e) => handleFileChange(e)}
              />
              <div
                style={{
                  display: "flex",
                  color: "white",
                  direction: "ltr",
                  fontSize: "132%",
                  overflow: "auto",
                }}
              >
                {binaryFile != null ? binaryFile.name : ""}
              </div>
            </div>

            {/* <button onClick={(e) => createAttachment()}>اضافه کردن</button> */}
            <button
              className="attachment_button-33"
              role="button"
              onClick={(e) => createAttachment()}
            >
              اضافه کردن
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
