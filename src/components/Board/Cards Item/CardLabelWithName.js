import * as React from "react";
import "../Styles/CardLabel.css";

const CardLabelWithName = (props) => {
  return (
    <div className="Card_item_label-with-name" onClick={() => props.onClick()} style={{backgroundColor: props.color + "77"}}>
      <div className="card_item_label-color-ball" style={{ backgroundColor: props.color }}></div>
      <p className="card_item_label-name">{props.name}</p>
    </div>
  );
};

export default CardLabelWithName;

//`rgba(${props.color},0.8)`