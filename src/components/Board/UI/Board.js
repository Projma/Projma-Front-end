import React, { useState, useEffect } from 'react';
import List from './List';
import './Styles/Board.css';
import PerTextField from '../../Shared/PerTextField';
import StyledTextField from '../../Shared/StyledTextField';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import apiInstance from '../../../utilities/axiosConfig';
import InvitationHeader from '../InvitationHeader/InvitationHeader';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Loading from '../../Shared/Loading';
import { toast, ToastContainer } from 'react-toastify';
import '../../../styles/ReactToastify.css';

const Board = (props) => {
  const [lists, setLists] = useState([]);
  const [req, setReq] = useState(false);
  let data;
  // const [isclicked, setIsclicked] = useState(false);
  // const [inputName, setInputName] = useState("");
  // const [isPost, setIsPost] = useState(true);
  // const [isFail, setIsFail] = useState(false);

  // useEffect(() => {
  //   getBoard();
  // }, []);

  useEffect(() => {
    getBoard();
    return () => {setLists([])};
  }, []);

  useEffect(() => {
    setLists(lists.sort((a, b) => b.order - a.order));
  }, [lists]);

  const getBoard = () => {
    apiInstance
      .get(`workspaces/board/${props.boardId}/get-board-overview/`)
      .then((response) => {
        setLists(response.data.tasklists.sort((a, b) => b.order - a.order));
      })
      .finally(() => {
        // setIsPost(null);
      });
  };

  const handleReq = () => {
    setReq(!req);
  };

  const handleCreateList = (data) => {
    setLists((pervlists) => [...pervlists,data]);
  };

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
  // };

  const dragHandler = (result) => {
    const destination = result.destination;
    const source = result.source;
    if (!destination || !source) {
      return;
    }
    if (result.type === "list") {
      const newList = Array.from(lists);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      setLists(newList);
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    const start = lists.find(
      (list) => list.id === parseInt(source.droppableId)
    );
    const finish = lists.find(
      (list) => list.id === parseInt(destination.droppableId)
    );
    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      let temp = newTasks[source.index];
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, temp);
      const newStart = {
        ...start,
        tasks: newTasks,
      };
      const newState = lists.map((list) => {
        if (list.id === newStart.id) {
          return newStart;
        }
        return list;
      });
      setLists(newState);
      return;
    } else {
      const startTasks = Array.from(start.tasks);
      const finishTasks = Array.from(finish.tasks);
      const [removed] = startTasks.splice(source.index, 1);
      finishTasks.splice(destination.index, 0, removed);
      const newStart = {
        ...start,
        tasks: startTasks,
      };
      const newFinish = {
        ...finish,
        tasks: finishTasks,
      };
      const newState = lists.map((list) => {
        if (list.id === newStart.id) {
          return newStart;
        }
        if (list.id === newFinish.id) {
          return newFinish;
        }
        return list;
      });
      setLists(newState);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={dragHandler}>
      <InvitationHeader board_id={props.boardId} onCreateList={handleCreateList}/>
      <div className="styled-scrollbars">
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
            >
              {lists.map((list, index) => (
                <div className="board_list-container-box" style={
                  snapshot.draggingOverWith
                    ? {
                      backgroundColor: 'var(--main-bg)',
                      borderRadius: '0.5rem',
                    }
                    : null
                }>
                  <List
                    name={list.title}
                    key={list.id}
                    id={list.id}
                    index={index}
                    card={list.tasks}
                    boardId={props.boardId}
                    onReq={handleReq}
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
