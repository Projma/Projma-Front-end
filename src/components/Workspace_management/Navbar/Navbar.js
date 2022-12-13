import React, { useEffect, useState } from "react";
import EditModal from "../WorkspaceEditModal/EditModal";
import apiInstance from "../../../utilities/axiosConfig";
import "transition-style";
import "./Navbar.css";
const Navbar = ({ params }) => {
  const [workspace, setWorkspace] = React.useState({});
  const [name, setName] = React.useState("");
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        console.log(res.data);
        console.log(
          "*********************************************************"
        );
        setWorkspace(res.data);
        setName(res.data.name);
        console.log(workspace);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // console.log("in nav bar", workspace);
  const update_navbar = (data) => {
    console.log("god damn");
    console.log(data);
    console.log(data.name);
    setWorkspace(data);
    setName(data.name);
  };

  return (
    <div className="ws_navbar-main-div">
      <div className="ws_navbar-ws-name">
        <div transition-style className="ws_navbar-symbol --in-custom">
          <h3>{name?.charAt(0).toUpperCase()}</h3>
        </div>
        <div className="ws_navbar-ws-name-text">{workspace.name}</div>
      </div>
      <div className="ws_navbar-edit">
        <button className="ws_navbar-edit-button">
          <EditModal params={params} update_navbar={update_navbar} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
