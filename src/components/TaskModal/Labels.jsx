import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./Labels.scss";

export default function Labels() {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
        <div className="taskmodal-smaller-button">لیبل</div>
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
        <div className="tm_labels-main-div">
          <header className="tm_labels-header">
            <h2 className="tm_labels-header-title">برچسب‌ها</h2>
            <Divider sx={{ backgroundColor: "black" }} />
          </header>
          <div className="tm_labels-div-inner">
            <ul className="tm_labels-ul">
              <li className="tm_labels-li">
                <div className="tm_labels-li-div flex">
                  <input type="checkbox" className="tm_labels-li-div-input" />
                  <span className="tm_labels-li-div-span flex">
                    <div className="tm_labels-li-color-box"></div>
                  </span>
                </div>
              </li>
              <li className="tm_labels-li">
                <div className="tm_labels-li-div flex">
                  <input type="checkbox" className="tm_labels-li-div-input" />
                  <span className="tm_labels-li-div-span flex">
                    <div
                      className="tm_labels-li-color-box"
                      // style={{ backgroundColor: "#000" + "77" }}
                    ></div>
                  </span>
                </div>
              </li>
              <li className="tm_labels-li">
                <div className="tm_labels-li-div flex">
                  <input type="checkbox" className="tm_labels-li-div-input" />
                  <span className="tm_labels-li-div-span flex">
                    <div
                      className="tm_labels-li-color-box"
                      // style={{ backgroundColor: "yellow" + "77" }}
                    ></div>
                  </span>
                </div>
              </li>
              <li className="tm_labels-li">
                <div className="tm_labels-li-div flex">
                  <input type="checkbox" className="tm_labels-li-div-input" />
                  <span className="tm_labels-li-div-span flex">
                    <div
                      className="tm_labels-li-color-box"
                      style={{ backgroundColor: "rgba(140, 10, 239, 0.60)" }}
                    ></div>
                  </span>
                </div>
              </li>
              <li className="tm_labels-li">
                <div className="tm_labels-li-div flex">
                  <input type="checkbox" className="tm_labels-li-div-input" />
                  <span className="tm_labels-li-div-span flex">
                    <div
                      className="tm_labels-li-color-box"
                      style={{ backgroundColor: "rgba(171,205,239,0.77)" }}
                    ></div>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
      </Popover>
    </div>
  );
}
