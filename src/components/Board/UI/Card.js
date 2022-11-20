import React from "react";
import "../Styles/Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-title">
        <p className="title">{props.name}</p>
      </div>
      <div className="card-avatar">
        <img
          className="avatar"
          src={require("../../../static/images/temp project picture/simurgh.jpg")}
          alt="avatar picture"
        />
      </div>
    </div>
  );
};

export default Card;
