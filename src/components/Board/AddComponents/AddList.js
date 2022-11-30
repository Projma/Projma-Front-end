import React, { useState } from "react";
import "../Styles/AddList.css";
import "../../styles/FontFix.css";

const AddList = (props) => {
  const clickHandler = () => {
    console.log("clicked");
    const newList = [
      ...props.item,
      {
        id: Math.random().toString(),
        title: Math.random().toString(),
      },
    ];
    // props.addListHandler(newList);
  };

  return (
    <div className="font-fix">
      <button className="add-list-button" onClick={clickHandler}>
        <p className="add-list-button-title">+ ایجاد لیست</p>
      </button>
    </div>
  );
};

export default AddList;
