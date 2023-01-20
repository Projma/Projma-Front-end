import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./DueTime.scss";
import "./Members.scss";
import { CheckBox } from "@mui/icons-material";
import { waitFor } from "@testing-library/react";
import PersonIcon from "@mui/icons-material/Person";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";
import { DatePicker } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Calendar } from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import "./calendar.css";
export default function DueTime({ params, dueDate, setDueTime }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [changeMemberStatus, setChangeMemberStatus] = React.useState(false);
  const [value, setValue] = React.useState(new Date());
  const [date, setDate] = React.useState(dueDate);
  const [changeDate, setChangeDate] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const submitDate = () => {
    handleClose();
    //console.log(value);
    let date = "";
    if (!value.toString().includes("Standard")) {
      date = `${value.year}-${value.month.number}-${value.day}`;
    }
    setDueTime(date.replaceAll("-", "/"));
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/update-task/`, {
        end_date: date,
      })
      .then((res) => {
        //console.log(res);
      });
  };
  useEffect(() => {
    apiInstance
      .get(`/workspaces/task/${params.task_id}/get-task/`)
      .then((res) => {
        // //console.log(res);
        const doer = res.data.doers.map((item) => ({
          email: item.email,
          userName: item.username,
          firstName: item.first_name,
          lastName: item.last_name,
          image: item.profile_pic,
        }));
        setListOfDoers(doer);
      });
    apiInstance
      .get(`/workspaces/board/${params.board_id}/members/`)
      .then((res) => {
        // //console.log(res);
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic,
        }));
        setListOfMembers(members);
      });
  }, []);

  const [ListOfMembers, setListOfMembers] = React.useState([]);
  const [ListOfDoers, setListOfDoers] = React.useState([]);
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  return (
    <div style={{ width: "100%", marginBottom: "3%" }}>
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
          borderRadius: "35px",
          display: "flex",
          justifyContent: "start",
        }}
      >
        <AccessTimeIcon rotate="90" fontSize="large"></AccessTimeIcon>{" "}
        <div className="taskmodal-smaller-button">زمان اتمام</div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="tm-members-main-div">
          <header className="tm-members-header">
            <h2 className="tm-duetime-header-title">زمان اتمام</h2>
            <Divider sx={{ backgroundColor: "black" }} />
          </header>
          <div className="taskmodal-duetime-body">
            <Calendar
              className="background-blue"
              value={value}
              onChange={(val) => {
                setValue(val);
                setChangeDate(true);
              }}
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-right"
            />
          </div>
          <div className="duetime-text">
            <div>زمان اتمام</div>
            {!value.toString().includes("Standard") ? (
              <div className="duetime-showDate">
                <div>
                  {value?.year + "/" + value?.month?.number + "/" + value?.day}
                </div>
              </div>
            ) : (
              <div className="duetime-showDate">
                {dueDate !== null ? (
                  <div>{dueDate.toString().replaceAll("-", "/")}</div>
                ) : (
                  <div></div>
                )}
              </div>
            )}
            {changeDate ? (
              <div style={{ width: "100%", display: "flex", direction: "ltr" }}>
                <Button
                  variant="contained"
                  dir
                  className="flex Vazir duetime-submit"
                  onClick={submitDate}
                >
                  ثبت
                </Button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
}
