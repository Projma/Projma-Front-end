import React from "react";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
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
  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/workspace-members/`)
      .then((res) => {
        // console.log(res.data);
        // const members = res.data.members.map((obj) => ({
        //   id: obj,
        // }));
        // console.log(members);
        const members = res.data.map((obj) => ({
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          email: obj.user.email,
          image: obj.profile_pic,
        }));
        setMembers(members);
        console.log(members);
      });
  }, []);
  const navigate = useNavigate();
  const copyLink = (e) => {
    console.log(`${baseUrl}workspaces/workspaceowner/${params.id}/invite_link`);
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/invite_link/`)
      .then((res) => {
        console.log(res.data);
        navigator.clipboard.writeText(
          `localhost:3000/invite_page/${res.data}/`
        );
      });
  };
  const go_to_profile = (e) => {
    console.log(e.currentTarget.id);
    navigate(`/profile/${e.currentTarget.id}`);
    // navigate(`profileview/${e.currentTarget.id}/`);
  };
  return (
    <div className="main-div">
      {/* <div className="invite-person">
        <div className="invite-person-text">
          شما می توانید افراد را به این کارگاه دعوت کنید. ایمیل دعوت به آن‌ها
          ارسال خواهد شد.
        </div>
        <div className="invite-person-input-div">
          <input
            type="text"
            placeholder="ایمیل دعوت شخص"
            className="invite-person-input"
          />
          <label for="name" className="invite-person-label">
            ایمیل
          </label>
        </div>
      </div> */}
      <div className="copy-link">
        <div className="copy-link-text">
          <h2>
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
                    id={member.id}
                    key={member.id}
                    className="more-details"
                    role="button"
                    onClick={go_to_profile}
                  >
                    <span class="text">اطلاعات بیشتر</span>
                  </button>
                </td>
              </tr>
            ))}
            {/* <tr>
              <td className="list-item-prop hide-when-small">1</td>
              <td className="list-item-prop hide-when-small">
                <img className="member-image" src={x} />
              </td>
              <td className="list-item-prop">محمدرضا</td>
              <td className="list-item-prop hide-when-small">mohammadReza</td>
              <td className="list-item-prop">
                <button className="more-details" role="button">
                  <span class="text">اطلاعات بیشتر</span>
                </button>
              </td>
            </tr> */}
            {/* <tr class="active-row">
              <td className="list-item-prop">2</td>
              <td className="list-item-prop">رضا</td>
              <td className="list-item-prop">reza</td>
              <td className="list-item-prop">
                <button className="more-details" role="button">
                  <span class="text">اطلاعات بیشتر</span>
                </button>
              </td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
