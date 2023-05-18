import React, { createContext, useState, useCallback } from "react";
import apiInstance from "../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";
import { baseUrl } from "../utilities/constants";

const BoardContext = createContext();

function Provider({ children, boardId, workspaceId }) {
  const [list, setList] = useState([]);
  const [member, setMember] = useState([]);
  const [boardCover, setBoardCover] = useState("");
  const [isReq, setIsReq] = useState(false);
  const [calendar, setCalendar] = useState(0);
  const [poll, setPoll] = useState([]);

  const getBoard = useCallback(async () => {
    // setIsReq(true);
    let data;
    await apiInstance
      .get(`board/${boardId}/get-board-overview/`)
      .then((response) => {
        // setList(response.data.tasklists.sort((a, b) => b.order - a.order));
        setCalendar(response.data.calendar);
        setPoll(response.data.polls);
        data = response.data.tasklists.sort((a, b) => b.order - a.order);
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

  const dnd = (result) => {
    const draggableId = result.draggableId;
    const destination = result.destination;
    const source = result.source;
    if (!destination || !source) {
      return;
    }
    if (result.type === "list") {
      const newList = Array.from(list);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      apiInstance
        .put(`workspaces/board/${boardId}/reorder-tasklist/`, {
          order: newList.map((list) => list.id).reverse(),
        })
        .then(() => {
          setList(newList);
        });
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    if (result.type === "task") {
      const newlist = Array.from(list);
      const tasklist = list.find((x) => x.id === source.droppableId);
      const task = tasklist.tasks.find((x) => x.id === draggableId);
      list.forEach((value) => {
        if (value.id === source.droppableId) {
          value.tasks.splice(source.index, 1);
        }
        if (value.id === destination.droppableId) {
          value.tasks.splice(destination.index, 0, task);
        }
      });
      setList(newlist);
      apiInstance.patch(`workspaces/task/${result.draggableId}/move-task/`, {
        tasklist: destination.droppableId,
        order: destination.index + 1,
      });
    }
  };

  const board = {
    boardId,
    workspaceId,
    calendar,
    poll,
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
    dnd,
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
