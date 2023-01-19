import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useRef } from "react";
import apiInstance from "../../utilities/axiosConfig";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@mui/styles";
import { Input } from "@mui/material";
import "../../styles/TaskModal.css";
import "./Checklist.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { convertNumberToPersian } from "../../utilities/helpers";

const useStyles = makeStyles({
  title_input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "#fff !important",
    },
  },
});

export default function CheckList({ params, setAllChecklists }) {
  const classes = useStyles();
  const [createdCheckTitle, setCreatedCheckTitle] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const add_section_ref = useRef(null);
  const add_button_ref = useRef(null);
  const createCheckList = (e) => {
    if (createdCheckTitle.length == 0) {
      e.preventDefault();
      toast.error("لطفا یک عنوان برای لیست کنترل خود انتخاب کنید", {
        position: toast.POSITION.BOTTOM_LEFT,
        rtl: true,
      });
      return;
    }
    const form_data = new FormData();
    form_data.append("text", createdCheckTitle);
    apiInstance
      .post(`workspaces/task/${params.task_id}/create-checklist/`, form_data)
      .then((res) => {
        console.log("here2");
        console.log(res.data);
        toast.success("مورد لیست کنترل اضافه شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        setAllChecklists((prev) => [...prev, res.data]);
      });
    handleClose();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setCreatedCheckTitle("");
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div style={{ width: "100%" }}>
      <ToastContainer />
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
          borderRadius: "35px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <LabelIcon rotate="90" fontSize="large"></LabelIcon>{" "}
        <div
          className="taskmodal-smaller-button"
          style={{ fontSize: "10px", marginRight: "0%", width: "80px" }}
        >
          لیست کنترل
        </div>
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
            <h2 style={{ color: "#fff" }}>اضافه کردن لیست کنترل</h2>
          </header>
          <Divider sx={{}} />
          <div className="tm_checklists-body" ref={add_section_ref}>
            <Input
              className={classes.title_input}
              value={createdCheckTitle}
              onChange={(e) => setCreatedCheckTitle(convertNumberToPersian(e.target.value))}
              placeholder="عنوان"
              sx={{
                color: "#fff !important",
                width: "100%",
                marginBottom: "1rem",
              }}
            />
            <button class="button-16" role="button" onClick={createCheckList}>
              افزودن
            </button>
          </div>
        </div>
      </Popover>
    </div>
  );
}
