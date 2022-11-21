import * as React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./Board.css";
import BoardView from "./BoardView";

const Board = () => {
  return (
    <div className="board">
      <div className="board-header">
        <DashboardIcon/>
        <p className="board-header-title">برد ها</p>
      </div>
      <div className="board-body">
        <div className="board-body-list">
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
          <BoardView/>
        </div>
      </div>
    </div>
  );
};

export default Board;
