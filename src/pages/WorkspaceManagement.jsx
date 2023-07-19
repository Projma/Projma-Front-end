import React from "react";
import { useParams, Outlet } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Provider } from "../context/board";
import Drawer from "../components/WorkspaceManagement/Drawer/Drawer";
import "../styles/WorkspaceManagement.scss";
const WorkspaceManagement = () => {
  let params = useParams();
  return (
    <div className="workspaceManagement--main">
      <Helmet>
        <title>فضای کاری</title>
      </Helmet>
      <Provider boardId={params.boardId} workspaceId={params.workspaceId}>
        <div className="workspaceManagement--container">
          <div className="workspaceManagement--sidebar">
            <Drawer />
          </div>
          <div className="workspaceManagement--section">
            <Outlet/>
          </div>
        </div>
      </Provider>
    </div>
  );
};

export default WorkspaceManagement;
