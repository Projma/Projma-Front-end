import React, { useState, useEffect } from "react";
import List from "./List";
import "../Styles/Board.css";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import { DragDropContext } from "react-beautiful-dnd";
import InvitationHeader from "../InvitationHeader/InvitationHeader";
import { v4 as uuid } from "uuid";
import apiInstance from "../../../utilities/axiosConfig";
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
          setLists(response.data.tasklists);
        }).finally(() => {
          setIsPost(null);
        });
    getBoard();
    // console.log(lists);
  }, [isPost]);

  const postCreateList = async (data, id) =>
    await apiInstance
      .post(
        `workspaces/board/${id}/create-tasklist/`,
        data
      )
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
    postCreateList(data, 1);
    setIsclicked(false);
    setInputName("");
    // console.log(lists);
  };

  const onPostHandler = (isa) => {
    setIsPost(isa);
  }

  return (
    <>
    <InvitationHeader board_id={props.boardId}/>
    <div className="board_list-container font-fix">
      {isPost ? <Loading /> : null}
      {isFail ? (
        <ToastContainer autoClose={5000} style={{ fontSize: "1.2rem" }} />
      ) : null}
        <div className="board_list-container-minor">
          {lists.map((list) => (
            <List name={list.title} key={uuid()} id={list.id} card={list.tasks} boardId={props.boardId} onPost={onPostHandler}/>
          ))}
        </div>
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
                    backgroundColor: "#132F4C",
                    border: "0.2rem solid #5090D3",
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
    </>
  );
};

export default Board;
