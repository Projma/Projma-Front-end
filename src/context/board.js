import "../styles/ReactToastify.css";
import React, { createContext, useState, useCallback } from "react";
import apiInstance from "../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";
import { ToastContainer } from "react-toastify";

const BoardContext = createContext();

function Provider({ children, boardId }) {
  const [list, setList] = useState([]);
  const [member, setMember] = useState([]);
  const [isReq, setIsReq] = useState(false);

  const getBoard = useCallback(async () => {
    setIsReq(true);
    let data;
    await apiInstance
      .get(`workspaces/board/${boardId}/get-board-overview/`)
      .then((response) => {
        // setList(response.data.tasklists.sort((a, b) => b.order - a.order));
        data = response.data.tasklists.sort((a, b) => b.order - a.order);
        console.log("before \n",data);
        data = data.map((tasklists) => {
          tasklists.tasks = tasklists.tasks.map((task) => {
            const addInfo = async () => {
              await apiInstance
              .get(`workspaces/task/${task.id}/get-task/`)
              .then((response) => {
                    let attach = response.data.attachments;
                    let cover = "";
                    if (attach !== undefined) {
                      attach.every((x) => {
                        console.log(x);
                        let file = x.file.split("attachments/")[1];
                        file = file.split(".")[1];
                        if (file === "png" || file === "jpeg" || file === "jpg") {
                          cover = x.file;
                          return true;
                        }
                        return false;
                      });
                      task.cover = cover;
                    }
                });
            };
            addInfo();
            return task;
          });
          return tasklists;
        });
        console.log("after \n",data);
        setList(data);
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
    setList(
      list.map((list) => {
        if (list.id === id) list.title = name;
        return list;
      })
    );
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
