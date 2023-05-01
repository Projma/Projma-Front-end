import * as React from "react";
import { useState, useSelector, useEffect } from "react";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { baseUrl } from "../../utilities/constants";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import apiInstance from "../../utilities/axiosConfig";
import Avatar from "@mui/material/Avatar";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField";
import Loading from "../Shared/Loading";
import DateTimePickerValue from "../Shared/DateTimePicker";
import dayjs from "dayjs";
import "./CreateMeeting.scss";
import { convertNumberToPersian } from "../../utilities/helpers";
import { InputLabel } from "@material-ui/core";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "38rem",
  height: "55rem",
  overflow: "auto",
  backgroundColor: "#001E3C",
  borderRadius: "1rem",
  boxShadow: 50,
  p: 4,
};

export default function CreateMeeting({ calendarId, handleClose, showToast }) {
  const [isPost, setIsPost] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventColor, setEventColor] = React.useState("#265D97");
  const date = new Date();
  const [startMeetingDate, setStartMeetingDate] = React.useState(
    dayjs(date.toISOString().split("T")[0] + `T00:00`)
  );
  const [endMeetingDate, setEndMeetingDate] = React.useState(
    dayjs(date.toISOString().split("T")[0] + `T00:00`)
  );
  const dailyRef = React.useRef();
  const weeklyRef = React.useRef();
  const monthlyRef = React.useRef();
  const meetingRef = React.useRef();
  const holidayRef = React.useRef();
  const taskRef = React.useRef();
  const [repeatDuration, setRepeatDuration] = useState(0);
  const [eventType, setEventType] = useState("");
  const [customType, setCustomType] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const createEvent = (event) => {
    setIsPost(true);
    event.preventDefault();
    var startMeetingTime = startMeetingDate.format("HH:mm:ss");
    var endMeetingTime = endMeetingDate.format("HH:mm:ss");
    var startMeetingDatee = startMeetingDate.format("YYYY-MM-DD");
    var endMeetingDatee = endMeetingDate.format("YYYY-MM-DD");
    const form_data = new FormData();
    form_data.append("title", eventTitle);
    form_data.append("description", eventDescription);
    form_data.append("start", startMeetingTime);
    form_data.append("end", endMeetingTime);
    form_data.append("from_date", startMeetingDatee);
    form_data.append("until_date", endMeetingDatee);
    form_data.append("repeat", repeatDuration);
    form_data.append("color", eventColor);
    // form_data.append("calendar", calendarId);
    console.log(form_data);
    apiInstance
      .post(`calendar/meeting/${calendarId}/create-meeting/`, form_data)
      .then((res) => {
        showToast("رویداد جدید با موفقیت اضافه شد");
        handleClose();
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const handleChange = (event) => {
    if (event.target.id == "custom_repeat") {
      dailyRef.current.checked = false;
      weeklyRef.current.checked = false;
      monthlyRef.current.checked = false;
      setRepeatDuration(event.target.value);
    }
    if (event.target.id == "daily") {
      weeklyRef.current.checked = false;
      monthlyRef.current.checked = false;
      const repeat = event.target.checked ? 1 : 0;
      setRepeatDuration(repeat);
    }
    if (event.target.id == "weekly") {
      dailyRef.current.checked = false;
      monthlyRef.current.checked = false;
      const repeat = event.target.checked ? 7 : 0;
      setRepeatDuration(repeat);
    }
    if (event.target.id == "monthly") {
      weeklyRef.current.checked = false;
      dailyRef.current.checked = false;
      const repeat = event.target.checked ? 30 : 0;
      setRepeatDuration(repeat);
    }
  };

  const handleEventTypeChange = (event) => {
    if (event.target.id == "custom_type") {
      meetingRef.current.checked = false;
      taskRef.current.checked = false;
      holidayRef.current.checked = false;
      setCustomType(event.target.value);
      setEventType("");
    }
    if (event.target.id == "meeting") {
      taskRef.current.checked = false;
      holidayRef.current.checked = false;
      const type = event.target.checked ? "meeting" : "";
      setEventType(type);
      setCustomType("");
    }
    if (event.target.id == "holidays") {
      meetingRef.current.checked = false;
      taskRef.current.checked = false;
      const type = event.target.checked ? "holidays" : "";
      setEventType(type);
      setCustomType("");
    }
    if (event.target.id == "task") {
      meetingRef.current.checked = false;
      holidayRef.current.checked = false;
      const type = event.target.checked ? "task" : "";
      setEventType(type);
      setCustomType("");
    }
  };

  return (
    <div className="calendar_create_meeting-main-div">
      {isPost ? <Loading /> : null}
      {/* <div>
        <EditIcon onClick={handleOpen} />
      </div> */}
      <Box sx={style}>
        <Typography
          variant="h6"
          id="modal-modal-title"
          component="h2"
          className="neonText calendar_create_meeting-title"
        >
          ساخت جلسه جدید
        </Typography>
        <Divider
          sx={{
            backgroundColor: "#007fff",
            marginTop: "5%",
            marginBottom: "8%",
          }}
        />
        <form className="board-form">
          <PerTextField>
            <div className="calendar_create_meeting-inputs">
              <StyledTextField
                className="calendar_create_meeting-input"
                label="عنوان رویداد"
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "100%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.5rem",
                  },
                }}
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
              />
              <br></br>
              <div className="calendar_create_meeting-check-inputs">
                <div className="flex">
                  <div class="checkbox-wrapper-47">
                    <input
                      type="checkbox"
                      name="cb"
                      id="daily"
                      ref={dailyRef}
                      // value={isSubscribed}
                      onChange={handleChange}
                    />
                    <label
                      for="daily"
                      class="calendar_create_meeting-check-input-label"
                    >
                      روزانه
                    </label>
                  </div>

                  <div class="checkbox-wrapper-47">
                    <input
                      type="checkbox"
                      name="cb"
                      id="weekly"
                      ref={weeklyRef}
                      onChange={handleChange}
                    />
                    <label
                      for="weekly"
                      class="calendar_create_meeting-check-input-label"
                    >
                      هفتگی
                    </label>
                  </div>

                  <div class="checkbox-wrapper-47">
                    <input
                      type="checkbox"
                      name="cb"
                      id="monthly"
                      ref={monthlyRef}
                      onChange={handleChange}
                    />
                    <label
                      for="monthly"
                      class="calendar_create_meeting-check-input-label"
                    >
                      ماهانه
                    </label>
                  </div>
                </div>
                <StyledTextField
                  type="number"
                  id="custom_repeat"
                  className="calendar--CreateMeeting-repeat-inputbox"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  renderValue={(p) => {
                    convertNumberToPersian(Number.toString(p));
                  }}
                  value={repeatDuration}
                />
              </div>
              <br></br>

              <br></br>
              <div className="calendar_create_meeting-check-inputs">
                <label class="calendar_create_meeting-check-input-label flex">
                  رنگ رویداد
                </label>
                <input
                  type="color"
                  className="flex"
                  value={eventColor}
                  onChange={(e) => setEventColor(e.target.value)}
                />
              </div>
              <br></br>
              <br></br>
              <DateTimePickerValue
                value={startMeetingDate}
                setValue={setStartMeetingDate}
              />
              <DateTimePickerValue
                value={endMeetingDate}
                setValue={setEndMeetingDate}
              />

              <StyledTextField
                className="calendar_create_meeting-input"
                label="توضیحات"
                sx={{
                  textAlign: "center",
                  fontFamily: "Vazir",
                  marginTop: "10%",
                }}
                InputLabelProps={{
                  style: { fontFamily: "Vazir", fontSize: "75%" },
                }}
                inputProps={{
                  style: {
                    height: "50px",
                    padding: "0 14px",
                    fontFamily: "Vazir",
                    fontSize: "1.5rem",
                  },
                }}
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
              />
              <br></br>
              <div className="calendar_create_meeting-button-div">
                <input
                  style={{
                    fontFamily: "Vazir",
                  }}
                  type="submit"
                  value="ایجاد"
                  role="save_button"
                  className="calendar_create_meeting-button-29"
                  onClick={createEvent}
                />
              </div>
            </div>
          </PerTextField>
        </form>
      </Box>
    </div>
  );
}
