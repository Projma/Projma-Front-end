import * as React from "react";
import "../Styles/CardLabel.css";

const CardLabelWithoutName = (props) => {
  return (
    <div className="card_item_label-main" style={{ backgroundColor: props.color }} onClick={() => props.onClick()}>
    </div>
  );
};

export default CardLabelWithoutName;