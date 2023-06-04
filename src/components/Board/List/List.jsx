import "./List.scss";
import React, { useState, useEffect } from "react";
import useBoard from "../../../hooks/useBoard";
import Card from "./Card/Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { toast } from "react-toastify";
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
import { convertNumberToPersian } from "../../../utilities/helpers";
import useTheme from "../../../hooks/useTheme";

const List = ({ task, name, listId, index, boardId }) => {
  const { addCardToList, removeList, editListName, setIsReq, socket } =
    useBoard();
  const { theme, getColor } = useTheme();
  const [card, setCard] = useState(task);
  const [addCard, setAddCard] = useState(false);
  const [cardName, setCardName] = useState("");
  const [listName, setListName] = useState(name);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const open = Boolean(anchorEl);
  //const popover_id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setCard(task);
  }, [task]);

  const renderCard = () => {
    return card.map((value, index) => (
      <Card
        task={value}
        key={value.id}
        cardId={value.id}
        index={index}
        boardId={boardId}
      />
    ));
  };

  const reqCreateCard = async (data) =>
    await apiInstance
      .post(`task/${listId}/create-task/`, data)
      .then((response) => {
        //console.log(response.data);
        toast.success("کارت با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        addCardToList(response.data, listId, socket);
        // setCards((pervCards) => [...pervCards, response.data]);
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
        setIsReq(null);
        ////console.log("reqCreateCard Done");
      });

  const reqDeleteList = async () =>
    await apiInstance
      .delete(`board/tasklist/${listId}/delete-tasklist/`)
      .then(() => {
        toast.success("لیست با موفقیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        removeList(listId);
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
        setIsReq(null);
        ////console.log("reqDeleteList Done");
      });

  const reqEditListName = async (data, name) => {
    name = convertNumberToPersian(name);
    await apiInstance
      .patch(`board/tasklist/${listId}/update-tasklist/`, data)
      .then(() => {
        toast.success("اسم لیست با موفقیت عوض شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        editListName(listId, name);
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
        setIsReq(null);
      });
  };

  const addCardClickHandler = () => {
    setAddCard(!addCard);
  };

  const optionClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemoveCard = (id) => {
    setCard(card.filter((task) => task.id !== id));
  };

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    setAddCard(!addCard);
    setIsReq(true);
    const data = new FormData();
    data.append("title", cardName);
    reqCreateCard(data);
    setCardName("");
  };

  const handleChangeListName = (name) => {
    name = convertNumberToPersian(name);
    setListName(name);
    const data = new FormData();
    data.append("title", name);
    setIsReq(true);
    reqEditListName(data, name);
  };

  const handleDeleteList = () => {
    setIsReq(true);
    reqDeleteList();
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOption = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={`list:${listId}`} index={index}>
      {(provided, snapshot) => (
        <div
          className="list_container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          key={listId.toString()}
        >
          <Popover
            id={listId}
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
                      sx={{ color: getColor(theme.secondary) }}
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
                <AddIcon o sx={{ fontSize: "2.2rem",color: getColor(theme.secondary) }} />
              </div>
              <div className="list_header-option" onClick={optionClickHandler}>
                <MoreVertIcon sx={{ fontSize: "2.2rem",color: getColor(theme.secondary) }} />
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
                      onChange={(e) =>
                        setCardName(convertNumberToPersian(e.target.value))
                      }
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
                        backgroundColor: "$secondary",
                        borderBottom: "0.2rem solid $tertiary",
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
          <Droppable
            droppableId={`card_holder:${listId}`}
            direction="vertical"
            type="task"
            isCombineEnabled
            ignoreContainerClipping
          >
            {(provided, snapshot) => (
              <div
                className="list_card-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.draggingOverWith
                    ? {
                        backgroundColor: theme.hover,
                        borderRadius: "0.5rem",
                      }
                    : null
                }
              >
                {renderCard()}
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
