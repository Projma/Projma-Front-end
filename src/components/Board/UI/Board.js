import React, { useState } from "react";
import List from "./List";
import "../Styles/Board.css";
import "../Styles/Add.css";
import PerTextField from "./PerTextField";
import StyledTextField from "../../Password/StyledTextField";

const Board = () => {
  const [lists, setLists] = useState([]);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName,setInputName] = useState("");

  const clickHandler = () => {
    setIsclicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLists((pervList) => {
      return [...pervList, { name: inputName, ket: Math.random().toString() }];
    });
    setIsclicked(false);
    setInputName("");
  };

  return (
    <div className="list-container">
      <div className="list-container-minor">
        {lists.map((list) => (
          <List name={list.name} key={list.key} />
        ))}
      </div>
      <div className="add-container">
        {!isclicked ? (
          <div className="add-button">
            <button className="add-list-button" onClick={clickHandler}>
              <p className="add-list-button-title">+ ایجاد لیست</p>
            </button>
          </div>
        ) : (
          <div className="add-list-form">
            <form className="add-form" onSubmit={submitHandler}>
              <PerTextField>
                <StyledTextField
                  margin="normal"
                  label="اسم لیست"
                  variant="outlined"
                  required
                  fullWidth
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="اسم لیست را در این بخش بنویسید"
                  sx={{mt:1}}
                />
              </PerTextField>
              <button type="submit" className="form-button">
                افزودن
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;
