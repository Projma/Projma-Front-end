import "../styles/ReactToastify.css";
import React, { createContext, useState, useCallback } from "react";
import apiInstance from "../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";
import { ToastContainer } from "react-toastify";
import { baseUrl } from "../utilities/constants";

const BoardContext = createContext();

function Provider({ children, boardId, workspaceId }) {
  const [list, setList] = useState([]);
  const [member, setMember] = useState([]);
  const [boardCover, setBoardCover] = useState("");
  const [isReq, setIsReq] = useState(false);
  const [calendar, setCalendar] = useState(0);

  const getBoard = useCallback(async () => {
    // setIsReq(true);
    let data;
    await apiInstance
      .get(`board/${boardId}/get-board-overview/`)
      .then((response) => {
        // setList(response.data.tasklists.sort((a, b) => b.order - a.order));
        setCalendar(response.data.calendar);
        data = response.data.tasklists.sort((a, b) => b.order - a.order);
        data = data.map((tasklists) => {
          tasklists.tasks = tasklists.tasks.map((task) => {
            const addInfo = async () => {
              await apiInstance
                .get(`task/${task.id}/get-task/`)
                .then((response) => {
                  let attach = response.data.attachments;
                  let cover = "";
                  if (attach !== undefined) {
                    attach.every((x) => {
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
        setList(data);
        setMember(response.data.members);
        setBoardCover(response.data.background_pic);
      })
      .finally(() => setIsReq(false));
  }, [boardId, workspaceId]);

  const addCardToList = (card, list_id) => {
    setList(
      list.map((tasklist) => {
        if (tasklist.id === list_id) {
          return {
            ...tasklist,
            tasks: [...tasklist.tasks, card],
          };
        }
        return tasklist;
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

  const removeCard = (id) => {
    setList(
      list.map((l) => {
        l.tasks = l.tasks.filter((t) => t.id !== id);
        return l;
      })
    );
  };

  const board = {
    boardId,
    workspaceId,
    calendar,
    list,
    member,
    boardCover,
    setList,
    getBoard,
    addCardToList,
    removeList,
    editListName,
    removeCard,
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
