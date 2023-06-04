import { useEffect, useRef, useState } from "react";
import List from "./List/List";
import "./Board.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InvitationHeader from "./temp/InvitationHeader/InvitationHeader";
import useBoard from "../../hooks/useBoard";
import useTheme from "../../hooks/useTheme";
// const [msgs, setMsgs] = useState([]);
// const [test, setTest] = useState(["salam"]);

const Board = () => {
  const { list, setList, getBoard, boardId, dnd, dnd_socket, socket } =
    useBoard();
  const { theme } = useTheme();
  useEffect(() => {
    if (socket.current != null) {
      socket.current.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);
        dnd_socket(message, message.type, socket);
      };
    }
  }, [list]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const rederList = () => {
    return list.map((list, index) => (
      // <div className="board_list-container-box" key={crypto.randomUUID()}>
      <List
        name={list.title}
        key={list.id}
        listId={list.id}
        index={index}
        task={list.tasks}
        boardId={boardId}
      />
    ));
  };

  const handleCreateList = (data) => {
    setList((pervlist) => [data, ...pervlist]);
    socket.current.send(
      JSON.stringify({ type: "create_tasklist", data: data })
    );
  };

  const dragHandler = (result) => {
    dnd(result, 1);
  };

  return (
    <div className="board_container ">
      <InvitationHeader
        board_id={boardId}
        onCreateList={handleCreateList}
        setList={setList}
      />
      <DragDropContext onDragEnd={dragHandler}>
        <Droppable
          droppableId={"kanban"}
          direction="horizontal"
          type="COLUMN"
          isCombineEnabled
          ignoreContainerClipping
        >
          {(provided, snapshot) => (
            <div
              className="board_list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={
                snapshot.isDraggingOver
                  ? {
                      display: "flex",
                      padding: "0 0.5rem 0 0.5rem",
                      overflow: "auto",
                      backgroundColor: theme.hover,
                      borderRadius: "0.5rem",
                    }
                  : null
              }
            >
              {rederList()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
