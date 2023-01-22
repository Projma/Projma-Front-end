import React, { useEffect, useState } from "react";
import EditModal from "../WorkspaceEditModal/EditModal";
import apiInstance from "../../../utilities/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DeleteWorkspace from "./DeleteWorkspace";
import "react-toastify/dist/ReactToastify.css";
// import "transition-style";
import "./Navbar.css";
const Navbar = ({ params }) => {
  const [workspace, setWorkspace] = React.useState({});
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        setWorkspace(res.data);
        setName(res.data.name);
        //console.log(workspace);
      })
      .catch((err) => {
        //console.log(err);
      });
  }, []);
  // //console.log("in nav bar", workspace);
  const update_navbar = (data) => {
    //console.log("god damn");
    //console.log(data);
    //console.log(data.name);
    setWorkspace(data);
    setName(data.name);
    toast.success("اطلاعات فضای کاری با موفقیت تغییر کرد", {
      position: toast.POSITION.BOTTOM_LEFT,
      rtl: true,
      style: {
        fontFamily: "Vazir",
        fontSize: "1.2rem",
      },
    });
  };

  const removeWorkspace = (wid) => {
    apiInstance
      .delete(`workspaces/workspaceowner/${workspace.id}/delete-workspace/`)
      .then((res) => {
        //console.log(res.data);
        toast.success("فضای کاری با موفقیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
          style: {
            fontFamily: "Vazir",
            fontSize: "1.2rem",
          },
        });
        new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
          navigate("/dashboard");
        });
      });
  };

  return (
    <div className="ws_navbar-main-div">
      <div className="ws_navbar-ws-name">
        <ToastContainer />
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
      <div className="ws_navbar-delete-div">
        {/* <button className="ws_navbar-delete-button">حذف فضای کار</button> */}
        <DeleteWorkspace
          className="ws_workspace-remove-button"
          key={workspace.id}
          removeWorkspace={removeWorkspace}
          workspace_id={workspace.id}
        />
      </div>
    </div>
  );
};

export default Navbar;
