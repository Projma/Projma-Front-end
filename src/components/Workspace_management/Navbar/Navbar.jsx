import React, { useEffect, useState } from "react";
import EditModal from "../WorkspaceEditModal/EditModal";
import apiInstance from "../../../utilities/axiosConfig";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import DeleteWorkspace from "./DeleteWorkspace";
import "react-toastify/dist/ReactToastify.css";
// import "transition-style";
import "./Navbar.css";
const Navbar = ({ params, workspace, setWorkspace }) => {
  const [navWorkspace, setNavWorkspace] = React.useState({});
  const [name, setName] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setNavWorkspace(workspace);
  }, [workspace]);
  const showToast = (text) => {
    toast.success(text, {
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
        ////console.log(res.data);
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
          <h3>{navWorkspace?.name?.charAt(0).toUpperCase()}</h3>
        </div>
        <div className="ws_navbar-ws-name-text">{navWorkspace?.name}</div>
      </div>
      <div className="ws_navbar-edit">
        <button className="ws_navbar-edit-button">
          <EditModal
            params={params}
            showToast={showToast}
            workspace={workspace}
            setWorkspace={setWorkspace}
          />
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
