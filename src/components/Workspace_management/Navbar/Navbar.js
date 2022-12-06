import React, { useEffect, useState } from "react";
import EditModal from "../WorkspaceEditModal/EditModal";
import apiInstance from "../../../utilities/axiosConfig";
import "./Navbar.css";
const Navbar = ({ params }) => {
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
        console.log(workspace);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [workspace]);
  // console.log("in nav bar", workspace);

  return (
    <div className="ws_navbar-main-div">
      <div className="ws_navbar-symbol">{workspace.name}</div>
      <div className="ws_navbar-edit">
        <button className="ws_navbar-edit-button">
          <EditModal params={params} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
