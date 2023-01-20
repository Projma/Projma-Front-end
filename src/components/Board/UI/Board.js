import React, { useState, useEffect } from "react";
import List from "./List";
import "./Styles/Board.css";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import apiInstance from "../../../utilities/axiosConfig";
import InvitationHeader from "../InvitationHeader/InvitationHeader";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Loading from "../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/ReactToastify.css";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../../utilities/helpers.js";

const Board = (props) => {
  const [lists, setLists] = useState([]);
  const [req, setReq] = useState(false);
  let data;
  // const [isclicked, setIsclicked] = useState(false);
  // const [inputName, setInputName] = useState("");
  // const [isPost, setReq] = useState(true);
  // const [isFail, setIsFail] = useState(false);

  // useEffect(() => {
  //   getBoard();
  // }, []);

  // useEffect(() => {
  //   getBoard();
  //   return () => {
  //     setLists([]);
  //   };
  // }, []);

  // useEffect(() => {
  //   setLists(lists.sort((a, b) => b.order - a.order));
  // }, [lists]);

  useEffect(() => {
    //console.log("useEffect");
    const getBoard = async () =>
      await apiInstance
        .get(`workspaces/board/${props.boardId}/get-board-overview/`)
        .then((response) => {
          // //console.log(response.data);
          // //console.log(response.data.tasklists);
          //console.log(props.boardId);
          //console.log(response.data.tasklists);
          response.data.tasklists.map((list) => {
            list.tasks.sort((a, b) => a.order - b.order);
          });
          setLists(response.data.tasklists.sort((a, b) => b.order - a.order));
        })
        .finally(() => {
          setReq(null);
        });
    getBoard();
    setReq(null);
    // //console.log(lists);
  }, []);

  const handleReq = () => {
    setReq(!req);
  };

  const handleCreateList = (data) => {
    setLists((pervlists) => [data, ...pervlists]);
  };

  const handleRemoveList = (id) => {
    setLists(lists.filter((lists) => lists.id !== id));
  };

  const handleAddCardToList = (card, list_id) => {
    setLists(
      lists.map((list) => {
        if (list.id === list_id) {
          return {
            ...list,
            tasks: [...list.tasks, card],
          };
        }
        return list;
      })
    );
  };

  const dragHandler = (result) => {
    const destination = result.destination;
    const source = result.source;
    console.log(destination);
    console.log(source);
    //console.log("result ", result);
    // return;
    if (!destination || !source) {
      //console.log("hey");
      return;
    }
    if (result.type === "list") {
      const newList = Array.from(lists);
      console.log("@@@@@@@@@@@@@@@@@@@@@");
      console.log(lists);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      apiInstance
        .put(`workspaces/board/${props.boardId}/reorder-tasklists/`, {
          order: newList.map((list) => list.id).reverse(),
        })
        .then((response) => {
          setLists(newList);
        });
      return;
    }
    //console.log(result);

    //console.log("destination ", destination);
    //console.log("source ", source);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      //console.log("in self position");
      return;
    }
    const start = lists.find(
      (list) => list.id === parseInt(source.droppableId)
    );
    const finish = lists.find(
      (list) => list.id === parseInt(destination.droppableId)
    );
    //console.log("shoroo");
    //console.log(start);
    //console.log(finish);
    if (start === finish) {
      apiInstance
        .patch(`workspaces/task/${result.draggableId}/move-task/`, {
          tasklist: destination.droppableId,
          order: destination.index + 1,
        })
        .then((response) => {
          //console.log(response.data);
          const newTasks = Array.from(start.tasks);
          //console.log(newTasks);
          // //console.log(newTasks[0]);
          let temp = newTasks[source.index];
          // //console.log(source.index);
          // //console.log(temp);
          newTasks.splice(source.index, 1);
          newTasks.splice(destination.index, 0, temp);
          //console.log(newTasks);
          const newStart = {
            ...start,
            tasks: newTasks,
          };
          //console.log(newStart);
          const newState = lists.map((list) => {
            if (list.id === newStart.id) {
              return newStart;
            }
            return list;
          });
          //console.log(newState);
          setLists(newState);
          return;
        });
    } else {
      //console.log("cos");
      //console.log(finish.tasks);
      apiInstance
        .patch(`workspaces/task/${result.draggableId}/move-task/`, {
          tasklist: destination.droppableId,
          order: destination.index + 1,
        })
        .then((response) => {
          //console.log(response);
          const startTasks = Array.from(start.tasks);
          const finishTasks = Array.from(finish.tasks);
          const [removed] = startTasks.splice(source.index, 1);
          finishTasks.splice(destination.index, 0, removed);
          // //console.log("33333333333333333333333333333333333333333333333333");
          //console.log(finishTasks);
          const newStart = {
            ...start,
            tasks: startTasks,
          };
          const newFinish = {
            ...finish,
            tasks: finishTasks,
          };
          const newState = lists.map((list) => {
            if (list.id === newStart.id) {
              return newStart;
            }
            if (list.id === newFinish.id) {
              return newFinish;
            }
            return list;
          });
          //console.log(newState);
          setLists(newState);
          return;
        });
    }
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <InvitationHeader
        board_id={props.boardId}
        onCreateList={handleCreateList}
        setLists={setLists}
      />
      <div className="styled-scrollbars">
        {/* {isPost ? <Loading /> : null} */}
        {/* {isFail ? ( */}
        {/*   <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} /> */}
        {/* ) : null} */}
        <Droppable
          droppableId={uuid().toString()}
          type="list"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              className="board_list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <div
                  className="board_list-container-box"
                  style={
                    snapshot.draggingOverWith
                      ? {
                          backgroundColor: "var(--main-bg)",
                          borderRadius: "0.5rem",
                        }
                      : null
                  }
                >
                  <List
                    name={list.title}
                    key={list.id}
                    id={list.id}
                    index={index}
                    card={list.tasks}
                    boardId={props.boardId}
                    onReq={handleReq}
                    remId={handleRemoveList}
                    addCardToList={handleAddCardToList}
                  />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
