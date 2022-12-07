import React, { useState, useRef } from "react";
import "../Styles/List.css";
import Card from "./Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";

// const cardInfo = [{ name: "test", id: uuid().toString() }];
let keycard = 0;

const List = (props) => {
  const [cards, setCards] = useState([
    { name: "1", id: "1" + props.name, order:0, list: props.id },
    { name: "2", id: "2" + props.name, order:1, list: props.id  },
    { name: "3", id: "3" + props.name, order:2, list: props.id  },
    { name: "4", id: "4" + props.name, order:3, list: props.id  },
  ]);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);

  const optionClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const optionsHandler = () => {
    setAnchorEl(null);
  };

  const clickHandler = (cards) => {
    setIsclicked(true);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const submitHandler = (event) => {
    event.preventDefault();
    setCards((pervList) => {
      return [...pervList, { name: inputName, id: keycard.toString() }];
    });
    setIsclicked(false);
    setInputName("");
    keycard++;
  };

  return (
    <div className="board_list">
      <div className="board_header">
        <p className="board_header-title">{props.name}</p>
        <button className="board_header-button" onClick={optionClickHandler}>
          <p className="board_button-title">...</p>
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={optionsHandler}
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
              <button className="board_option-button" onClick={clickHandler}>
                <p className="board_option-text">افزودن کارت</p>
              </button>
              <button className="board_option-button">
                <p className="board_option-text">حذف کردن لیست</p>
              </button>
            </div>
          </div>
        </Popover>
      </div>
      <Droppable droppableId={props.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{backgroundColor: snapshot.isDraggingOver ? '#163658' : '#0a1929', borderRadius: "0.5rem"}}
            className="board_card-list"
          >
            {cards.map((card, index) => (
              <Card name={card.name} key={card.id} id={card.id} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* <div className="board_space"></div> */}
      <div className="board_add-card">
        {!isclicked ? (
          <div className="board_add-button">
            <button className="board_add-card_button" onClick={clickHandler}>
              + افزودن کارت
            </button>
          </div>
        ) : (
          <div className="board_add-list-form">
            <form className="board_add-form-card" onSubmit={submitHandler}>
              <PerTextField>
                <StyledTextField
                  margin="normal"
                  label="اسم کارت"
                  variant="filled"
                  required
                  fullWidth
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="اسم کارت را در این بخش بنویسید"
                  sx={{backgroundColor: "#132F4C",border: "0.2rem solid #5090D3",borderRadius: "0.5rem"}}
                />
              </PerTextField>
              <button type="submit" className="board_form-button">
                افزودن
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
