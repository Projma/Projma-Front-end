import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import apiInstance from "../../utilities/axiosConfig";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./Checklist.scss";

export default function CheckList({ params }) {
  const [createdCheckTitle, setCreatedCheckTitle] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  const createCheckList = () => {
    const form_data = new FormData();
    form_data.append("text", createdCheckTitle);
    apiInstance
      .post(`workspaces/task/${params.task_id}/create-checklist/`, form_data)
      .then((res) => {
        console.log("here2");
        console.log(res.data);
      });
    console.log("here");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
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
        <div className="taskmodal-smaller-button">لیست کنترل</div>
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
        <div className="tm_checklists-main-div">
          <header className="tm_checklists-header">
            <h2>اضافه کردن لیست کنترل</h2>
          </header>
          <Divider />
          <div className="tm_checklists-body">
            <input
              type="text"
              placeholder="عنوان لیست کنترل"
              value={createdCheckTitle}
              onChange={(e) => setCreatedCheckTitle(e.target.value)}
            />
            <div className="tm_checklists-body-buttons">
              <button
                className="tm_checklists-body-buttons-add"
                onClick={(e) => createCheckList()}
              >
                اضافه کردن
              </button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
