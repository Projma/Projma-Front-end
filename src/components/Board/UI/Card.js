import React, { useState, useEffect } from "react";
import "./Styles/Card.css";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loading from "../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import apiInstance from "../../../utilities/axiosConfig";
import TaskModal from "../../TaskModal/TaskModal";
import { Modal, responsiveFontSizes } from "@mui/material";
import CardCover from "../Cards Item/CardCover";
import CardTitle from "../Cards Item/CardTitle";
import CardLabel from "../Cards Item/CardLabel";

const Card = ({
  boardId,
  remID,
  index,
  cardId,
  attachments_num,
  doers,
  checklists_num,
  checked_checklists_num,
  comments_num,
}) => {
  let cardInfo;
  const [card, setCard] = useState({});
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [enable, setEnable] = useState(false);
  const [insideButton, setInsideButton] = useState(false);
  const [req, setReq] = useState(false);
  const [cover, setCover] = useState("");
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getCard();
    setUpdate(!update);
    return setCard({});
  }, []);

  const getCard = () => {
    apiInstance
      .get(`workspaces/task/${cardId}/get-task/`)
      .then((response) => setCard(response.data));
  };
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
    setClick(!click);
  };
  const handleEditCardName = (e) => {
    e.stopPropagation();
    setInsideButton(true);
    setEnable(!enable);
  };

  const handleDeleteCard = (e) => {
    e.stopPropagation();
    reqDeleteCard(cardId);
  };

  const findCover = () => {
    const attach = card.attachments;
    if (attach !== undefined) {
      attach.every((x) => {
        console.log(x);
        let file = x.file.split("attachments/")[1];
        file = file.split(".")[1];
        if (file === "png" || file === "jpeg" || file === "jpg") {
          console.log(file);
          setCover(x.file);
          return false;
        }
        console.log(cover);
      });
    }
    return cover !== "";
  };

  const disc = () => {
    let description = null;
    if (card.description == null) return null;
    if (card.description.length > 80) {
      description = card.description.substring(0, 79);
    }
    return description;
  };

  useEffect(() => {
    setOpen(false);
  }, [click, enable]);

  // useEffect(() => {
  // },[enable])

  // useEffect(() => {setOpen(false);}, [insideButton]);

  const reqDeleteCard = (id) =>
    apiInstance
      .delete(`workspaces/task/${id}/`)
      .then(() => {
        toast.success("کارت با موفقیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.BOTTOM_LEFT,
            rtl: true,
          });
        }
      })
      .finally(() => {
        // setIsPost(null);
        console.log("reqDeleteCard Done");
        remID(cardId);
        // props.onPost(true);
      });

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
            <div className="card_header">
              <div
                className="card_close-icon"
                onClick={(event) => handleDeleteCard(event)}
              >
                <CloseIcon sx={{ fontSize: "1.6rem" }} />
              </div>
              <div
                className="card_edit-icon"
                onClick={(event) => handleEditCardName(event)}
              >
                <EditIcon sx={{ fontSize: "1.6rem" }} />
              </div>
            </div>
            <div className="card_body">
              {findCover() && (
                <div className="card_cover">
                  <CardCover src={cover} />
                </div>
              )}
              <div
                className="card_title"
                onClick={(event) => {
                  if (enable) event.stopPropagation();
                }}
              >
                <CardTitle enable={enable} title={card.title} />
              </div>
              {disc() !== null && (
                <div className="card_disc">
                  <p>{disc()}...</p>
                </div>
              )}
              {card.labels !== [] && (
                <div className="card_label">
                  <CardLabel label={card.labels} />
                </div>
              )}
              <div className="board_footer">
                <div className="board_card-avatar">
                  {doers !== [] && (
                    <AvatarGroup
                      max={5}
                      spacing="-1"
                      sx={{ direction: "ltr", border: "none" }}
                      className="board_avatar-container"
                    >
                      {doers.map((x) => (
                        <Tooltip title={x.first_name + " " + x.last_name}>
                          <Avatar
                            key={uuid()}
                            alt={x.first_name + " " + x.last_name}
                            src={
                              x.profile_pic !== null ? x.profile_pic : "none"
                            }
                            {...stringAvatar(x.first_name + " " + x.last_name)}
                            className="board_avatar-profile-picture"
                          />
                        </Tooltip>
                      ))}
                    </AvatarGroup>
                  )}
                </div>
                <div className="board_footer-icon">
                  {attachments_num !== 0 && (
                    <div className="board_icon-container">
                      <AttachFileIcon className="board_default-footer-icon" />
                      <p className="board_icon-info">{attachments_num}</p>
                    </div>
                  )}
                  {checklists_num !== 0 && (
                    <div>
                      {checked_checklists_num === checklists_num ? (
                        <div className="board_icon-container">
                          <CheckBoxOutlinedIcon className="board_default-footer-icon board_checklist-finish" />
                          <p className="board_icon-info ">
                            {checked_checklists_num}/{checklists_num}
                          </p>
                        </div>
                      ) : (
                        <div className="board_icon-container">
                          <CheckBoxOutlinedIcon className="board_default-footer-icon" />
                          <p className="board_icon-info">
                            {checked_checklists_num}/{checklists_num}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                  {comments_num !== 0 && (
                    <div className="board_icon-container">
                      <ChatBubbleIcon className="board_default-footer-icon" />
                      <p className="board_icon-info">{comments_num}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {disc() !== null && <div className="card_disc">
              <p>{disc()}...</p>
            </div>}
            {card.labels !== [] && <div className="card_label">
              <CardLabel label={card.labels}/>
            </div>}
            <div className="card_footer">
              <div className="card_card-avatar">
                {doers !== [] && (
                  <AvatarGroup
                    max={5}
                    spacing="-1"
                    sx={{ direction: "ltr", border: "none" }}
                    className="card_avatar-container"
                  >
                    {doers.map((x) => (
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
                {attachments_num !== 0 && (
                  <div className="card_icon-container">
                    <AttachFileIcon className="card_default-footer-icon" />
                    <p className="card_icon-info">{attachments_num}</p>
                  </div>
                )}
                {checklists_num !== 0 && (
                  <div>
                    {checked_checklists_num === checklists_num ? (
                      <div className="card_icon-container">
                        <CheckBoxOutlinedIcon className="card_default-footer-icon card_checklist-finish" />
                        <p className="card_icon-info ">
                          {checked_checklists_num}/{checklists_num}
                        </p>
                      </div>
                    ) : (
                      <div className="card_icon-container">
                        <CheckBoxOutlinedIcon className="card_default-footer-icon" />
                        <p className="card_icon-info">
                          {checked_checklists_num}/{checklists_num}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {comments_num !== 0 && (
                  <div className="card_icon-container">
                    <ChatBubbleIcon className="card_default-footer-icon" />
                    <p className="card_icon-info">{comments_num}</p>
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
