import { useEffect, useRef, useState } from "react";
import List from "./List/List";
import "./Board.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InvitationHeader from "./temp/InvitationHeader/InvitationHeader";
import useBoard from "../../hooks/useBoard";
import tc from "../../Theme/theme";
// const [msgs, setMsgs] = useState([]);
// const [test, setTest] = useState(["salam"]);

const Board = () => {
  const { list, setList, getBoard, boardId, dnd, dnd_socket, socket } =
    useBoard();
  useEffect(() => {
    if (socket.current != null) {
      socket.current.onmessage = (event) => {
        console.log("khodaaaaaaaaaaaaaaaaaaaa");
        // console.log(list);
        // console.log(member);
        // setTest((prevState) => [...prevState, "hi"]);
        // console.log(test);
        // console.log(boardId);
        const message = JSON.parse(event.data);
        // setMsgs((prevState) => [...prevState, message]);
        // console.log(msgs);
        console.log("aaaaaaaaaaaaaaaaaaaaaa");
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
    socket.send(JSON.stringify({ type: "add_list", data }));
    setList((pervlist) => [data, ...pervlist]);
  };

  const dragHandler = (result) => {
    dnd(result, 1);
  };

  return (
    <div className="board_container styled-scrollbars">
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
                      backgroundColor: tc.secondry,
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
