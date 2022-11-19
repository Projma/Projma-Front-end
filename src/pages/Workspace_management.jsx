import React from "react";
import ResponsiveDrawerRight from "../components/Workspace_management/Drawer/Drawer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Members from "../components/Workspace_management/Members/Members";
import "../styles/Workspace_management.css";

const Workspace_management = () => {
  return (
    <div className="mother-div">
      {/* <div> */}
      <ResponsiveDrawerRight width={"249px"} />
      {/* </div> */}
      {/* <Link to="workspace/members">Members</Link> */}
      {/* <h1 style={{ color: "white", backgroundColor: "white" }}>Members</h1> */}
      <Routes>
        <Route path="members" element={<Members />} />
      </Routes>
    </div>
  );
};

export default Workspace_management;
