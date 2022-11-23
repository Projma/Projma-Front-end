import React from "react";
import Divider from "@mui/material/Divider";
import axios from "axios";
import "./Members.scss";
import x from "../../../static/images/workspace_management/members/mohammadi.jpg";
const Members = () => {
  const [members, setMembers] = React.useState([]);
  axios
    .get("http://localhost:3000/api/v1/members", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      const members = res.data.map((obj) => ({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email,
        image: obj.image,
      }));
      setMembers(members);
      console.log(res.data);
    });
  return (
    <div className="main-div">
      <div className="invite-person">
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
      </div>
      <Divider
        sx={{
          backgroundColor: "#9b9b9b",
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
              <th className="list-item-prop">عکس</th>
              <th className="list-item-prop">نام</th>
              <th className="list-item-prop">ایمیل</th>
              <th className="list-item-prop">نقش</th>
              <th className="list-item-prop">عملیات</th>
              <th className="list-item-prop">ادمین</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr>
                <td className="list-item-prop">
                  <img src={member.image} className="member-image" />
                </td>
                <td className="list-item-prop">
                  {member.firstName} {member.lastName}
                </td>
                <td className="list-item-prop">{member.email}</td>
              </tr>
            ))}
            {/* <tr>
              <td className="list-item-prop">
                <img className="member-image" src={x} />
              </td>
              <td className="list-item-prop">محمدرضا</td>
              <td className="list-item-prop">mohammadReza</td>
              <td className="list-item-prop">مدیر</td>
              <td className="list-item-prop">حذف</td>
              <td className="list-item-prop">بله</td>
            </tr>
            <tr class="active-row">
              <td className="list-item-prop">2</td>
              <td className="list-item-prop">رضا</td>
              <td className="list-item-prop">reza</td>
              <td className="list-item-prop">کاربر</td>
              <td className="list-item-prop">حذف</td>
              <td className="list-item-prop">خیر</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
