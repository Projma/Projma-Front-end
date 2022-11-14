import React from "react";
import "../Styles/Card.css";

const Card = () => {
  return (
    <div className="card">
      <div className="card-title">
        <p className="title">
          اسم
        </p>
      </div>
      <div className="card-avatar">
        <img className="avatar" src={require('../../../static/simurgh.jpg')} alt="avatar picture"/>
      </div>
    </div>
  );
}

export default Card;