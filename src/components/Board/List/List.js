import "./List.css";
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
import { convertNumberToPersian } from "../../../utilities/helpers.js";

const List = ({ task, name, id, index, boardId }) => {
  const { addCardToList, removeList, editListName, setIsReq } = useBoard();
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

  const reqCreateCard = async (data, id) =>
    await apiInstance
      .post(`/workspaces/tasklist/${id}/create-task/`, data)
      .then((response) => {
        //console.log(response.data);
        toast.success("کارت با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        addCardToList(response.data, id);
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

  const reqDeleteList = async (id) =>
    await apiInstance
      .delete(`workspaces/tasklist/${id}/delete-tasklist/`)
      .then(() => {
        toast.success("لیست با موفقیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        removeList(id);
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

  const reqEditListName = async (data, id, name) => {
    name = convertNumberToPersian(name);
    await apiInstance
      .patch(`workspaces/tasklist/${id}/update-tasklist/`, data)
      .then(() => {
        toast.success("اسم لیست با موفقیت عوض شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        editListName(id, name);
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
    reqCreateCard(data, id);
    setCardName("");
  };

  const handleChangeListName = (name) => {
    name = convertNumberToPersian(name);
    setListName(name);
    const data = new FormData();
    data.append("title", name);
    setIsReq(true);
    reqEditListName(data, id, name);
  };

  const handleDeleteList = () => {
    setIsReq(true);
    reqDeleteList(id);
    handleClose();
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOption = () => {
    setAnchorEl(null);
  };

  return (
    <Draggable draggableId={String(id) + name} index={index}>
      {(provided) => (
        <div
          className="list_container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
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
                  onChangeName={handleChangeListName}
                />
              </div>
              <div
                className="list_header-add-task"
                onClick={addCardClickHandler}
              >
                <AddIcon o sx={{ fontSize: "2.2rem" }} />
              </div>
              <div className="list_header-option" onClick={optionClickHandler}>
                <MoreVertIcon sx={{ fontSize: "2.2rem" }} />
              </div>
            </div>
            {addCard && (
              <div className="list_add-task">
                <form
                  className="list_add-task-form"
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
                          fontFamily: "Vazir",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          fontFamily: "Vazir",
                        },
                      }}
                      sx={{
                        backgroundColor: "var(--main-item-color)",
                        borderBottom: "0.2rem solid var(--minor-item-color)",
                        borderRadius: "0.5rem",
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
          <Droppable droppableId={String(id)} type="task">
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