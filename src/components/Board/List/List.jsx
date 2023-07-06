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
import AddCard from "./AddCard";
import DeleteListDialog from "./DeleteListDialog";

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
                <DeleteListDialog
                  isOpen={isOpen}
                  handleClose={handleClose}
                  handleDeleteList={handleDeleteList}
                />
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
                <AddIcon
                  o
                  sx={{
                    fontSize: "2.2rem",
                    color: getColor(theme.secondary),
                    ":hover": {
                      color: getColor(theme.primary),
                    },
                  }}
                />
              </div>
              <div className="list_header-option" onClick={optionClickHandler}>
                <MoreVertIcon
                  sx={{
                    fontSize: "2.2rem",
                    color: getColor(theme.secondary),
                    ":hover": {
                      color: getColor(theme.primary),
                    },
                  }}
                />
              </div>
            </div>
            {addCard && (
              <AddCard
                handleAddCardSubmit={handleAddCardSubmit}
                setCardName={setCardName}
                cardName={cardName}
              />
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
                        // backgroundColor: "red",
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
