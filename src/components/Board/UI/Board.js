import React, { useState } from "react";
import List from "./List";
import "../Styles/Board.css";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuid } from 'uuid';
import InvitationHeader from "../InvitationHeader/InvitationHeader";

let keylist = 1000;

// const reorder = (list, startIndex, endIndex)  => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// }

// const sort = (
//   droppableIdStart,
//   droppableIdEnd,
//   droppableIndexStart,
//   droppableIndexEnd,
//   droppableId
// ) => {
//   return {
//     type: "DRAG_HAPPEND",
//     payload: {
//       droppableIdStart,
//       droppableIdEnd,
//       droppableIndexStart,
//       droppableIndexEnd,
//       droppableId,
//     },
//   };
// };

const basekey = "list-"

const Board = () => {
  const [lists, setLists] = useState([
    { name: "test 1", id: basekey+1, order: 0 },
    { name: "test 2", id: basekey+2, order: 1 },
  ]);
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");
  const clickHandler = () => {
    setIsclicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setLists((pervList) => {
      return [...pervList, { name: inputName, id: uuid() }];
    });
    setIsclicked(false);
    setInputName("");
    console.log(lists);
  };

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  // const onDragEnd = result => {
  //   if (!result.destination) {
  //     return;
  //   }
  //   if (result.source.index === result.destination.index) {
  //     return;
  //   }

  //   const newItems = reorder(
  //     lists,
  //     result.source.index,
  //     result.destination.index
  //   );
  //   setLists(newItems);
  // }

  return (
    <>
    <InvitationHeader/>
    <div className="board_list-container font-fix">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, lists, setLists)}
      >
        <div className="board_list-container-minor">
          {lists.map((list) => (
            <List name={list.name} key={list.id} id={list.id} />
          ))}
        </div>
      </DragDropContext>
      <div className="board_add-container">
        {!isclicked ? (
          <div className="board_add-button">
            <button className="board_add-list-button" onClick={clickHandler}>
              <p className="board_add-list-button-title">+ ایجاد لیست</p>
            </button>
          </div>
        ) : (
          <div className="board_add-list-form">
            <form className="board_add-form" onSubmit={submitHandler}>
              <PerTextField>
                <StyledTextField
                  margin="normal"
                  label="اسم لیست"
                  variant="filled"
                  required
                  fullWidth
                  onChange={(e) => setInputName(e.target.value)}
                  placeholder="اسم لیست را در این بخش بنویسید"
                  sx={{backgroundColor: "#132F4C",border: "0.2rem solid #5090D3",borderRadius: "0.5rem"}}
                />
              </PerTextField>
              <button type="submit" className="board_form-button">
                افزودن
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Board;
