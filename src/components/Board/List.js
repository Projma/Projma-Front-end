import React from "react";
import "./Styles/List.css"
import Card from "./Card";

const List = (probs) => {
  return (
    <div className="list">
      <div className="header">
        <p className="header-title">
          اسم
        </p>
        <button className="header-button">
          <p className="button-title">
            ...
          </p>
        </button>
      </div>
      <div className="card-list">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        {/* <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/> */}
      </div>
      {/* <div className="space"></div> */}
      <div className="add-card">
        <button className="add-card-button">+ افزودن کارت</button>
      </div>
    </div>
  );
}

export default List;