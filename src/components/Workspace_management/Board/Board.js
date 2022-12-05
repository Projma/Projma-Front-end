import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import apiInstance from "../../../utilities/axiosConfig";
import "./Board.css";
import BoardView from "./BoardView";
import BasicModal from "../BasicModal/CreateBoard";

const Board = ({ params, on_submit }) => {
  useEffect(() => {
    console.log(params);
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/workspace-boards/`)
      .then((res) => {
        // console.log(res.data);
        // const members = res.data.members.map((obj) => ({
        //   id: obj,
        // }));
        // console.log(members);
        const boards = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
        }));
        setList(boards);
        console.log(boards);
      });
  }, []);
  const [list, setList] = useState([]);

  const addBoardHandler = (obj) => {
    setList((current) => [...current, obj]);
  };

  const starredHandler = (data) => {
    setList((current) =>
      current.map((obj) => {
        if (obj.id === data.id) {
          return { ...obj, isStarred: data.is };
        }
        return obj;
      })
    );
  };

  // ✅ Remove one or more objects from state array
  // const removeObjectFromArray = () => {
  //   setEmployees(current =>
  //     current.filter(obj => {
  //       return obj.id !== 2;
  //     }),
  //   );
  // };
  const [open, setOpen] = useState(false);
  return (
    <div className="workspace--board">
      {list.find((e) => e.isStarred === true) && (
        <div>
          <div className="workspace--starred-board">
            <div className="workspace--board-header">
              <StarIcon />
              <p className="workspace--board-header-title">بورد های مهم</p>
            </div>
            <div className="workspace--board-body">
              <div className="workspace--board-body-list">
                {list.map(
                  (x) =>
                    x.isStarred && (
                      <BoardView
                        name={x.name}
                        key={x.id}
                        is={x.isStarred}
                        id={x.id}
                        onStarred={starredHandler}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {list.find((e) => e.isRecent === true) && (
        <div>
          <div className="workspace--recent-board">
            <div className="workspace--board-header">
              <AccessTimeIcon />
              <p className="workspace--board-header-title">آخرین بورد ها</p>
            </div>
            <div className="workspace--board-body">
              <div className="workspace--board-body-list">
                {list.map(
                  (x) =>
                    x.isRecent && (
                      <BoardView
                        name={x.name}
                        key={x.id}
                        is={x.isStarred}
                        id={x.id}
                        onStarred={starredHandler}
                      />
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="workspace--my-board">
        <div className="workspace--board-header">
          <DashboardIcon />
          <p className="workspace--board-header-title">بورد ها</p>
        </div>
        <div className="workspace--board-body">
          <div className="workspace--board-body-list">
            {list.map((x) => (
              <BoardView
                name={x.name}
                key={x.id}
                is={x.isStarred}
                id={x.id}
                onStarred={starredHandler}
              />
            ))}
            <BasicModal params={params} on_submit={on_submit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
