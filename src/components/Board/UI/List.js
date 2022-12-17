import React, { useState, useEffect } from "react";
import "./Styles/List.css";
import Card from "./Card";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import Popover from "@mui/material/Popover";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import axios from "axios";
import Loading from "../../Shared/Loading";
import { toast, ToastContainer } from "react-toastify";
import "../../../styles/ReactToastify.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputName from "../../Shared/InputName";
import apiInstance from "../../../utilities/axiosConfig";

const List = (props) => {
  const [cards, setCards] = useState(props.card);
  // const reqCreateCard = async (data, id) =>
  //   await apiInstance
  //     .post(`workspaces/board/${id}/create-task/`, data)
  //     .then(() => {
  //       setIsToast(true);
  //       toast.success("کارت با موفقیت ساخته شد", {
  //         position: toast.POSITION.TOP_CENTER,
  //         rtl: true,
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404) {
  //         setIsToast(true);
  //         toast.error("عملیات با خطا مواجه شد", {
  //           position: toast.POSITION.TOP_CENTER,
  //           rtl: true,
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsPost(null);
  //       console.log("reqCreateCard Done");
  //       props.onPost(true);
  //     });

  // const reqDeleteList = async (id) =>
  //   await apiInstance
  //     .delete(`workspaces/tasklist/${id}/delete-tasklist/`)
  //     .then(() => {
  //       setIsToast(true);
  //       toast.success("لیست با موفقیت حذف شد", {
  //         position: toast.POSITION.TOP_CENTER,
  //         rtl: true,
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404) {
  //         setIsToast(true);
  //         toast.error("عملیات با خطا مواجه شد", {
  //           position: toast.POSITION.TOP_CENTER,
  //           rtl: true,
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsPost(null);
  //       console.log("reqDeleteList Done");
  //       props.onPost(true);
  //     });

  // const reqEditListName = async (data, id) =>
  //   await apiInstance
  //     .patch(`workspaces/tasklist/${id}/update-tasklist/`, data)
  //     .then(() => {
  //       setIsToast(true);
  //       toast.success("اسم لیست با موفقیت عوض شد", {
  //         position: toast.POSITION.TOP_CENTER,
  //         rtl: true,
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404) {
  //         setIsToast(true);
  //         toast.error("عملیات با خطا مواجه شد", {
  //           position: toast.POSITION.TOP_CENTER,
  //           rtl: true,
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsPost(null);
  //       props.onPost(true);
  //     });

  return (
    <Draggable draggableId={String(props.id)+props.name} index={props.index}>
      {(provided) => (
        <div
          className="list_container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* {isPost ? <Loading /> : null} */}
          {/* {isToast ? ( */}
          {/*   <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} /> */}
          {/* ) : null} */}
          <Droppable droppableId={String(props.id)}>
            {(provided, snapshot) => (
              <div
                className="board_card-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.draggingOverWith
                    ? {
                        backgroundColor: "var(--hover-color)",
                        borderRadius: "0.5rem",
                      }
                    : null
                }
              >
                {cards.map((card, index) => (
                  <Card
                    name={card.title}
                    key={card.id}
                    id={card.id}
                    index={index}
                    members={card.doers}
                    checkTotal={card.checklists_num}
                    checkDone={card.checked_checklists_num}
                    attachNum={card.attachments_num}
                    chatNum={card.comments_num}
                    labels={card.labels}
                    boardId={props.boardId}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
