import React, { useState, useEffect } from "react";
import List from "./List/List";
import "./Board.css";
import PerTextField from "../Shared/PerTextField";
import StyledTextField from "../Shared/StyledTextField";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import apiInstance from "../../utilities/axiosConfig";
import InvitationHeader from "./temp/InvitationHeader/InvitationHeader";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Loading from "../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/ReactToastify.css";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers.js";

const Board = (props) => {
  const [lists, setLists] = useState([]);
  const [req, setReq] = useState(false);

  useEffect(() => {
    const getBoard = async () =>
      await apiInstance
        .get(`workspaces/board/${props.boardId}/get-board-overview/`)
        .then((response) => {
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
    const draggableId = result.draggableId;
    const destination = result.destination;
    const source = result.source;
    if (!destination || !source) {
      return;
    }
    if (result.type === "list") {
      const newList = Array.from(lists);
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

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (result.type === "task") {
      const list = Array.from(lists);
      const tasklist = list.find((x) => x.id == source.droppableId);
      const task = tasklist.tasks.find((x) => x.id == draggableId);
      list.forEach((value) => {
        if (value.id == source.droppableId) {
          value.tasks.splice(source.index, 1);
        }
        if (value.id == destination.droppableId) {
          value.tasks.splice(destination.index, 0, task);
        }
      });
      setLists(list);
      apiInstance
        .patch(`workspaces/task/${result.draggableId}/move-task/`, {
          tasklist: destination.droppableId,
          order: destination.index + 1,
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
