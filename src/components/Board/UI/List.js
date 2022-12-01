import React, { useState, useRef } from "react";
import "../Styles/List.css";
import Card from "./Card";
import PerTextField from "./PerTextField";
import StyledTextField from "../../Password/StyledTextField";

const cardInfo = [];

const List = (props) => {
  const [cards, setCards] = useState(cardInfo);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");

  const clickHandler = (cards) => {
    setIsclicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setCards((pervList) => {
      return [...pervList, { name: inputName, ket: Math.random().toString() }];
    });
    setIsclicked(false);
    setInputName("");
  };

  return (
    <div className="board_list">
      <div className="board_header">
        <p className="board_header-title">{props.name}</p>
        <button className="board_header-button">
          <p className="board_button-title">...</p>
        </button>
      </div>
      <div className="board_card-list">
        {cards.map((card) => (
          <Card name={card.name} key={card.key}/>
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
                  sx={{mt:0}}
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
