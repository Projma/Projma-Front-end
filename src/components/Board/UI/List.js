import React, { useState, useRef } from "react";
import "../Styles/List.css";
import "../Styles/Add.css";
import Card from "./Card";
import PerTextField from "./PerTextField";
import StyledTextField from "../../Password/StyledTextField";
import "../../styles/FontFix.css";

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
    <div className="list font-fix">
      <div className="header">
        <p className="header-title">{props.name}</p>
        <button className="header-button">
          <p className="button-title">...</p>
        </button>
      </div>
      <div className="card-list">
        {cards.map((card) => (
          <Card name={card.name} key={card.key}/>
        ))}
      </div>
      {/* <div className="space"></div> */}
      <div className="add-card">
        {!isclicked ? (
          <div className="add-button">
            <button className="add-card_button" onClick={clickHandler}>
              + افزودن کارت
            </button>
          </div>
        ) : (
          <div className="add-list-form">
            <form className="add-form" onSubmit={submitHandler}>
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
              <button type="submit" className="form-button">
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
