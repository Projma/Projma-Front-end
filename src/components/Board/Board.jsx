import { useEffect } from "react";
import List from "./List/List";
import "./Board.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InvitationHeader from "./temp/InvitationHeader/InvitationHeader";
import "../../styles/ReactToastify.css";
import apiInstance from "../../utilities/axiosConfig";
import useBoard from "../../hooks/useBoard";

const Board = () => {
  const { list, setList, getBoard, boardId, dnd } = useBoard();

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const rederList = () => {
    return list.map((list, index) => (
      <div className="board_list-container-box" key={crypto.randomUUID()}>
        <List
          name={list.title}
          key={list.id}
          listId={list.id}
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
    dnd(result);
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
          type="list"
          direction="horizontal"
        >
          {(provided, snapshot) => (
            <div
              className="board_list-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={
                snapshot.isUsingPlaceholder
                  ? {
                      backgroundColor: "var(--main-bg)",
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
