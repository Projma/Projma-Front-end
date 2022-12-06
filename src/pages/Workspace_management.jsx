import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveDrawerRight from "../components/Workspace_management/Drawer/Drawer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import apiInstance from "../utilities/axiosConfig";
import Members from "../components/Workspace_management/Members/Members";
import BasicModal from "../components/Workspace_management/CreateBoardModal/CreateBoard";
import Navbar from "../components/Workspace_management/Navbar/Navbar";
import "../styles/Workspace_management.css";
import Board from "../components/Workspace_management/Board/Board";

const Workspace_management = () => {
  const params = useParams();
  const [workspace, setWorkspace] = React.useState({});
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

  const submit_form = (form_data) => {
    console.log("here");
    apiInstance
      .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="mother-div">
      {/* <div> */}
      <ResponsiveDrawerRight width={"249px"} />
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
      </Routes>
      {/* <Link to="create_board">Create Board</Link> */}
    </div>
  );
};

export default Workspace_management;
