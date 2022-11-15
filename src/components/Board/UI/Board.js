import React, { useState } from "react";
import List from "./List";
import AddList from "../AddComponents/AddList";
import "../Styles/Board.css";
import "../Styles/AddList.css";
import { ratingClasses } from "@mui/material";

const list_info = [];

const Board = () => {
  const [lists, setLists] = useState(list_info);

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
        <button className="add-list-button" onClick={clickHandler}>
          <p className="add-list-button-title">+ ایجاد لیست</p>
        </button>
      </div>
      {/* <AddList onAddList={addListHandler} item={lists}/> */}
    </div>
  );
};

export default Board;
