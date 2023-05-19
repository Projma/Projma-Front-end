import { useEffect } from "react";
import List from "./List/List";
import "./Board.scss";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import InvitationHeader from "./temp/InvitationHeader/InvitationHeader";
import useBoard from "../../hooks/useBoard";
import tc from "../../Theme/theme";

const Board = () => {
  const { list, setList, getBoard, boardId, dnd } = useBoard();

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
      // </div>
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
        <Droppable droppableId={"kanban"} direction="horizontal" type="COLUMN" isCombineEnabled ignoreContainerClipping>
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
