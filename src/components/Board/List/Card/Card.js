import React, { useState, useEffect } from "react";
import "./Card.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Navigate, useNavigate } from "react-router-dom";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import { Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "../../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import TaskModal from "../../../TaskModal/TaskModal";
import { Modal, responsiveFontSizes } from "@mui/material";
import CardCover from "./Content/Body/Content/CardCover";
import CardTitle from "./Content/Body/Content/CardTitle";
import CardLabel from "./Content/Body/Content/CardLabel";
import CardHeader from "./Content/Header/CardHeader";
import { convertNumberToPersian } from "../../../../utilities/helpers";

const Card = ({ task, key, cardId, index, boardId, remID }) => {
  const [card, setCard] = useState(task);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [show, setShow] = useState(false);
  const [enable, setEnable] = useState(false);
  const [insideButton, setInsideButton] = useState(false);
  const [req, setReq] = useState(false);
  // const [cover, setCover] = useState(card.cover);
  const [update, setUpdate] = useState(false);

  useEffect(() => {}, []);
  // useEffect(() => {
  //   updateCard();
  // }, [update]);
  useEffect(() => {
    setCard(card);
    // setCover(cover);
  }, [card]);
  const handleModalOpen = (event) => {
    event.preventDefault();
    // event.stopPropagation();
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
    // setUpdate(!update);
    // setClick(!click);
  };
  const handleEditCardName = (e) => {
    e.stopPropagation();
    setShow(!show);
    setInsideButton(true);
    setEnable(!enable);
  };

  const disc = () => {
    let description = null;
    if (card.description == null) return null;
    if (card.description.length > 80) {
      description = card.description.substring(0, 79);
    }
    description = convertNumberToPersian(description);
    return description;
  };

  useEffect(() => {
    setOpen(false);
  }, [click, enable]);

  // useEffect(() => {
  // },[enable])

  // useEffect(() => {setOpen(false);}, [insideButton]);

  return (
    <>
      {/* <TaskModal cardId={cardId} boardId={boardId} /> */}
      <Modal
        open={open}
        onClose={handleModalClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TaskModal cardId={cardId} boardId={boardId} />
      </Modal>
      <Draggable draggableId={String(cardId)} index={index}>
        {(provided) => (
          <div
            className="card_container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={(event) => handleModalOpen(event)}
          >
            {/* {isPost ? <Loading /> : null} */}
            <ToastContainer autoClose={3000} style={{ fontSize: "1.2rem" }} />
            {/* <Modal
              open={open}
              onClose={handleModalClose}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <TaskModal cardId={cardId} boardId={boardId} />
            </Modal> */}
            <CardHeader cardId={cardId} />
            <div className="card_body">
              {card.cover !== "" && card.cover !== undefined && (
                <div className="card_cover">
                  <CardCover src={card.cover} />
                </div>
              )}
              <div
                className="card_title"
                onClick={(event) => {
                  if (enable) event.stopPropagation();
                }}
              >
                {show ? (
                  <CardTitle
                    enable={enable}
                    title={convertNumberToPersian(card.title)}
                  />
                ) : (
                  <p>{convertNumberToPersian(card.title)}</p>
                )}
              </div>
              {/* {disc() !== null && (
                <div className="card_disc">
                  <p>{disc()}...</p>
                </div>
              )} */}
            </div>
            {card.labels !== [] && (
              <div className="card_label">
                <CardLabel label={card.labels} />
              </div>
            )}
            <div className="card_footer">
              <div className="card_card-avatar">
                {card.doers !== [] && (
                  <AvatarGroup
                    max={5}
                    spacing="-1"
                    sx={{ direction: "ltr", border: "none" }}
                    className="card_avatar-container"
                  >
                    {card.doers.map((x) => (
                      <Tooltip title={x.first_name + " " + x.last_name}>
                        <Avatar
                          key={uuid()}
                          alt={x.first_name + " " + x.last_name}
                          src={x.profile_pic !== null ? x.profile_pic : "none"}
                          {...stringAvatar(x.first_name + " " + x.last_name)}
                          className="card_avatar-profile-picture"
                        />
                      </Tooltip>
                    ))}
                  </AvatarGroup>
                )}
              </div>
              <div className="card_footer-icon">
                {card.attachments_num !== 0 &&
                  card.attachments_num !== undefined && (
                    <div className="card_icon-container">
                      <AttachFileIcon className="card_default-footer-icon" />
                      <p className="card_icon-info">
                        {convertNumberToPersian(card.attachments_num)}
                      </p>
                    </div>
                  )}
                {/* {card.checklists_num !== 0 && (
                  <div>
                    {card.checked_checklists_num === card.checklists_num ? (
                      <div className="card_icon-container">
                        <CheckBoxOutlinedIcon className="card_default-footer-icon card_checklist-finish" />
                        <p className="card_icon-info ">
                          {convertNumberToPersian(card.checked_checklists_num)} /
                          {convertNumberToPersian(card.checklists_num)}
                        </p>
                      </div>
                    ) : (
                      <div className="card_icon-container">
                        <CheckBoxOutlinedIcon className="card_default-footer-icon" />
                        <p className="card_icon-info">
                          {convertNumberToPersian(card.checked_checklists_num)}/
                          {convertNumberToPersian(card.checklists_num)}
                        </p>
                      </div>
                    )}
                  </div>
                )} */}
                {card.comments_num !== 0 && card.comments_num !== undefined && (
                  <div className="card_icon-container">
                    <ChatBubbleIcon className="card_default-footer-icon" />
                    <p className="card_icon-info">
                      {convertNumberToPersian(card.comments_num)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
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
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

export default Card;
