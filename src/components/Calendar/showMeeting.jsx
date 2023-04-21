import * as React from "react";
import apiInstance from "../../utilities/axiosConfig";
import { prefixer } from "stylis";
import { ToastContainer, toast } from "react-toastify";
import "./showEvent.scss";
import EditEvent from "./EditEvent";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
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
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ShowMeeting({
  meetingId,
  calendarId,
  handleCloseShowEvent,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [event, setEvent] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [color, setColor] = React.useState("");
  const [time, setTime] = React.useState("");
  const [repeat, setRepeat] = React.useState("");
  const [eventType, setEventType] = React.useState("");
  const [customEventTypes, setCustomEventTypes] = React.useState("");
  const [startMeetingTime, setStartMeetingTime] = React.useState("");
  const [endMeetingTime, setEndMeetingTime] = React.useState("");
  const [meetingLink, setMeetingLink] = React.useState("");
  const [startMeetingDate, setStartMeetingDate] = React.useState("");
  const [endMeetingDate, setEndMeetingDate] = React.useState("");

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
    handleCloseShowEvent();
    console.log("close");
    setAnchorEl(null);
  };

  React.useEffect(() => {
    setLoading(true);
    apiInstance
      .get(`/calendar/meeting/${meetingId}/get-meeting/`)
      .then((res) => {
        // console.log(res);
        setEvent(res.data);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setColor(res.data.event_color);
        // setDate(res.data.date);
        setTime(res.data.event_time);
        setRepeat(res.data.repeat_duration);
        setEventType(res.data.event_type);
        setCustomEventTypes(res.data.custom_event_type);
      })
      .catch((err) => {
        ////console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleExistMeeting = () => {
    apiInstance
      .get(`/calendar/meeting/${meetingId}/start-meeting/`)
      .then((res) => {
        // console.log(res);
        setStartMeetingTime(res.data.start);
        setEndMeetingTime(res.data.end);
        setMeetingLink(res.data.meeting_link);
        setStartMeetingDate(res.data.from_date);
        setEndMeetingDate(res.data.until_date);
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const navigate = useNavigate();
  const handleCreateSkyroom = () => {
    handleExistMeeting();
    if (meetingLink != "") {
      navigate(`${meetingLink}`);
    }
  };

  const handleOpenSkyroom = () => {
    if (meetingLink != "") {
      navigate(`${meetingLink}`);
    }
  };

  const handleDeleteSkyroom = () => {
    apiInstance
      .delete(`/calendar/meeting/${meetingId}/end-meeting/`)
      .then((res) => {
        toast.success("حذف جلسه با موفقیت انجام شد");
        window.location.href = "/calendar";
      })
      .catch((err) => {
        toast.error("خطا در حذف جلسه");
      });
  };

  const selectEventType = () => {
    if (customEventTypes) {
      return customEventTypes;
    } else {
      return eventType;
    }
  };

  const partitionDateAndTime = (time) => {
    if (time) {
      const date = time.split("T")[0];
      const timeWithoutSeconds = time
        .split("T")[1]
        .split(":")
        .slice(0, 2)
        .join(":");
      return [date, timeWithoutSeconds];
    } else {
      return ["", ""];
    }
  };

  const deleteEvent = () => {
    apiInstance
      .delete(`/calendar/event/${meetingId}/`)
      .then((res) => {
        toast.success("حذف رویداد با موفقیت انجام شد");
        window.location.href = "/calendar";
      })
      .catch((err) => {
        toast.error("خطا در حذف رویداد");
      });
  };

  // if repeat=1 => return روزانه else if repeat=7 => return هفتگی else if repeat=30 => return ماهانه else return "هر repeat رروز یکبار"
  const selectRepeat = () => {
    if (repeat == 1) {
      return "روزانه";
    } else if (repeat == 7) {
      return "هفتگی";
    } else if (repeat == 30) {
      return "ماهانه";
    } else if (repeat == 365) {
      return "سالانه";
    }
    return `هر ${repeat} روز یکبار`;
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
                // onClick={onClick}
                style={buttonStyle}
              />
            </i>
            <i className="fas fa-calendar-alt">
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloseIcon />}
                onClick={(e) => handleClose(e)}
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
              {title}
            </div>
          </div>
          <div className="calendar--showEvent-container--body">
            <div className="calendar--showEvent-container--body--time">
              <div className="calendar--showEvent-container--body--time--icon">
                <CalendarTodayIcon style={{ fontSize: "26px" }} />
              </div>
              <div className="calendar--showEvent-container--body--time--text">
                تاریخ
              </div>
              <div className="calendar--showEvent-container--body--time--text--date">
                {convertNumberToPersian(partitionDateAndTime(time)[0])}
              </div>
              <div className="calendar--showEvent-container--body--time--text">
                ساعت
              </div>
              <div className="calendar--showEvent-container--body--time--text--time">
                {convertNumberToPersian(partitionDateAndTime(time)[1])}
              </div>
            </div>
            <div className="calendar--showEvent-container--body--eventType">
              <div className="calendar--showEvent-container--body--eventType--icon">
                <EventIcon style={{ fontSize: "26px" }} />
              </div>
              <div className="calendar--showEvent-container--body--eventType--text">
                {/* handle time is null */}

                {convertNumberToPersian(selectEventType())}
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
                {description}
              </div>
            </div>
            {/* add mui button for start meeting room */}
          </div>
          <div>
            {meetingLink == "" ? (
              <div className="calendar_create_meeting-button-div">
                <input
                  style={{
                    fontFamily: "Vazir",
                  }}
                  type="submit"
                  value="ایجاد"
                  role="save_button"
                  className="calendar_create_event-button-29"
                  onClick={handleCreateSkyroom}
                />
              </div>
            ) : (
              <div className="calendar_create_event-button-div">
                <input
                  style={{
                    fontFamily: "Vazir",
                  }}
                  type="submit"
                  value="ورود"
                  role="save_button"
                  className="calendar_create_event-button-29"
                  onClick={handleOpenSkyroom}
                />
                <input
                  style={{
                    fontFamily: "Vazir",
                  }}
                  type="submit"
                  value="حذف"
                  role="save_button"
                  className="calendar_create_event-button-29"
                  onClick={handleDeleteSkyroom}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </Box>
  );
}
