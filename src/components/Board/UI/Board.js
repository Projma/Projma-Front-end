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

const Board = (props) => {
  const [lists, setLists] = useState([]);
  // const [isclicked, setIsclicked] = useState(false);
  // const [inputName, setInputName] = useState("");
  // const [isPost, setIsPost] = useState(true);
  // const [isFail, setIsFail] = useState(false);

  useEffect(() => {
    apiInstance
        .get(`workspaces/board/${props.boardId}/get-board-overview/`)
        .then((response) => {
          // console.log(response.data);
          // console.log(response.data.tasklists);
          console.log(props.boardId);
          setLists(response.data.tasklists);
        })
        .finally(() => {
          // setIsPost(null);
          console.log(lists);
        });
  }, []);

  // const postCreateList = async (data, id) =>
  //   await apiInstance
  //     .post(`workspaces/board/${id}/create-tasklist/`, data)
  //     .then(() => {
  //       setIsFail(true);
  //       toast.success("لیست با موفقیت ساخته شد", {
  //         position: toast.POSITION.TOP_CENTER,
  //         rtl: true,
  //       });
  //     })
  //     .catch((error) => {
  //       if (error.response.status === 404) {
  //         setIsFail(true);
  //         toast.error("عملیات با خطا مواجه شد", {
  //           position: toast.POSITION.TOP_CENTER,
  //           rtl: true,
  //         });
  //       }
  //     })
  //     .finally(() => {
  //       setIsPost(null);
  //     });

  // const submitHandler = (event) => {
  //   event.preventDefault();
  //   // setLists((pervList) => {
  //   //   return [...pervList, { name: inputName, id: uuid() }];
  //   // });
  //   const data = new FormData();
  //   data.append("title", inputName);
  //   setIsPost(true);
  //   postCreateList(data, props.boardId);
  //   setIsclicked(false);
  //   setInputName("");
  //   // console.log(lists);
  // };

  const dragHandler = (result) => {
    // const [destination, source, draggableId, type] = result;
    // if (!destination) return;
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <InvitationHeader board_id={props.boardId} />
      <div>
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
              <div className="board_list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.isUsingPlaceholder
                    ? {
                        backgroundColor: "var(--hover-color)",
                        borderRadius: "0.5rem",
                      }
                    : null
                }
              >
                {lists.slice(0).reverse().map((list, index) => (
                  <div className="board_list-container-box">
                  <List
                    name={list.title}
                    key={list.id}
                    id={list.id}
                    index={index}
                    card={list.tasks}
                    boardId={props.boardId}
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
