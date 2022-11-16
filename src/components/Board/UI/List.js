import React, { useState, useRef } from "react";
import "../Styles/List.css";
import Card from "./Card";

const cardInfo = [];

const List = (probs) => {
  const [cards, setCards] = useState(cardInfo);
  const clickHandler = (cards) => {
    setCards((prevLists) => {
      return [cards, ...prevLists];
    });
  };
  return (
    <div className="list">
      <div className="header">
        <p className="header-title">اسم</p>
        <button className="header-button">
          <p className="button-title">...</p>
        </button>
      </div>
      <div className="card-list">
        {cards.map(() => (
          <Card />
        ))}
      </div>
      {/* <div className="space"></div> */}
      <div className="add-card">
        <button className="add-card-button" onClick={clickHandler}>
          + افزودن کارت
        </button>
      </div>
    </div>
  );
};

export default List;
