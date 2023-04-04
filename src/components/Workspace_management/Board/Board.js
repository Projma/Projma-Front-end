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
import Loading from "../../Shared/Loading";
import { baseUrl } from "../../../utilities/constants";

const Board = ({ params, on_submit, workspace, setWorkspace }) => {
  const [star, setStar] = useState([]);
  const [recent, setRecent] = useState([]);
  const [boards, setBoards] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  let tempdata;
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaces/${params.id}/workspace-starred-boards/`)
      .then((res) => {
        setLoading(true);
        setStar(res.data);
      })
      .catch((err) => {
        setStar([]);
      })
      .finally(() => setLoading(false));
  }, [update]);

  const fetchData = async () => {
    await apiInstance
      .get(`workspaces/workspaceowner/${params.id}/workspace-boards/`)
      .then((res) => {
        const boards = res.data.map((obj) => ({
          id: obj.id,
          name: obj.name,
          background_pic: obj.background_pic,
        }));
        setBoards(boards);
        tempdata = boards;
      });
    await apiInstance
      .get(`workspaces/workspaces/${params.id}/workspace-starred-boards/`)
      .then((res) => {
        setStar(res.data);
      });
    await apiInstance
      .get(`workspaces/dashboard/myrecent-boards/`)
      .then((res) => {
        setRecent(res.data.filter((x) => tempdata.find((y) => y.id === x.id)));
      })
      .finally(() => setLoading(false));
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

  return (
    <div className="workspace-board-main" style={{ width: "100vw" }}>
      {loading && <Loading />}
      <Navbar
        params={params}
        workspace={workspace}
        setWorkspace={setWorkspace}
      />
      <div className="workspace-board-section">
        {recent.length > 0 && (
          <div>
            <div className="workspace--recent-board">
              <div className="workspace--board-header">
                <AccessTimeIcon style={{ color: "#fff" }} />
                <p className="workspace--board-header-title">آخرین بورد ها</p>
              </div>
              <div className="workspace--board-body">
                <div className="workspace--board-body-boards">
                  {recent.map((x) => (
                    <BoardView
                      name={x.name}
                      key={x.id}
                      is={star.find((e) => e.id === x.id) ? true : false}
                      id={x.id}
                      pic={
                        x.background_pic === null
                          ? null
                          : baseUrl + x.background_pic
                      }
                      onLoading={() => setLoading(true)}
                      onStarred={starredHandler}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        {star.length > 0 && (
          <div>
            <div className="workspace--starred-board">
              <div className="workspace--board-header">
                <StarIcon />
                <p className="workspace--board-header-title">بورد های مهم</p>
              </div>
              <div className="workspace--board-body">
                <div className="workspace--board-body-boards">
                  {star.map((x) => (
                    <BoardView
                      name={x.name}
                      key={x.id}
                      is={true}
                      id={x.id}
                      pic={x.background_pic}
                      onStarred={starredHandler}
                      onLoading={() => setLoading(true)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="workspace--my-board">
          <div className="workspace--board-header">
            <DashboardIcon sx={{ color: "#fff" }} />
            <p className="workspace--board-header-title">بورد ها</p>
          </div>
          <div className="workspace--board-body">
            <div className="workspace--board-body-boards">
              {boards.map((x) => (
                <BoardView
                  name={x.name}
                  key={x.id}
                  is={star.find((e) => e.id === x.id) ? true : false}
                  id={x.id}
                  pic={
                    x.background_pic === null
                      ? null
                      : baseUrl + x.background_pic
                  }
                  onStarred={starredHandler}
                  onLoading={() => setLoading(true)}
                />
              ))}
              <CreateBoardModal
                params={params}
                on_submit={on_submit}
                boards={boards}
                setBoards={setBoards}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
