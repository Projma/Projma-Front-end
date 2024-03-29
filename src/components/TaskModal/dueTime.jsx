import * as React from "react";
import Modal from "../Asset/Modal";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.scss";
import "./DueTime.scss";
import "./Members.scss";
import { useEffect } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Calendar } from "react-multi-date-picker";
import Loading from "../Shared/Loading";
import useTheme from "../../hooks/useTheme";

export default function DueTime({ params, dueDate, setDueTime }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(new Date());
  const [isPost, setIsPost] = React.useState(false);
  const [changeDate, setChangeDate] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { theme, getColor } = useTheme();
  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitDate = () => {
    handleClose();
    const startDate = new Date();
    let date = "";
    if (!value.toString().includes("Standard")) {
      date = `${value.year}-${value.month.number}-${value.day}`;
    }
    setDueTime(date.replaceAll("-", "/"));
    setIsPost(true);
    apiInstance
      .patch(`/task/${params.task_id}/update-task/`, {
        end_date: date,
        start_date: miladi_be_shamsi(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          startDate.getDate()
        ),
      })
      .then((res) => {
        //console.log(res);
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  useEffect(() => {
    apiInstance.get(`/task/${params.task_id}/get-task/`).then((res) => {
      // ////console.log(res);
      const doer = res.data.doers.map((item) => ({
        email: item.email,
        userName: item.username,
        firstName: item.first_name,
        lastName: item.last_name,
        image: item.profile_pic,
      }));
      setListOfDoers(doer);
    });
    apiInstance.get(`/board/${params.board_id}/members/`).then((res) => {
      // ////console.log(res);
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
  const id = open ? "simple-popover" : undefined;
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        ?.toUpperCase()
    );
  };

  return (
    <div className="taskmodal--flexibale-icon" style={{ width: "100%" }}>
      {isPost ? <Loading /> : null}
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        style={{ width: "100%" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
            width: "100%",
          }}
        >
          <AccessTimeIcon rotate="90"></AccessTimeIcon>{" "}
          <div className="taskmodal--smaller-button">زمان اتمام</div>
        </div>
      </Button>
      <Modal id={id} open={open} onClose={handleClose}>
        <div className="tm-members-main-div">
          <header className="tm-members-header">
            <h2
              className="tm-duetime-header-title "
              style={{ color: getColor(theme.minorBg) }}
            >
              زمان اتمام
            </h2>
            <Divider sx={{ backgroundColor: "black" }} />
          </header>
          <div className="taskmodal--duetime-body">
            <Calendar
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
          <div className="taskmodal--duetime-text">
            <div style={{ color: getColor(theme.minorBg) }}>زمان اتمام</div>
            {!value.toString().includes("Standard") ? (
              <div
                className="taskmodal--duetime-showDate"
                style={{ padding: "6%" }}
              >
                <div style={{ color: getColor(theme.minorBg) }}>
                  {value?.year + "/" + value?.month?.number + "/" + value?.day}
                </div>
              </div>
            ) : (
              <div
                className="taskmodal--duetime-showDate"
                style={{ padding: "6%" }}
              >
                {dueDate.toString() != "null" ? (
                  <div style={{ color: getColor(theme.minorBg) }}>
                    {dueDate.toString().replaceAll("-", "/")}
                  </div>
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
      </Modal>
    </div>
  );
}

function miladi_be_shamsi(gy, gm, gd) {
  var g_d_m, jy, jm, jd, gy2, days;
  g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  gy2 = gm > 2 ? gy + 1 : gy;
  days =
    355666 +
    365 * gy +
    ~~((gy2 + 3) / 4) -
    ~~((gy2 + 99) / 100) +
    ~~((gy2 + 399) / 400) +
    gd +
    g_d_m[gm - 1];
  jy = -1595 + 33 * ~~(days / 12053);
  days %= 12053;
  jy += 4 * ~~(days / 1461);
  days %= 1461;
  if (days > 365) {
    jy += ~~((days - 1) / 365);
    days = (days - 1) % 365;
  }
  if (days < 186) {
    jm = 1 + ~~(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + ~~((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }
  return jy + "-" + jm + "-" + jd;
}
