import * as React from "react";
import apiInstance from "../../utilities/axiosConfig";
import { prefixer } from "stylis";
import {  toast } from "react-toastify";
import "./showEvent.scss";
import EditEvent from "./EditEvent";

import { useParams , useNavigate } from "react-router-dom";
import { convertNumberToPersian } from "../../utilities/helpers";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import EventIcon from "@mui/icons-material/Event";
import RepeatIcon from "@mui/icons-material/Repeat";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import { Box, Typography } from "@mui/material";

import "./ShowMeeting.scss";

export default function ShowMeeting({
  meetingId,
  calendarId,
  handleShowMeeting,
  handleOpenEditMeeting,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [color, setColor] = React.useState("");
  const [meetingLink, setMeetingLink] = React.useState("");
  const [startMeetingDate, setStartMeetingDate] = React.useState("");
  const [endMeetingDate, setEndMeetingDate] = React.useState("");
  const [meeting, setMeeting] = React.useState({});
  const [changeStatus, setChangeStatus] = React.useState(false);
  const [Loading, setLoading] = React.useState(false);
  const [skyroomMeeting, setSkyroomMeeting] = React.useState({});
  const [currentTime, setCurrentTime] = React.useState(
    new Date().toLocaleTimeString()
  );
  const [currentDate, setCurrentDate] = React.useState(
    new Date().toLocaleDateString()
  );

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40rem",
    height: "50rem",
    overflow: "auto",
    // backgroundColor: "#001E3C",
    borderRadius: "1rem",
    boxShadow: 50,
    p: 4,
  };

  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    // handleCloseShowEvent();
    console.log("close");
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setLoading(true);
    apiInstance
      .get(`/calendar/meeting/${meetingId}/get-meeting/`)
      .then((res) => {
        setMeeting(res.data);
        setMeetingLink(res.data.link);
        setStartMeetingDate(res.data.from_date);
        setEndMeetingDate(res.data.until_date);
        console.log(meeting);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [changeStatus]);

  const handleExistMeeting = () => {
    console.log("handleExistMeeting");
    apiInstance
      .get(`/calendar/meeting/${meetingId}/start-meeting/`)
      .then((res) => {
        console.log(res);
        setSkyroomMeeting(res.data);
        setChangeStatus(!changeStatus);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateSkyroom = () => {
    handleExistMeeting();
  };

  const handleButtonClick = (site) => {
    window.location.href = site;
  };

  const checkAccess = () => {
    console.log("checkAccess");
    if (meeting.start != null) {
      // console.log(currentDate);
      // console.log(meeting.from_date);
      console.log(currentTime.split(":")[0]);
      console.log(meeting.start.split(":")[0]);
      if (
        parseInt(meeting.from_date.split("-")[2]) ==
          parseInt(currentDate.split("/")[1]) &&
        parseInt(meeting.from_date.split("-")[0]) ==
          parseInt(currentDate.split("/")[2]) &&
        parseInt(meeting.from_date.split("-")[1]) ==
          parseInt(currentDate.split("/")[0])
      ) {
        return true;
      }
    }
    return false;
  };

  const handleOpenSkyroom = () => {
    console.log("handleOpenSkyroom");
    console.log(meeting);
    if (meetingLink != "") {
      handleButtonClick(meeting.link);
    }
  };

  const handleDeleteSkyroom = () => {
    apiInstance
      .get(`/calendar/meeting/${meetingId}/end-meeting/`)
      .then((res) => {
        toast.success("حذف جلسه با موفقیت انجام شد");
        setChangeStatus(!changeStatus);
      })
      .catch((err) => {
        toast.error("خطا در حذف جلسه");
      });
  };

  const selectRepeat = () => {
    if (meeting.repeat == 1) {
      return "روزانه";
    } else if (meeting.repeat == 7) {
      return "هفتگی";
    } else if (meeting.repeat == 30) {
      return "ماهانه";
    } else if (meeting.repeat == 365) {
      return "سالانه";
    }
    return `هر ${meeting.repeat} روز یکبار`;
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    width: "20px",
    justifyContent: "center",
  };

  return (
    <Box style={style}>
      <div className="calendar--showEvent-page">
        <div
          className="calendar--showEvent-container"
          style={{ width: "100%" }}
        >
          <div className="calendar--mainIcon">
            <i className="fas fa-calendar-alt">
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleOpenEditMeeting}
                style={buttonStyle}
              />
            </i>
            <i className="fas fa-calendar-alt">
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloseIcon />}
                onClick={handleShowMeeting}
                style={buttonStyle}
              />
            </i>
          </div>
          <div className="calendar--showEvent-container--header">
            <div
              className="calendar--showEvent-container--header--circleColor"
              style={{ backgroundColor: color }}
            ></div>
            <div className="calendar--showEvent-container--header--title neonText">
              {meeting.title}
            </div>
          </div>
          <div className="calendar--showEvent-container--body">
            <div className="calendar--showEvent-container--body--time">
              <div className="calendar--showEvent-container--body--time--icon">
                <CalendarTodayIcon style={{ fontSize: "26px" }} />
              </div>
              <div className="calendar--showMeeting-container--body--time--text">
                از تاریخ
              </div>
              <div className="calendar--showEvent-container--body--time--text--date">
                {convertNumberToPersian(meeting.from_date)}
              </div>
              <div className="calendar--showEvent-container--body--time--text">
                ساعت
              </div>
              <div className="calendar--showEvent-container--body--time--text--time">
                {convertNumberToPersian(meeting.start)}
              </div>
            </div>
            <div className="calendar--showEvent-container--body--time">
              <div
                className="calendar--showMeeting-container--body--time--text"
                style={{ marginRight: "14%" }}
              >
                تا تاریخ
              </div>
              <div className="calendar--showEvent-container--body--time--text--date">
                {convertNumberToPersian(meeting.until_date)}
              </div>
              <div className="calendar--showEvent-container--body--time--text">
                ساعت
              </div>
              <div className="calendar--showEvent-container--body--time--text--time">
                {convertNumberToPersian(meeting.end)}
              </div>
            </div>
            <div className="calendar--showEvent-container--body--repeat">
              <div className="calendar--showEvent-container--body--repeat--icon">
                <RepeatIcon style={{ fontSize: "26px" }} />
              </div>
              <div className="calendar--showEvent-container--body--repeat--text">
                {convertNumberToPersian(selectRepeat())}
              </div>
            </div>
            <div className="calendar--showEvent-container--body--description">
              <div className="calendar--showEvent-container--body--description--icon">
                <DescriptionIcon style={{ fontSize: "26px" }} />
              </div>
              <div className="calendar--showEvent-container--body--description--text">
                {meeting.description}
              </div>
            </div>
            {/* add mui button for start meeting room */}
          </div>
          <div>
            {checkAccess() ? (
              <div>
                {meeting.status == "NOTSTARTED" ? (
                  <div className="calendar_create_meeting-button-div">
                    <input
                      style={{
                        fontFamily: "Vazir",
                      }}
                      type="submit"
                      value="شروع جلسه"
                      role="save_button"
                      className="calendar_create_event-button-29"
                      onClick={handleCreateSkyroom}
                    />
                  </div>
                ) : (
                  <div>
                    {meeting.status == "HOLDONG" ? (
                      <div className="calendar_create_event-button-div">
                        <input
                          style={{
                            fontFamily: "Vazir",
                          }}
                          type="submit"
                          value="ورود به جلسه"
                          role="save_button"
                          className="calendar_create_event-button-29"
                          onClick={handleOpenSkyroom}
                        />
                        <input
                          style={{
                            fontFamily: "Vazir",
                          }}
                          type="submit"
                          value="اتمام جلسه"
                          role="save_button"
                          className="calendar_create_event-button-29"
                          onClick={handleDeleteSkyroom}
                        />
                      </div>
                    ) : (
                      <Typography
                        variant="h6"
                        className="calendar--showMeeting-Finished"
                      >
                        این جلسه به پایان رسیده است
                      </Typography>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="calendar--showMeeting-Finished">
                جلسه 5 دقیقه قبل از زمان شروع باز می‌شود
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}
