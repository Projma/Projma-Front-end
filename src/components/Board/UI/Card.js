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

const label = [
  { name: "قرمز", color: "#d32f2f", id: 1 },
  { name: "آبی", color: "#42a5f5", id: 2 },
  { name: "صورتی", color: "#ab47bc", id: 3 },
  // { name: "org", color: "#f57c00", id: 4 },
  { name: "سبز", color: "#388e3c", id: 5 },
  // { name: "golden", color: "#ea80fc", id: 6 },
  { name: "زرد", color: "#ffff52", id: 7 },
];

const members = [
  {
    name: "vahid mohammadi",
    id: 1,
    avatar: "https://s6.uupload.ir/files/vm_k4cy.jpg",
  },
  {
    name: "mohammad osoolian",
    id: 2,
    avatar: null,
  },
  {
    name: "projma team",
    id: 3,
    avatar: "https://s6.uupload.ir/files/pm_e8i1.jpg",
  },
  {
    name: "temp person",
    id: 4,
    avatar: "https://s6.uupload.ir/files/ahm_osvs.jpg",
  },
  { name: "x x", id: 5, avatar: null },
  { name: "y y", id: 6, avatar: null },
  { name: "z z", id: 7, avatar: null },
];

const iconshow = { comment: 3, attach: 1, checkdone: 3, checktotal: 5 };

// const StyleTooltip = styled(({ className, ...props }) => (
//   <Tooltip {...props} classes={{ popper: className }} />
// ))(({ theme }) => ({
//   [`& .${tooltipClasses.tooltip}`]: {
//     backgroundColor: "#132F4C",
//     color: '#fff',
//     // boxShadow: theme.shadows[1],
//     border: "0.2rem solid #5090D3",
//   },
// }));

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
    <Draggable key={props.id} draggableId={props.id} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
            <div className="board_card-label">
              {label.map((x) => (
                <CardLabel
                  key={x.id}
                  color={x.color}
                  name={x.name}
                  onClick={() => {
                    outSideButton = true;
                    setShowLabelName(!showLabelName);
                  }}
                  show={showLabelName}
                />
              ))}
            </div>
            <div className="board_card-title">
              {/* <InputName name={props.name} color="#212121"/> */}
              <p className="board_title">{props.name}</p>
            </div>
            <div className="board_footer">
              <div className="board_card-avatar">
                <AvatarGroup
                  max={5}
                  spacing="medium"
                  sx={{ direction: "ltr", border: "none" }}
                  className="board_avatar-container"
                >
                  {members.map((x) => (
                    <Tooltip title={x.name}>
                      <Avatar
                        key={x.id}
                        alt={x.name}
                        src={x.avatar !== null ? x.avatar : "none"}
                        {...stringAvatar(x.name)}
                        className="board_avatar-profile-picture"
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </div>
              <div className="board_footer-icon">
                <div className="board_icon-container">
                  <AttachFileIcon className="board_default-footer-icon" />
                  <p className="board_icon-info">{iconshow.attach}</p>
                </div>
                <div>
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
        </div>
      )}
    </Draggable>
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
