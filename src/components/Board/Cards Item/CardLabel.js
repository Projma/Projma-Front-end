import * as React from "react";
import "../Styles/CardLabel.css";

const CardLabel = (props) => {
  return (
    <div
      className="card_item_label-main"
      style={{ backgroundColor: props.color }}
    ></div>
  );
};

export default CardLabel;
