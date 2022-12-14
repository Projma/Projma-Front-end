import React, { useState, useEffect } from "react";
import List from "./List";
import "../Styles/Board.css";
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
  const [isclicked, setIsclicked] = useState(false);
  const [inputName, setInputName] = useState("");
  const [isPost, setIsPost] = useState(true);
  const [isFail, setIsFail] = useState(false);

  useEffect(() => {
    const getBoard = async () =>
      await apiInstance
        .get(`workspaces/board/${props.boardId}/get-board-overview/`)
        .then((response) => {
          // console.log(response.data);
          // console.log(response.data.tasklists);
          console.log(props.boardId);
          setLists(response.data.tasklists);
        })
        .finally(() => {
          setIsPost(null);
        });
    getBoard();
    setIsPost(null);
    // console.log(lists);
  }, [isPost]);

  const postCreateList = async (data, id) =>
    await apiInstance
      .post(`workspaces/board/${id}/create-tasklist/`, data)
      .then(() => {
        setIsFail(true);
        toast.success("لیست با موفقیت ساخته شد", {
          position: toast.POSITION.TOP_CENTER,
          rtl: true,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsFail(true);
          toast.error("عملیات با خطا مواجه شد", {
            position: toast.POSITION.TOP_CENTER,
            rtl: true,
          });
        }
      })
      .finally(() => {
        setIsPost(null);
      });

  const clickHandler = () => {
    setIsclicked(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // setLists((pervList) => {
    //   return [...pervList, { name: inputName, id: uuid() }];
    // });
    const data = new FormData();
    data.append("title", inputName);
    setIsPost(true);
    postCreateList(data, props.boardId);
    setIsclicked(false);
    setInputName("");
    // console.log(lists);
  };

  const onPostHandler = (isa) => {
    console.log("Board isa ",isa);
    setIsPost(isa);
  };

  const dragHandler = (result) => {
    const [destination, source, draggableId, type] = result;
    if (!destination) return;
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <InvitationHeader board_id={props.boardId} />
      <div className="board_list-container">
        {isPost ? <Loading /> : null}
        {isFail ? (
          <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} />
        ) : null}
        {/* <div className="Board_list-container-dir"> */}
          <Droppable
            droppableId={uuid().toString()}
            type="list"
            direction="horizontal"
          >
            {(provided, snapshot) => (
              <div
                className="board_list-container-box"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={
                  snapshot.isUsingPlaceholder
                    ? {
                        backgroundColor: "#163658",
                        borderRadius: "0.5rem",
                      }
                    : null
                }
              >
                {lists.slice(0).reverse().map((list, index) => (
                  <List
                    name={list.title}
                    key={list.id}
                    id={list.id}
                    index={index}
                    card={list.tasks}
                    boardId={props.boardId}
                    onPost={onPostHandler}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        {/* </div> */}
        <div className="board_add-container">
          {!isclicked ? (
            <div className="board_add-button">
              <button className="board_add-list-button" onClick={clickHandler}>
                <p className="board_add-list-button-title">+ ایجاد لیست</p>
              </button>
            </div>
          ) : (
            <div className="board_add-list-form">
              <form className="board_add-form" onSubmit={submitHandler}>
                <PerTextField>
                  <StyledTextField
                    margin="normal"
                    label="اسم لیست"
                    variant="filled"
                    autoFocus
                    required
                    fullWidth
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="اسم لیست را در این بخش بنویسید"
                    sx={{
                      backgroundColor: "var(--main-item-color)",
                      border: "0.2rem solid var(--minor-item-color)",
                      borderRadius: "0.5rem",
                    }}
                  />
                </PerTextField>
                <button type="submit" className="board_form-button">
                  افزودن
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
