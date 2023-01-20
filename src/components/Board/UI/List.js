import React, { useState, useEffect } from "react";
import "./Styles/List.css";
import Card from "./Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Loading from "../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputName from "../../Shared/InputName";
import apiInstance from "../../../utilities/axiosConfig";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { convertNumberToPersian, convertNumberToEnglish } from "../../../utilities/helpers.js";

const List = (props) => {
  const [cards, setCards] = useState(props.card);
  const [addCard, setAddCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [listName, setListName] = useState(props.name);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [req, setReq] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setCards(props.card);
  }, []);

  useEffect(() => {
    setCards(props.card);
  }, [props]);
  const reqCreateCard = async (data, id) =>
    await apiInstance
      .post(`/workspaces/tasklist/${id}/create-task/`, data)
      .then((response) => {
        toast.success("کارت با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        setCards((pervCards) => [...pervCards, response.data]);
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
        setReq(null);
        //console.log("reqCreateCard Done");
      });

  const reqDeleteList = async (id) =>
    await apiInstance
      .delete(`workspaces/tasklist/${id}/delete-tasklist/`)
      .then(() => {
        toast.success("لیست با موفقیت حذف شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
        props.remId(id);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setReq(null);
        //console.log("reqDeleteList Done");
      });

  const reqEditListName = async (data, id, name) => {
    name = convertNumberToPersian(name);
    await apiInstance
      .patch(`workspaces/tasklist/${id}/update-tasklist/`, data)
      .then(() => {
        toast.success("اسم لیست با موفقیت عوض شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
        setListName(name);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setReq(null);
      });
  }

  const addCardClickHandler = () => {
    setAddCard(!addCard);
  };
  const optionClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemoveCard = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    setAddCard(!addCard);
    setReq(true);
    const data = new FormData();
    data.append("title", cardName);
    reqCreateCard(data, props.id);
    setCardName("");
  };

  const handleChangeListName = (name) => {
    name = convertNumberToPersian(name);
    // alert(name);
    setListName(name);
    const data = new FormData();
    data.append("title", name);
    setReq(true);
    reqEditListName(data, props.id, name);
  };

  const handleDeleteList = () => {
    setReq(true);
    reqDeleteList(props.id);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOption = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={String(props.id) + props.name} index={props.index}>
      {(provided) => (
        <div
          className="list_container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {req ? <Loading /> : null}
          <ToastContainer autoClose={3000} style={{ fontSize: "1.2rem" }} />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleOption}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="board_option">
              <p className="board_option-text board_option-title">
                فهرست اقدامات لیست
              </p>
              <div className="board_option-button-container">
                <button
                  className="board_option-button"
                  onClick={addCardClickHandler}
                >
                  <p className="board_option-text">افزودن کارت</p>
                </button>
                <button
                  className="board_option-button"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <p className="board_option-text">حذف کردن لیست</p>
                </button>
                <Dialog
                  open={isOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"آیا از حذف کردن لیست مطمئن هستید؟"}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText
                      id="alert-dialog-description"
                      sx={{ color: "#fff" }}
                    >
                      اخطار: با حذف کردن لیست تمام کارت های داخل آن نیز حذف
                      میشود
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <div className="List_dialog-button-container">
                      <Button
                        type="button"
                        variant="contained"
                        onClick={() => {
                          handleDeleteList();
                        }}
                        className="List_dialog-button"
                      >
                        تایید
                      </Button>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={handleClose}
                        autoFocus
                        className="List_dialog-button"
                      >
                        انصراف
                      </Button>
                    </div>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </Popover>
          <div className="list_header-container">
            <div className="list_header">
              <div className="list_header-title">
                <InputName
                  name={convertNumberToPersian(listName)}
                  // value={listName}
                  onChangeName={handleChangeListName}
                />
              </div>
              <div
                className="list_header-add-card"
                onClick={addCardClickHandler}
              >
                <AddIcon o sx={{ fontSize: "2.2rem" }} />
              </div>
              <div className="list_header-option" onClick={optionClickHandler}>
                <MoreVertIcon sx={{ fontSize: "2.2rem" }} />
              </div>
            </div>
            {addCard && (
              <div className="list_add-card">
                <form
                  className="list_add-card-form"
                  onSubmit={(e) => handleAddCardSubmit(e)}
                >
                  <PerTextField>
                    <StyledTextField
                      margin="normal"
                      label="اسم کارت"
                      variant="filled"
                      required
                      fullWidth
                      autoFocus
                      onChange={(e) => setCardName(convertNumberToPersian(e.target.value))}
                      value={cardName}
                      placeholder="اسم کارت را در این بخش بنویسید"
                      InputProps={{
                        disableUnderline: true,
                        style: {
                          // height: "50px",
                          // padding: "0 14px",
                          fontFamily: "Vazir",
                          // fontSize: "1.7rem",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontFamily: "Vazir",
                          // fontSize: "1.6rem",
                        },
                      }}
                      sx={{
                        backgroundColor: "var(--main-item-color)",
                        borderBottom: "0.2rem solid var(--minor-item-color)",
                        borderRadius: "0.5rem",
                        // borderRadius: "0.5rem",
                        "& input::placeholder": {
                          fontSize: "1.2rem",
                        },
                        margin: 0,
                      }}
                    />
                  </PerTextField>
                  <Button type="submit" variant="contained">
                    افزودن
                  </Button>
                </form>
              </div>
            )}
          </div>
          <Droppable droppableId={String(props.id)}>
            {(provided, snapshot) => (
              <div
                className="list_card-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.draggingOverWith
                    ? {
                      backgroundColor: "var(--hover-color)",
                      borderRadius: "0.5rem",
                    }
                    : null
                }
              >
                {cards.map((card, index) => (
                  <Card
                    key={card.id}
                    cardId={card.id}
                    index={index}
                    boardId={props.boardId}
                    remID={handleRemoveCard}
                    attachments_num={card.attachments_num}
                    doers={card.doers}
                    checklists_num={card.checklists_num}
                    checked_checklists_num={card.checked_checklists_num}
                    comments_num={card.comments_num}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
