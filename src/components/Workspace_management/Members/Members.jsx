import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Divider from "@mui/material/Divider";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { baseUrl } from "../../../utilities/constants";
import "./Members.scss";
import x from "../../../static/images/workspace_management/members/mohammadi.jpg";
const members = [
  { id: 2, firstName: "1", lastName: "1", email: "email@email.ir", image: x },
  { id: 2, firstName: "2", lastName: "2", email: "email@email.ir", image: x },
  { id: 2, firstName: "3", lastName: "3", email: "email@email.ir", image: x },
  { id: 2, firstName: "4", lastName: "4", email: "email@email.ir", image: x },
  { id: 2, firstName: "5", lastName: "5", email: "email@email.ir", image: x },
  { id: 2, firstName: "6", lastName: "6", email: "email@email.ir", image: x },
  { id: 2, firstName: "7", lastName: "7", email: "email@email.ir", image: x },
  { id: 2, firstName: "8", lastName: "8", email: "email@email.ir", image: x },
];

const Members = ({ params }) => {
  const [members, setMembers] = React.useState([]);
  const [buttonClicked, setButtonClicked] = React.useState(false);
  const [workspace, setWorkspace] = React.useState({});
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
      .then((res) => {
        // console.log(res.data);
        console.log(res.data);
        console.log(
          "*********************************************************"
        );
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
          image: obj.profile_pic,
        }));
        setMembers(members);
        console.log(members);
      });
    // apiInstance
    //   .get(`workspaces/workspaceowner/${params.id}/get-workspace/`)
    //   .then((res) => {
    //     // console.log(res.data);
    //     console.log(res.data);
    //     console.log(
    //       "*********************************************************"
    //     );
    //     setWorkspace(res.data);
    //   });
  }, []);
  const navigate = useNavigate();
  const copyLink = (e) => {
    console.log(`${baseUrl}workspaces/workspaceowner/${params.id}/invite-link`);
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/invite_link/`)
      .then((res) => {
        console.log(res.data);
        navigator.clipboard.writeText(
          `localhost:3001/invite_page/${res.data}/`
        );
      });
  };
  const go_to_profile = (e) => {
    console.log(e.currentTarget.id);
    navigate(`/profileview/${e.currentTarget.id}/`);
  };

  const removeMember = (e, user_id) => {
    console.log(user_id);
    apiInstance
      .delete(
        `workspaces/workspaceowner/${params.id}/remove-user-from-workspace/${user_id}/`
      )
      .then((res) => {
        console.log(res.status);
        console.log("in delete person");
        setMembers((members) =>
          members.filter((member) => member.id !== user_id)
        );
      });
    setButtonClicked((prev) => !prev);
  };

  const test = (e) => {
    console.log("here");
    const form_data = new FormData();
    form_data.append("name", "title");
    form_data.append("description", "description");
    form_data.append("type", "education");
    apiInstance
      .post(`/workspaces/workspaceowner/${params.id}/create-board/`, form_data)
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <div className="main-div">
      <Navbar params={params} />
      <div className="copy-link">
        <div className="copy-link-text">
          <h2 className="ws_members-invite-text">
            لینک دعوت به کارگاه را کپی کنید و به افراد دیگر ارسال کنید تا به
            کارگاه شما بپیوندند
          </h2>
        </div>
        <button onClick={copyLink} class="button-9">
          کپی لینک دعوت
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
        {/* <div className="members-text">اعضای کارگاه</div>
        <div className="members-list">
          <div className="members-list-header">
            <div className="members-list-header-item">نام</div>
            <div className="members-list-header-item">ایمیل</div>
            <div className="members-list-header-item">نقش</div>
            <div className="members-list-header-item">عملیات</div>
          </div>
          <div className="members-list-item"></div>
        </div> */}
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
                <td className="list-item-prop hide-when-small">{idx + 1}</td>
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
                  <button
                    id={member.userName}
                    key={member.id}
                    className="more-details"
                    role="button"
                    onClick={go_to_profile}
                  >
                    <span class="text">پروفایل</span>
                  </button>
                </td>
                <td>
                  <button
                    key={member.id}
                    id={member.userName}
                    className="ws_members-person-remove-button"
                    onClick={(event) => removeMember(event, member.id)}
                  >
                    <PersonRemoveIcon sx={{ color: "#fff" }} />
                  </button>
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
