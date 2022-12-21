import * as React from "react";
import "../UI/Styles/CardLabel.css";
import CardLabelWithName from "./CardLabelWithName";
import CardLabelWithoutName from "./CardLabelWithoutName";

const CardLabel = (props) => {
  return (
    <>
      {props.show ? (
        <CardLabelWithName onClick={() => props.onClick()} color={props.color} name={props.name}/>
      ) : (
        <CardLabelWithoutName onClick={() => props.onClick()} color={props.color}/>
      )}
    </>
  );
};

export default CardLabel;
