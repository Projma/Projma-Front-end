import React, { useState, useEffect } from "react";
import "./Card.css";
import { Draggable } from "react-beautiful-dnd";
import TaskModal from "../../../TaskModal/TaskModal";
import { Modal } from "@mui/material";
import CardHeader from "./Content/Header/CardHeader";
import CardFooter from "./Content/Footer/CardFooter";
import CardBody from "./Content/Body/CardBody";
import useBoard from "../../../../hooks/useBoard";
import apiInstance from "../../../../utilities/axiosConfig";

const Card = ({ task, key, cardId, index, boardId }) => {
  const {getBoard} = useBoard();
  const [card, setCard] = useState(task);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);

  const handleModalOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };

  const handleModalClose = () => {
    getBoard();
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [click]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleModalClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <TaskModal cardId={cardId} boardId={boardId} />
      </Modal>
      <Draggable draggableId={String(cardId)} index={index}>
        {(provided) => (
          <div
            className="card_container"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={(event) => handleModalOpen(event)}
          >
            <CardHeader cardId={cardId} />
            <CardBody cover={card.cover} title={card.title} labels={card.labels}/>
            <CardFooter
              doers={card.doers}
              attachments_num={card.attachments_num}
              checklists_num={card.checklists_num}
              checked_checklists_num={card.checked_checklists_num}
              comments_num={card.comments_num}
            />
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Card;