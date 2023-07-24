import * as React from "react";
import { useState, useEffect } from "react";
import apiInstance from "../../../../utilities/axiosConfig";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./FilterTask.scss";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import useTheme from "../../../../hooks/useTheme";
import Loading from "../../../Shared/Loading";
const ShowMembersInFilter = ({
  boardMembers,
  selectedMembers,
  setSelectedMembers,
  setBoardMembers,
  filterTaskAfterCheck,
  filterTaskAfterUnCheck,
}) => {
  const {theme,getColor} = useTheme();
  return (
    <div>
      {boardMembers.map((member) => (
        <div style={{ marginTop: "5px", display: "flex", columnGap: "6%" ,color: getColor(theme.minorBg)}}>
          <input
            style={{ display: "flex",color: getColor(theme.minorBg) }}
            type="checkbox"
            id={member.id}
            name={member.name}
            value={member.id}
            checked={member.checked}
            role="members"
            onChange={(e) => {
              if (e.target.checked) {
                setSelectedMembers([...selectedMembers, e.target.value]);
                setBoardMembers((prevState) =>
                  prevState.map((item) => {
                    if (item.id === parseInt(e.target.value)) {
                      item.checked = true;
                    }
                    return item;
                  })
                );
                filterTaskAfterCheck(e.target.value, "member");
              } else {
                setSelectedMembers((prevState) =>
                  prevState.filter((item) => item !== e.target.value)
                );
                setBoardMembers((prevState) =>
                  prevState.map((item) => {
                    if (item.id === parseInt(e.target.value)) {
                      item.checked = false;
                    }
                    return item;
                  })
                );
                filterTaskAfterUnCheck(e.target.value, "member");
              }
            }}
          />

          <p style={{ display: "flex", color: getColor(theme.minorBg) }}>
            <div style={{ fontSize: "13px" }}>{member.full_name}</div>
            {/* <div style={{ fontSize: "13px" }}>{member.username}</div> */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ShowMembersInFilter;
