import React, { useState } from "react";
import "../Styles/Card.css";
import CardLabel from "../Cards Item/CardLabel";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Navigate, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

const Card = (props) => {
  const [showLabelName, setShowLabelName] = useState(false);
  let navigate = useNavigate();
  let outSideButton = false;
  // const [close, setClose] = useState(false);
  const cardClickHandker = () => {
    console.log("board");
    console.log("outside: ", outSideButton);
    // console.log("close: ",close);
    if (outSideButton) return;
    // navigate("/");
  };

  const cardDeleteHandler = () => {
    outSideButton = true;
    console.log("edit");
    console.log("outside: ", outSideButton);
    // console.log("close: ",close);
    navigate("/signup");
    // setOutSideButton(false);
  };

  const cardEditHandler = () => {
    outSideButton = true;
    console.log("close");
    console.log("outside: ", outSideButton);
    // console.log("close: ",close);
    navigate("/signin");
    // setOutSideButton(false);
  };

  return (
    <div
      className="board_card"
      onClick={() => {
        cardClickHandker();
      }}
    >
      <div className="board_icon_container">
        <div
          className="board_icon-box"
          onClick={() => {
            cardEditHandler();
          }}
        >
          <EditIcon className="board_edit-icon board_default-icon" />
        </div>
        <div
          className="board_icon-box"
          onClick={() => {
            cardDeleteHandler();
          }}
        >
          <CloseIcon className="board_close-icon board_default-icon" />
        </div>
      </div>
      {props.labels !== [] && (
        <div className="board_card-label">
          {props.labels.map((x) => (
            <CardLabel
              key={x.id}
              color={x.color}
              name={x.title}
              onClick={() => {
                outSideButton = true;
                setShowLabelName(!showLabelName);
              }}
              show={showLabelName}
            />
          ))}
        </div>
      )}
      <div className="board_card-title">
        {/* <InputName name={props.name} color="#212121"/> */}
        <p className="board_title">{props.name}</p>
      </div>
      <div className="board_footer">
        <div className="board_card-avatar">
          {props.members !== [] && (
            <AvatarGroup
              max={5}
              spacing="-1"
              sx={{ direction: "ltr", border: "none" }}
              className="board_avatar-container"
            >
              {props.members.map((x) => (
                <Tooltip title={x.first_name + " " + x.last_name}>
                  <Avatar
                    key={uuid()}
                    alt={x.first_name + " " + x.last_name}
                    src={x.profile_pic !== null ? x.profile_pic : "none"}
                    {...stringAvatar(x.first_name + " " + x.last_name)}
                    className="board_avatar-profile-picture"
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
          )}
        </div>
        <div className="board_footer-icon">
          {props.attachNum !== 0 && (
            <div className="board_icon-container">
              <AttachFileIcon className="board_default-footer-icon" />
              <p className="board_icon-info">{props.attachNum}</p>
            </div>
          )}
          {props.checkTotal !== 0 && (
            <div>
              {props.checkDone === props.checkTotal ? (
                <div className="board_icon-container">
                  <CheckBoxOutlinedIcon className="board_default-footer-icon board_checklist-finish" />
                  <p className="board_icon-info ">
                    {props.checkDone}/{props.checkTotal}
                  </p>
                </div>
              ) : (
                <div className="board_icon-container">
                  <CheckBoxOutlinedIcon className="board_default-footer-icon" />
                  <p className="board_icon-info">
                    {props.checkDone}/{props.checkTotal}
                  </p>
                </div>
              )}
            </div>
          )}
          {props.chatNum !== 0 && (
            <div className="board_icon-container">
              <ChatBubbleIcon className="board_default-footer-icon" />
              <p className="board_icon-info">{props.chatNum}</p>
            </div>
          )}
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
