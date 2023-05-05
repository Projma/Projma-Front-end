import React, { useEffect, useState } from "react";
import { useParams , BrowserRouter as Router, Routes, Route, Link , Navigate, useNavigate } from "react-router-dom";
import ResponsiveDrawerRight from "../components/Workspace_management/Drawer/Drawer";
import WS_AppBar from "../components/Workspace_management/AppBar/WS_AppBar";
import ResponsiveAppBar from "../components/ResponsiveAppBar/ResponsiveAppBar";

import apiInstance from "../utilities/axiosConfig";
import useMediaQuery from "@mui/material/useMediaQuery";

import Members from "../components/Workspace_management/Members/Members";
import WorkspaceSettings from "../components/Workspace_management/Settings/WorkspaceSettings";
import BasicModal from "../components/Workspace_management/CreateBoardModal/CreateBoard";
import Navbar from "../components/Workspace_management/Navbar/Navbar";
import "../styles/Workspace_management.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header/Header";
import Board from "../components/Workspace_management/Board/Board";
import { Helmet } from "react-helmet";
import Loading from "../components/Shared/Loading";
import Settings from "react-multi-date-picker/plugins/settings";

const Workspace_management = () => {
  const params = useParams();
  const [workspace, setWorkspace] = React.useState({});
  const [isPost, setIsPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        setWorkspace(res.data);
      });
  }, []);

  const submit_form = (form_data, boards, setBoards) => {
    setIsPost(true);
    apiInstance
      .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
      .then((res) => {
        setBoards([...boards, res.data]);
        console.log(res);
        apiInstance.post(`/calendar/simple-calendar/`, {board: res.data.id});
        toast.success("بورد با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
          style: {
            fontFamily: "Vazir",
            fontSize: "1.2rem",
          },
        });
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const matches = useMediaQuery("(min-width:984px)");
  const state_header = matches ? "23rem" : "0";
  return (
    <>
      {isPost ? <Loading /> : null}
      <header height="80" style={{ marginRight: state_header }}>
        <ResponsiveAppBar />
      </header>
      <div className="mother-div">
        <Helmet>
          <title>فضای کاری</title>
        </Helmet>
        <ToastContainer />
        <ResponsiveDrawerRight width={"249px"} params={params} />
        <Routes>
          <Route
            path="members"
            element={
              <Members
                params={params}
                workspace={workspace}
                setWorkspace={setWorkspace}
              />
            }
          />
          <Route
             path="boards"
            element={
              <Board
                params={params}
                on_submit={submit_form}
                workspace={workspace}
                setWorkspace={setWorkspace}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Workspace_management;
