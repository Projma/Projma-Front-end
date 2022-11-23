import React from "react";
import { useState, useEffect } from "react";
import Divider from "@mui/material/Divider";
import apiInstance from "../../../utilities/axiosConfig";
import "./Members.scss";
import x from "../../../static/images/workspace_management/members/mohammadi.jpg";

const Members = () => {
  const [members, setMembers] = React.useState([]);
  useEffect(() => {
    apiInstance.get("/api/v1/members/").then((res) => {
      const members = res.data.map((obj) => ({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        image: obj.image,
      }));
      setMembers(members);
      console.log(res.data);
    });
  }, []);
  const copyLink = (e) => {
    apiInstance.get("/workspaces/workspaces/{id}/invite_link").then((res) => {
      console.log(res.data);
      navigator.clipboard.writeText("http://localhost:3000/invite/123456789");
    });
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
        <button onClick={copyLink} style={{ color: "black" }}>
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
            {/* {members.map((member, idx) => (
              <tr>
                <td className="hide-when-small">{idx + 1}</td>
                <td className="list-item-prop hide-when-small">
                  <img src={member.image} className="member-image" />
                </td>
                <td className="list-item-prop">
                  {member.firstName} {member.lastName}
                </td>
                <td className="list-item-prop hide-when-small">{member.email}</td>
                <td className="list-item-prop">
                  <button className="more-details" role="button">
                    <span class="text">اطلاعات بیشتر</span>
                  </button>
                </td>
              </tr>
            ))} */}
            <tr>
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
            </tr>
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
