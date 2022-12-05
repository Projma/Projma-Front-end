import React, { useState, useRef } from "react";
import "../Styles/List.css";
import Card from "./Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";

const cardInfo = [{ name: "test" }];

const List = (props) => {
  const [cards, setCards] = useState(cardInfo);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

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
      return [...pervList, { name: inputName, key: Math.random().toString() }];
    });
    setIsclicked(false);
    setInputName("");
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
            <p className="board_option-text board_option-title">فهرست اقدامات لیست</p>
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
      <div className="board_card-list">
        {cards.map((card) => (
          <Card name={card.name} key={card.key} />
        ))}
      </div>
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
            <form className="board_add-form" onSubmit={submitHandler}>
              <PerTextField>
                <StyledTextField
                  margin="normal"
                  label="اسم کارت"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="اسم کارت را در این بخش بنویسید"
                  sx={{ mt: 0 }}
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
