import React, { useEffect } from "react";
import List from "./List/List";
import "./Board.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InvitationHeader from "./temp/InvitationHeader/InvitationHeader";
import { v4 as uuid } from "uuid";
import "../../styles/ReactToastify.css";
import apiInstance from "../../utilities/axiosConfig";
import useBoard from "../../hooks/useBoard";

const Board = (props) => {
  const { list, setList, getBoard, boardId } = useBoard();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const rederList = () => {
    return list.map((list, index) => (
      <div className="board_list-container-box">
        <List
          name={list.title}
          key={list.id}
          id={list.id}
          index={index}
          task={list.tasks}
          boardId={boardId}
        />
      </div>
    ));
  };

  const handleCreateList = (data) => {
    setList((pervlist) => [data, ...pervlist]);
  };

  const dragHandler = (result) => {
    const draggableId = result.draggableId;
    const destination = result.destination;
    const source = result.source;
    if (!destination || !source) {
      return;
    }
    if (result.type === "list") {
      const newList = Array.from(list);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      apiInstance
        .put(`workspaces/board/${boardId}/reorder-tasklist/`, {
          order: newList.map((list) => list.id).reverse(),
        })
        .then((response) => {
          setList(newList);
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
      const newlist = Array.from(list);
      const tasklist = list.find((x) => x.id === source.droppableId);
      const task = tasklist.tasks.find((x) => x.id === draggableId);
      list.forEach((value) => {
        if (value.id === source.droppableId) {
          value.tasks.splice(source.index, 1);
        }
        if (value.id === destination.droppableId) {
          value.tasks.splice(destination.index, 0, task);
        }
      });
      setList(newlist);
      apiInstance.patch(`workspaces/task/${result.draggableId}/move-task/`, {
        tasklist: destination.droppableId,
        order: destination.index + 1,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <InvitationHeader
        board_id={boardId}
        onCreateList={handleCreateList}
        setList={setList}
      />
      <div className="styled-scrollbars">
        <Droppable
          droppableId={uuid().toString()}
          type="list"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div
                className="board_list-container"
                style={
                  snapshot.draggingOverWith
                    ? {
                        backgroundColor: "var(--main-bg)",
                        borderRadius: "0.5rem",
                      }
                    : null
                }
              >
                {rederList()}
              </div>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default Board;
