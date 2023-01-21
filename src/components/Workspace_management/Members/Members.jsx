import React from "react";
import { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import Divider from "@mui/material/Divider";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteDialog from "./DeleteDialog";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../../utilities/constants";
import "./Members.scss";
import { convertNumberToPersian } from "../../../utilities/helpers";
import anonymous from "../../../static/images/workspace_management/members/anonymous.png";
import Loading from "../../Shared/Loading";

const Members = ({ params }) => {
  const [members, setMembers] = React.useState([]);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [workspace, setWorkspace] = React.useState({});
  const [isPost, setIsPost] = useState(false);
  const [button_inner, setButton_inner] = React.useState("کپی لینک دعوت");
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        setWorkspace(res.data);
      });
  }, []);

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
        //console.log(baseUrl + res.data.profile_pic?.slice(1));
        setMembers(members);
        //console.log(members);
      });
  }, []);
  const navigate = useNavigate();
  const copyLink = (e) => {
    //console.log(`${baseUrl}workspaces/workspaceowner/${params.id}/invite-link`);
    if (button_inner === "کپی لینک دعوت") {
      setIsPost(true);
      apiInstance
        .get(`workspaces/workspaceowner/${params.id}/invite-link/`)
        .then((res) => {
          navigator.clipboard
            .writeText(`localhost:3000/invite_page/${res.data}/`)
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
    //console.log(user_id);
    apiInstance
      .delete(
        `workspaces/workspaceowner/${params.id}/remove-user-from-workspace/${user_id}/`
      )
      .then((res) => {
        //console.log(res.status);
        //console.log("in delete person");

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

  const test = (e) => {
    //console.log("here");
    const form_data = new FormData();
    form_data.append("name", "title");
    form_data.append("description", "description");
    form_data.append("type", "education");
    apiInstance
      .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
      .then((res) => {
        //console.log(res.data);
      });
  };
  const buttonRef = useRef(null);
  return (
    <div className="main-div">
      {isPost ? <Loading /> : null}
      <ToastContainer />
      <Navbar params={params} />
      <div className="copy-link">
        <div className="copy-link-text">
          <h2 className="ws_members-invite-text">
            لینک دعوت به کارگاه را کپی کنید و به افراد دیگر ارسال کنید تا به
            کارگاه شما بپیوندند
          </h2>
        </div>
        <button onClick={copyLink} ref={buttonRef} class="button-9">
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
      <div className="members">
        <table class="styled-table">
          <thead>
            <tr>
              <th className="list-item-prop hide-when-small">ردیف</th>
              <th className="list-item-prop hide-when-small">عکس</th>
              <th className="list-item-prop">نام و نام خانوادگی</th>
              <th className="list-item-prop hide-when-small">ایمیل</th>
              <th className="list-item-prop">اطلاعات بیشتر</th>
              <th className="list-item-prop">حذف</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => (
              <tr>
                <td className="list-item-prop hide-when-small">
                  {convertNumberToPersian(idx + 1)}
                </td>
                <td className="list-item-prop hide-when-small">
                  <img src={member.image} className="member-image" />
                </td>
                <td className="list-item-prop">
                  {member.firstName} {member.lastName}
                </td>
                <td className="list-item-prop hide-when-small">
                  {member.email}
                </td>
                <td className="list-item-prop for-button">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      id={member.userName}
                      key={member.id}
                      className="more-details"
                      role="button"
                      onClick={go_to_profile}
                    >
                      <span class="text">پروفایل</span>
                    </button>
                  </div>
                </td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "3rem",
                  }}
                >
                  <DeleteDialog
                    className="ws_members-person-remove-button"
                    key={member.id}
                    removeMember={removeMember}
                    user_id={member.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
