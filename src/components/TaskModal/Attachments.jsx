import * as React from "react";
import Modal from "../Asset/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import apiInstance from "../../utilities/axiosConfig";
import LabelIcon from "@mui/icons-material/Label";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.scss";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import useTheme from "../../hooks/useTheme";
import "./Attachment.scss";

export default function Attachments({ params, setAllAttachments }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [file, setFile] = React.useState(null);
  const [isPost, setIsPost] = React.useState(false);
  const [binaryFile, setBinaryFile] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { theme, getColor } = useTheme();
  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="taskmodal-flexibale-icon" style={{ width: "100%" }}>
      {isPost ? <Loading /> : null}
      <Button
        aria-describedby={id}
        role="open_attachment"
        variant="contained"
        onClick={handleClick}
        style={{ width: "100%" }}
      >
        <AttachFileIcon rotate="90"></AttachFileIcon>
        <div className="taskmodal-smaller-button">پیوست</div>
      </Button>
      <Modal id={id} open={open} onClose={handleClose}>
        <div className="tm_attachments-main-div">
          <div className="tm_attachments-header">
            <h2 style={{ color: getColor(theme.minorBg) }}>اضافه کردن پیوست</h2>
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
                  color: getColor(theme.minorBg),
                  backgroundColor: theme.mainBg
                }}
              >
                انتخاب فایل
              </label>
              <input
                type="file"
                id="files"
                name="fileUpload"
                style={{
                  visibility: "hidden",
                  width: "5%",
                  color: getColor(theme.minorBg),
                }}
                onChange={(e) => handleFileChange(e)}
              />
              <div
                style={{
                  display: "flex",
                  color: getColor(theme.minorBg),
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
              onClick={(e) => {
                e.stopPropagation();
                createAttachment();
              }}
              style={{ color: getColor(theme.minorBg) }}
            >
              اضافه کردن
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
