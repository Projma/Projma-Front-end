import "../styles/ReactToastify.css";
import React, { createContext, useState, useCallback } from "react";
import apiInstance from "../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";
import { ToastContainer } from "react-toastify";

const BoardContext = createContext();

function Provider({ children, boardId }) {
  const [list, setList] = useState([]);
  const [member, setMember] = useState([])
  const [isReq, setIsReq] = useState(false);

  const getBoard = useCallback(async () => {
    setIsReq(true);
    await apiInstance
      .get(`workspaces/board/${boardId}/get-board-overview/`)
      .then((response) => {
        setList(response.data.tasklists.sort((a, b) => b.order - a.order));
        setMember(response.data.members);
      })
      .finally(() => setIsReq(false));
  }, [boardId]);

  const addCardToList = (card, list_id) => {
    setList(
      list.map((list) => {
        if (list.id === list_id) {
          return {
            ...list,
            tasks: [...list.tasks, card],
          };
        }
        return list;
      })
    );
  };

  const removeList = (id) => {
    setList(list.filter((list) => list.id !== id));
  };

  const editListName = (id, name) => {
    setList(list.map((list) => {
      if(list.id === id) 
        list.title = name;
      return list;
    }))
  };

  const board = {
    boardId,
    list,
    member,
    setList,
    getBoard,
    addCardToList,
    removeList,
    editListName,
    setIsReq,
  };

  return (
    <React.Fragment>
      {isReq && <Loading />}
      <ToastContainer autoClose={3000} style={{ fontSize: "1.2rem" }} />
      <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
    </React.Fragment>
  );
}

export { Provider };
export default BoardContext;