import React, { useState } from "react";
import List from "./List";
import AddList from "../AddComponents/AddList";
import "../Styles/Board.css";
import "../Styles/AddList.css";
import { ratingClasses } from "@mui/material";

const listInfo = [];

const Board = () => {
  const [lists, setLists] = useState(listInfo);

  const clickHandler = (lists) => {
    setLists((prevLists) => {
      return [lists, ...prevLists];
    });
  };

  return (
    <div className="list-container">
      <div className="list-container-minor">
        {lists.map(() => (
          <List />
        ))}
      </div>
      <div className="button-container">
        <button className="add-list-button" onClick={clickHandler}>
          <p className="add-list-button-title">+ ایجاد لیست</p>
        </button>
      </div>
      {/* <AddList onAddList={addListHandler} item={lists}/> */}
    </div>
  );
};

export default Board;
