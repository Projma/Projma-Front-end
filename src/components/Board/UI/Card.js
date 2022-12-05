import React from "react";
import "../Styles/Card.css";
import CardLabel from "../Cards Item/CardLabel";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const label = [
  { name: "red", color: "#d32f2f", id: 1 },
  { name: "blue", color: "#42a5f5", id: 2 },
  { name: "pink", color: "#ab47bc", id: 3 },
  // { name: "org", color: "#f57c00", id: 4 },
  { name: "green", color: "#388e3c", id: 5 },
  // { name: "golden", color: "#ea80fc", id: 6 },
  { name: "gray", color: "#ffff52", id: 7 },
];

const iconshow = { comment: 3, attach: 1, checkdone: 5, checktotal: 5 };

const avatarStyle = {
  fontSize: "1.8rem",
  border: "none",
};

const Card = (props) => {
  let navigate = useNavigate();

  const cardClickHandker = () => {
    navigate("/");
  };

  const cardDeleteHandler = () => {};

  const cardEditHandler = () => {};

  return (
    <div className="board_card" onClick={cardClickHandker}>
      <div className="board_icon_container">
        <div className="board_icon-box" onClick={cardDeleteHandler}>
          <EditIcon className="board_edit-icon board_default-icon" />
        </div>
        <div className="board_icon-box" onClick={cardDeleteHandler}>
          <CloseIcon className="board_close-icon board_default-icon" />
        </div>
      </div>
      <div className="board_card-label">
        {label.map((x) => (
          <CardLabel key={x.id} color={x.color} />
        ))}
      </div>
      <div className="board_card-title">
        {/* <InputName name={props.name} color="#212121"/> */}
        <p className="board_title">{props.name}</p>
      </div>
      <div className="board_footer">
        <div className="board_card-avatar">
          <AvatarGroup
            max={4}
            spacing="0"
            sx={{ direction: "ltr", border: "none" }}
          >
            <Avatar
              alt="vahid mohammadi"
              src={require("../../../static/images/profile/vm.jpg")}
              sx={avatarStyle}
            />
            <Avatar
              alt="mmd osoolian"
              {...stringAvatar("mmd osoolian")}
              sx={avatarStyle}
            />
            <Avatar
              alt="vahid mohammadi"
              src={require("../../../static/images/profile/ahm.jpg")}
              sx={avatarStyle}
            />
            <Avatar
              alt="vahid mohammadi"
              src={require("../../../static/images/profile/pm.jpg")}
              sx={avatarStyle}
            />
            <Avatar
              alt="vahid mohammadi"
              src={require("../../../static/images/profile/pm.jpg")}
              sx={avatarStyle}
            />
          </AvatarGroup>
        </div>
        <div className="board_footer-icon">
          <div className="board_icon-container">
            <AttachFileIcon className="board_default-footer-icon" />
            <p className="board_icon-info">{iconshow.attach}</p>
          </div>
          <div >
            {iconshow.checkdone === iconshow.checktotal ? (
              <div className="board_icon-container">
                <CheckBoxOutlinedIcon className="board_default-footer-icon board_checklist-finish" />
                <p className="board_icon-info ">
                  {iconshow.checkdone}/{iconshow.checktotal}
                </p>
              </div>
            ) : (
              <div className="board_icon-container">
                <CheckBoxOutlinedIcon className="board_default-footer-icon" />
                <p className="board_icon-info">
                  {iconshow.checkdone}/{iconshow.checktotal}
                </p>
              </div>
            )}
          </div>
          <div className="board_icon-container">
            <ChatBubbleIcon className="board_default-footer-icon" />
            <p className="board_icon-info">{iconshow.comment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

export default Card;
