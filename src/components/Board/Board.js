import React from "react";
import List from "./List";
import "./Styles/Board.css";

const Board = () => {
  return (
    <div className="list-container">
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
        <List />
    </div>
  );
};

export default Board;
