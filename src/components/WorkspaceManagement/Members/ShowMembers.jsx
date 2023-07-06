import React from "react";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import DeleteDialog from "./DeleteDialog";
import "./Members.scss";
import { convertNumberToPersian } from "../../../utilities/helpers";
import useTheme from "../../../hooks/useTheme";

const ShowMembers = ({ members, go_to_profile, removeMember }) => {
  const {theme, getColor} = useTheme();
  return (
    <div className="members">
      <table className="styled-table" style={{backgroundColor: theme.minorBg, borderColor: theme.primary, color: getColor(theme.minorBg)}}>
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
              <td className="list-item-prop" role="fullname">
                {member.firstName} {member.lastName}
              </td>
              <td className="list-item-prop hide-when-small" role="email_input">
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
                    <span className="text">پروفایل</span>
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
  );
};

export default ShowMembers;
