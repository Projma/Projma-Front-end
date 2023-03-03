import React, { createContext, useState, useCallback } from "react";
import apiInstance from "../../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";

const BoardContext = createContext();

function Provider({ children, boardId }) {
  const [list, setList] = useState([]);
  const [isReq, setIsReq] = useState(false);
  const BOARD_ID = boardId;

  const getBoard = useCallback(async () => {
    setIsReq(true);
    await apiInstance
      .get(`workspaces/board/${boardId}/get-board-overview/`)
      .then((response) => {
        setList(response.data.tasklists.sort((a, b) => b.order - a.order));
      })
      .finally(() => setIsReq(false));
  }, [boardId]);

  const board = {
    boardId: BOARD_ID,
    list,
    setList,
    getBoard,
    setIsReq,
  };

  return (
    <React.Fragment>
      {isReq && <Loading />}
      <BoardContext.Provider value={board}>{children}</BoardContext.Provider>
    </React.Fragment>
  );
}

export { Provider };
export default BoardContext;