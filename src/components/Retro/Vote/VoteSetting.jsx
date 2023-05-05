import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Divider from "@mui/material/Divider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./Vote.scss";

export default function VoteSetting() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [allowVotePerUser, setAllowVotePerUser] = React.useState(5);
  const [allowVotePerItem, setAllowVotePerItem] = React.useState(5);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeVoteUser = (type) => {
    if (type === "add") {
      setAllowVotePerUser(allowVotePerUser + 1);
    } else if (type === "remove") {
      if (allowVotePerUser > 0) {
        setAllowVotePerUser(allowVotePerUser - 1);
      } else {
        toast.error(
          "تعداد رای‌های مجاز برای یک کاربر نمی‌تواند کمتر از 0 باشد",
          { position: toast.POSITION.BOTTOM_LEFT, rtl: true }
        );
      }
    }
  };

  const handleChangeVoteItem = (type) => {
    if (type === "add") {
      setAllowVotePerItem(allowVotePerItem + 1);
    } else if (type === "remove") {
      if (allowVotePerItem > 0) {
        setAllowVotePerItem(allowVotePerItem - 1);
      } else {
        toast.error(
          "تعداد رای‌های مجاز برای یک آیتم نمی‌تواند کمتر از 0 باشد",
          { position: toast.POSITION.BOTTOM_LEFT, rtl: true }
        );
      }
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="taskmodal-flexibale-icon">
      <ToastContainer />
      <Button
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
        <div className="taskmodal-smaller-button">تنظیمات</div>
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
          <div
            className="tm_attachments-body"
            style={{
              display: "flex",
              justifyContents: "space-between",
              flexDirection: "column",
              rowGap: "6px",
              alignContent: "center",
            }}
          >
            <div className="RetroReflect-vote-setting-perpar">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "3%",
                }}
              >
                تعداد رای‌های مجاز برای یک کاربر
              </div>
              <Button sx={{ display: "flex" }}>
                <AddIcon
                  onClick={() => handleChangeVoteUser("add")}
                  sx={{ color: "white", fontSize: "18px" }}
                />
              </Button>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "17px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {allowVotePerUser}
              </Typography>
              <Button sx={{ display: "flex" }}>
                <RemoveIcon
                  onClick={() => handleChangeVoteUser("remove")}
                  sx={{ color: "white", fontSize: "18px" }}
                />
              </Button>
            </div>
            <div className="RetroReflect-vote-setting-pertopic">
              <div style={{ display: "flex", alignItems: "center" }}>
                تعداد رای‌های مجاز برای یک موضوع
              </div>
              <Button sx={{ display: "flex" }}>
                <AddIcon
                  onClick={() => handleChangeVoteItem("add")}
                  sx={{ color: "white", fontSize: "18px" }}
                />
              </Button>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "17px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {allowVotePerItem}
              </Typography>
              <Button sx={{ display: "flex" }}>
                <RemoveIcon
                  onClick={() => handleChangeVoteItem("remove")}
                  sx={{ color: "white", fontSize: "18px" }}
                />
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
