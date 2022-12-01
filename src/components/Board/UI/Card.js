import React from "react";
import "../Styles/Card.css";

const Card = (props) => {
  return (
    <div className="board_card">
      <div className="board_card-title">
        <p className="board_title">{props.name}</p>
      </div>
      <div className="board_card-avatar">
        <img
          className="board_avatar"
          src={require("../../../static/images/temp project picture/simurgh.jpg")}
          alt="avatar"
        />
      </div>
    </div>
  );
};

export default Card;
