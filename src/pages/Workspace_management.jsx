import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveDrawerRight from "../components/Workspace_management/Drawer/Drawer";
import WS_AppBar from "../components/Workspace_management/AppBar/WS_AppBar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import apiInstance from "../utilities/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";
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
import Settings from "react-multi-date-picker/plugins/settings";

const Workspace_management = () => {
  const params = useParams();
  const [workspace, setWorkspace] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        console.log(res.data);
        console.log(
          "*********************************************************"
        );
        setWorkspace(res.data);
      });
  }, []);

  const submit_form = (form_data, boards, setBoards) => {
    console.log("here");
    apiInstance
      .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
      .then((res) => {
        console.log(res.data);
        setBoards([...boards, res.data]);
        toast.success("بورد با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
  };
  return (
    <div className="mother-div">
      <Helmet>
        <title>فضای کاری</title>
      </Helmet>
      {/* <div> */}
      <ToastContainer />
      <ResponsiveDrawerRight width={"249px"} />
      {/* <WS_AppBar /> */}
      {/* </div> */}
      {/* <Link to="workspace/members">Members</Link> */}
      {/* <h1 style={{ color: "white", backgroundColor: "white" }}>Members</h1> */}
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
        {/* <Route
          path="create_board"
          element={<BasicModal params={params} on_submit={submit_form} />}
        /> */}
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

        <Route
          path="setting"
          element={
            <WorkspaceSettings
              params={params}
              workspace={workspace}
              setWorkspace={setWorkspace}
            />
          }
        />
      </Routes>
      {/* <Link to="create_board">Create Board</Link> */}
    </div>
  );
};

export default Workspace_management;
