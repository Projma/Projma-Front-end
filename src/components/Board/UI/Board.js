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
  //   console.log('1');
  // }, []);

  useEffect(() => {
    getBoard();
    console.log('2');
    return () => {setLists([])};
  }, []);

  useEffect(() => {
    setLists(lists.sort((a, b) => b.order - a.order));
    console.log(lists);
  }, [lists]);

  const getBoard = () => {
    apiInstance
      .get(`workspaces/board/${props.boardId}/get-board-overview/`)
      .then((response) => {
        // console.log(response.data);
        // console.log(response.data.tasklists);
        // console.log(props.boardId);
        setLists(response.data.tasklists.sort((a, b) => b.order - a.order));
        console.log(lists);
      })
      .finally(() => {
        // setIsPost(null);
      });
  };

  const handleReq = () => {
    console.log('fuck it');
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
  //   // console.log(lists);
  // };

  const dragHandler = (result) => {
    const destination = result.destination;
    const source = result.source;
    console.log("result ", result);
    if (!destination || !source) {
      console.log("hey");
      return;
    }
    if (result.type === "list") {
      const newList = Array.from(lists);
      console.log(lists);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      setLists(newList);
      return;
    }
    console.log(result);

    console.log("destination ", destination);
    console.log("source ", source);

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("in self position");
      return;
    }
    const start = lists.find(
      (list) => list.id === parseInt(source.droppableId)
    );
    const finish = lists.find(
      (list) => list.id === parseInt(destination.droppableId)
    );
    console.log("shoroo");
    console.log(start);
    console.log(finish);
    if (start === finish) {
      const newTasks = Array.from(start.tasks);
      console.log(newTasks);
      // console.log(newTasks[0]);
      let temp = newTasks[source.index];
      // console.log(source.index);
      // console.log(temp);
      newTasks.splice(source.index, 1);
      newTasks.splice(destination.index, 0, temp);
      console.log(newTasks);
      const newStart = {
        ...start,
        tasks: newTasks,
      };
      console.log(newStart);
      const newState = lists.map((list) => {
        if (list.id === newStart.id) {
          return newStart;
        }
        return list;
      });
      console.log(newState);
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
      console.log(newState);
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
