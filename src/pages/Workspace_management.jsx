import React from "react";
import { useParams } from "react-router-dom";
import ResponsiveDrawerRight from "../components/Workspace_management/Drawer/Drawer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import apiInstance from "../utilities/axiosConfig";
import Members from "../components/Workspace_management/Members/Members";
import BasicModal from "../components/Workspace_management/BasicModal/CreateBoard";
import "../styles/Workspace_management.css";
import Board from "../components/Workspace_management/Board/Board";

const Workspace_management = () => {
  const params = useParams();
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
        <Route path="members" element={<Members params={params} />} />
        <Route
          path="create_board"
          element={<BasicModal params={params} on_submit={submit_form} />}
        />
        <Route
          path="boards"
          element={<Board params={params} on_submit={submit_form} />}
        />
      </Routes>
      {/* <Link to="create_board">Create Board</Link> */}
    </div>
  );
};

export default Workspace_management;
