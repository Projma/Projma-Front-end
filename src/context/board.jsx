import "../styles/ReactToastify.css";
import React, { createContext, useState, useCallback, useRef } from "react";
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
  const socket = useRef(null);
  // const socket = useRef(null);
  const getBoard = useCallback(async () => {
    // setIsReq(true);
    let data;
    await apiInstance
      .get(`board/${boardId}/get-board-overview/`)
      .then((response) => {
        setCalendar(response.data.calendar);
        setPoll(response.data.polls);
        data = response.data.tasklists.sort((a, b) => b.order - a.order);
        setList(data);
        setMember(response.data.members);
        setBoardCover(response.data.background_pic);
      })
      .finally(() => setIsReq(false));
    socket.current = new WebSocket(
      `ws://localhost:8000/ws/socket-server/board/?token=${localStorage.getItem(
        "access_token"
      )}`
    );
    socket.current.onopen = () => {
      console.log("WebSocket connection opened");
      socket.current.send(
        JSON.stringify({
          type: "join_board_group",
          data: { board_id: boardId },
        })
      );
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      dnd_socket(message, message.type);
    };

    socket.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, [boardId, workspaceId]);

  const addCardToList = (card, list_id) => {
    socket.current.send(
      JSON.stringify({
        type: "add_card",
        data: { card: card, list_id: list_id },
      })
    );
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
    socket.current.send(
      JSON.stringify({ type: "remove_tasklist", data: { list_id: id } })
    );
  };

  const editListName = (id, name) => {
    setList(
      list.map((list) => {
        if (list.id === id) list.title = name;
        return list;
      })
    );
    socket.current.send(
      JSON.stringify({
        type: "edit_list_name",
        data: { list_id: id, name: name },
      })
    );
  };

  const removeCard = (id) => {
    socket.current.send(
      JSON.stringify({ type: "remove_card", data: { card_id: id } })
    );
    setList(
      list.map((l) => {
        l.tasks = l.tasks.filter((t) => t.id !== id);
        return l;
      })
    );
  };

  const dnd = (result, flag) => {
    const draggableId = result.draggableId;
    const destination = result.destination;
    const source = result.source;
    if (flag == 1) {
      socket.current.send(
        JSON.stringify({ type: "reorder_tasklists", data: result })
      );
    }
    if (!destination || !source) {
      return;
    }
    if (result.type === "COLUMN") {
      const newList = Array.from(list);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      apiInstance
        .put(`board/tasklist/${boardId}/reorder-tasklists/`, {
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
      console.log(newlist);
      const tasklist = list.find(
        (x) => "card_holder:" + x.id === source.droppableId
      );
      const task = tasklist.tasks.find((x) => "card:" + x.id === draggableId);
      newlist.forEach((value) => {
        console.log(value.id);
        console.log(source.droppableId.slice(12));
        if (value.id == source.droppableId.slice(12)) {
          value.tasks.splice(source.index, 1);
        }
        if (value.id == destination.droppableId.slice(12)) {
          value.tasks.splice(destination.index, 0, task);
        }
      });
      setList(newlist);
      apiInstance.patch(`task/${result.draggableId.slice(5)}/move-task/`, {
        tasklist: destination.droppableId.slice(12),
        order: destination.index + 1,
      });
    }
  };

  const dnd_socket = (data, type) => {
    if (type == "reorder_tasklists") {
      dnd(data.data, 0);
    }
    if (type == "add_card") {
      setList(
        list.map((tasklist) => {
          if (tasklist.id === data.data.list_id) {
            return {
              ...tasklist,
              tasks: [...tasklist.tasks, data.data.card],
            };
          }
          return tasklist;
        })
      );
    }
    if (type == "remove_card") {
      setList(
        list.map((l) => {
          l.tasks = l.tasks.filter((t) => t.id !== data.data.card_id);
          return l;
        })
      );
    }
    if (type == "create_tasklist") {
      setList((pervlist) => [data.data, ...pervlist]);
    }
    if (type == "remove_tasklist") {
      setList(list.filter((list) => list.id !== data.data.list_id));
    }
    if (type == "edit_list_name") {
      setList(
        list.map((list) => {
          if (list.id == data.data.list_id) list.title = data.data.name;
          return list;
        })
      );
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
    socket,
    setList,
    getBoard,
    addCardToList,
    removeList,
    editListName,
    removeCard,
    setIsReq,
    dnd,
    dnd_socket,
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
