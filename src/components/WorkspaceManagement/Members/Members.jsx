import React, { useState, useEffect, useRef } from "react";

import ShowMembers from "./ShowMembers";
import Navbar from "../Navbar/Navbar";
import Divider from "@mui/material/Divider";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import {  toast } from "react-toastify";

import { baseUrl } from "../../../utilities/constants";
import "./Members.scss";
import { convertNumberToPersian } from "../../../utilities/helpers";
import Loading from "../../Shared/Loading";
import anonymous from "../../../static/images/workspace_management/members/anonymous.png";
import useTheme from "../../../hooks/useTheme";

const Members = () => {
  const [members, setMembers] = React.useState([]);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [memworkspace, setMemWorkspace] = React.useState({});
  const [isPost, setIsPost] = useState(false);
  const [button_inner, setButton_inner] = React.useState("کپی لینک دعوت");

  let params = useParams();
  const {theme ,getColor} = useTheme();

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/workspace-members/`)
      .then((res) => {
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic
            ? baseUrl + obj.profile_pic?.slice(1)
            : anonymous,
        }));
        setMembers(members);
      });
  }, []);
  const navigate = useNavigate();
  const copyLink = (e) => {
    if (button_inner === "کپی لینک دعوت") {
      setIsPost(true);
      apiInstance
        .get(`workspaces/workspaceowner/${params.id}/invite-link/`)
        .then((res) => {
          navigator.clipboard
            .writeText(`http://localhost:3000/invite_page/${res.data}/`)
            .then(
              buttonRef.current.blur(),
              setButton_inner("لینک کپی شد"),

              function (err) {
                console.error("Async: Could not copy text: ", err);
              }
            );
        })
        .finally(() => setIsPost(null));
    } else {
      setButton_inner("کپی لینک دعوت");
    }
  };
  const go_to_profile = (e) => {
    navigate(`/profileview/${e.currentTarget.id}/`);
  };

  const removeMember = (e, user_id) => {
    apiInstance
      .delete(
        `workspaces/workspaceowner/${params.id}/remove-user-from-workspace/${user_id}/`
      )
      .then((res) => {
        setMembers((members) =>
          members.filter((member) => member.id !== user_id)
        );
        toast.success("کاربر با موفقیت حذف شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      });
    setButtonClicked((prev) => !prev);
  };
  const buttonRef = useRef(null);
  return (
    <div className="main-div">
      {isPost ? <Loading /> : null}
      {/* <Navbar
        params={params}
        workspace={workspace}
        setWorkspace={setWorkspace}
      /> */}
      <div className="copy-link">
        <div className="copy-link-text">
          <h2 className="ws_members-invite-text" style={{color: getColor(theme.mainBg)}}>
            لینک دعوت به کارگاه را کپی کنید و به افراد دیگر ارسال کنید تا به
            کارگاه شما بپیوندند
          </h2>
        </div>
        <button
          onClick={copyLink}
          ref={buttonRef}
          className="button-9"
          style={{ fontFamily: "Vazir",color: getColor(theme.primary) }}
        >
          {button_inner}
        </button>
      </div>
      <Divider
        sx={{
          backgroundColor: "#007fff",
          marginTop: "2rem",
          margin: "5rem 1rem 5rem 5rem",
        }}
      />
      <ShowMembers
        members={members}
        go_to_profile={go_to_profile}
        removeMember={removeMember}
      />
    </div>
  );
};

export default Members;
