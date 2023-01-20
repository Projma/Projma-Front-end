import React, { useState, useEffect } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import apiInstance from "../../../utilities/axiosConfig";
import "./Board.css";
import BoardView from "./BoardView";
import CreateBoardModal from "../CreateBoardModal/CreateBoard";
import { createGlobalStyle } from "styled-components";

const Board = ({ params, on_submit }) => {
  //console.log(params.id);
  const [workspace, setWorkspace] = useState({});
  const [star, setStar] = useState([]);
  const [recent, setRecent] = useState([]);
  const [list, setList] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    //console.log(params);
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/workspace-boards/`)
      .then((res) => {
        const boards = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
          background_pic: obj.background_pic,
        }));
        setList(boards);
        //console.log(boards);
      });
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        // //console.log(res.data);
        //console.log("*********************************");
        //console.log(res.data);
        setWorkspace(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
    apiInstance
      .get(`workspaces/workspaces/${params.id}/workspace-starred-boards/`)
      .then((res) => {
        // //console.log(res.data);
        //console.log("*********************************");
        //console.log(res.data);
        setStar(res.data);
      })
      .catch((err) => {
        //console.log(err);
        setStar([]);
      });
  }, []);

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaces/${params.id}/workspace-starred-boards/`)
      .then((res) => {
        // //console.log(res.data);
        //console.log("*********************************");
        //console.log(res.data);
        setStar(res.data);
      })
      .catch((err) => {
        //console.log(err);
        setStar([]);
      });
  }, [update]);

  const addBoardHandler = (obj) => {
    setList((current) => [...current, obj]);
  };

  const starredHandler = (data) => {
    setStar((current) =>
      current.map((obj) => {
        if (obj.id === data.id) {
          return { ...obj, isStarred: data.is };
        }
        return obj;
      })
    );
    setUpdate(!update);
  };

  const [open, setOpen] = useState(false);
  return (
    <div className="workspace-board-main" style={{ width: "100%" }}>
      <Navbar params={params} />
      {star.length > 0 && (
        <div>
          <div className="workspace--starred-board">
            <div className="workspace--board-header">
              <StarIcon />
              <p className="workspace--board-header-title">بورد های مهم</p>
            </div>
            <div className="workspace--board-body">
              <div className="workspace--board-body-list">
                {star.map((x) => (
                  <BoardView
                    name={x.name}
                    key={x.id}
                    is={true}
                    id={x.id}
                    pic={x.background_pic}
                    onStarred={starredHandler}
                  />
                ))}
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
                        is={star.find((e) => e.id === x.id) ? true : false}
                        id={x.id}
                        pic={x.background_pic}
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
          <DashboardIcon sx={{ color: "#fff", marginLeft: "10px" }} />
          <p className="workspace--board-header-title">بورد ها</p>
        </div>
        <div className="workspace--board-body">
          <div className="workspace--board-body-list">
            {list.map((x) => (
              <BoardView
                name={x.name}
                key={x.id}
                is={star.find((e) => e.id === x.id) ? true : false}
                id={x.id}
                pic={"http://mohammadosoolian.pythonanywhere.com" +
                x.background_pic}
                onStarred={starredHandler}
              />
            ))}
            <CreateBoardModal
              params={params}
              on_submit={on_submit}
              boards={list}
              setBoards={setList}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
