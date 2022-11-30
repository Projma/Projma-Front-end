import React from "react";
import "../Styles/Card.css";
import "../../styles/FontFix.css";

const Card = (props) => {
  return (
    <div className="card font-fix">
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
