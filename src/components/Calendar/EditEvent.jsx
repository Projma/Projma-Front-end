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
import "./CreateEvent.scss";
import { convertNumberToPersian } from "../../utilities/helpers";

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

export default function EditEvent({ eventId, calendarId, handleClose }) {
  const [isPost, setIsPost] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventColor, setEventColor] = React.useState("#265D97");
  const [eventDate, setEventDate] = React.useState("");
  const dailyRef = React.useRef();
  const weeklyRef = React.useRef();
  const monthlyRef = React.useRef();
  const meetingRef = React.useRef();
  const holidayRef = React.useRef();
  const taskRef = React.useRef();
  const [repeatDuration, setRepeatDuration] = useState(0);
  const [eventType, setEventType] = useState("");
  const [customType, setCustomType] = useState("");
  const [calEvent, setCalEvent] = useState({});
  const [editEvent, setEditEvent] = useState({});

  const handleOpen = () => {
    setEditEvent(calEvent);
    setOpen(true);
  };
  // const handleClose = () => {
  //   setOpen(false);
  // };
  useEffect(() => {
    setEditEvent(calEvent);
  }, [calEvent]);
  useEffect(() => {
    apiInstance.get(`calendar/event/${eventId}/`).then((res) => {
      setCalEvent(res.data);
    });
  }, []);
  const convertDateToString = (datee) => {
    var event_time =
      datee.$y +
      "-" +
      (datee.$M + 1) +
      "-" +
      datee.$D +
      "T" +
      datee.$H +
      ":" +
      datee.$m +
      ":" +
      datee.$s +
      "Z";
    return event_time;
  };
  const edit_event = (event) => {
    setIsPost(true);
    event.preventDefault();
    console.log(editEvent);
    var event_time = convertDateToString(eventDate);
    const form_data = new FormData();
    form_data.append("title", editEvent.title);
    form_data.append("description", editEvent.description);
    form_data.append("event_time", editEvent.event_time);
    form_data.append("repeat_duration", editEvent.repeat_duration);
    form_data.append("event_color", editEvent.event_color);
    if (editEvent.event_type === "")
      form_data.append("custom_event_type", editEvent.custom_event_type);
    if (editEvent.custom_event_type === "")
      form_data.append("event_type", editEvent.event_type);
    form_data.append("calendar", calendarId);
    console.log(form_data);
    apiInstance
      .put(`calendar/event/${eventId}/`, form_data)
      .then((res) => {
        // showToast("رویداد با موفقیت ویرایش شد");
        setCalEvent(res.data);
        handleClose();
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const handleChange = (event) => {
    if (event.target.id == "custom_repeat") {
      setEditEvent({
        ...editEvent,
        repeat_duration: event.target.value,
      });
      return;
    }
    if (!event.target.checked) {
      setEditEvent({
        ...editEvent,
        repeat_duration: 0,
      });
      return;
    }
    if (event.target.id == "daily") {
      setEditEvent({
        ...editEvent,
        repeat_duration: 1,
      });
    }
    if (event.target.id == "weekly") {
      setEditEvent({
        ...editEvent,
        repeat_duration: 7,
      });
    }
    if (event.target.id == "monthly") {
      setEditEvent({
        ...editEvent,
        repeat_duration: 30,
      });
    }
  };

  const handleEventTypeChange = (event) => {
    if (event.target.id == "custom_type") {
      setEditEvent({
        ...editEvent,
        custom_event_type: event.target.value,
        event_type: "",
      });
      return;
    }
    if (!event.target.checked) {
      setEditEvent({
        ...editEvent,
        event_type: "",
      });
    }
    if (event.target.id == "meeting") {
      setEditEvent({
        ...editEvent,
        event_type: "meeting",
        custom_event_type: "",
      });
    }
    if (event.target.id == "holidays") {
      setEditEvent({
        ...editEvent,
        event_type: "holidays",
        custom_event_type: "",
      });
    }
    if (event.target.id == "task") {
      setEditEvent({
        ...editEvent,
        event_type: "task",
        custom_event_type: "",
      });
    }
  };

  return (
    <div className="calendar_create_event-main-div">
      {isPost ? <Loading /> : null}
      <div>
        <EditIcon onClick={handleOpen} />
      </div>
      <Box sx={style}>
        <Typography
          variant="h6"
          id="modal-modal-title"
          component="h2"
          sx={{
            textAlign: "center",
            fontFamily: "Vazir",
            color: "#fff",
            fontSize: "109%",
          }}
          className="neonText"
        >
          ویرایش رویداد
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
            <div className="calendar_create_event-inputs">
              <StyledTextField
                className="calendar_create_event-input"
                label="عنوان رویداد"
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
                sx={{ textAlign: "center", fontFamily: "Vazir" }}
                value={editEvent?.title}
                onChange={(e) => {
                  setEditEvent({
                    ...editEvent,
                    title: e.target.value,
                  });
                }}
              />
              <br></br>
              <div className="calendar_create_event-check-inputs">
                <div className="checkbox-wrapper-47">
                  <input
                    type="checkbox"
                    name="cb"
                    id="daily"
                    ref={dailyRef}
                    checked={editEvent?.repeat_duration == 1 ? true : false}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="daily"
                    className="calendar_create_event-check-input-label"
                  >
                    روزانه
                  </label>
                </div>

                <div className="checkbox-wrapper-47">
                  <input
                    type="checkbox"
                    name="cb"
                    id="weekly"
                    ref={weeklyRef}
                    checked={editEvent?.repeat_duration == 7 ? true : false}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="weekly"
                    className="calendar_create_event-check-input-label"
                  >
                    هفتگی
                  </label>
                </div>

                <div className="checkbox-wrapper-47">
                  <input
                    type="checkbox"
                    name="cb"
                    id="monthly"
                    ref={monthlyRef}
                    checked={editEvent?.repeat_duration == 30 ? true : false}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="monthly"
                    className="calendar_create_event-check-input-label"
                  >
                    ماهانه
                  </label>
                </div>
                <input
                  type="number"
                  className="calendar_create_event-custom-repeat-input"
                  id="custom_repeat"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  renderValue={(p) => {
                    convertNumberToPersian(Number.toString(p));
                  }}
                  value={editEvent?.repeat_duration}
                />
              </div>
              <br></br>

              <div className="calendar_create_event-check-inputs">
                <div className="checkbox-wrapper-47">
                  <input
                    type="checkbox"
                    name="cb"
                    id="meeting"
                    ref={meetingRef}
                    checked={editEvent?.event_type == "meeting" ? true : false}
                    onChange={handleEventTypeChange}
                  />
                  <label
                    htmlFor="meeting"
                    className="calendar_create_event-check-input-label"
                  >
                    جلسه
                  </label>
                </div>

                <div className="checkbox-wrapper-47">
                  <input
                    type="checkbox"
                    name="cb"
                    id="holidays"
                    ref={holidayRef}
                    checked={editEvent?.event_type == "holidays" ? true : false}
                    onChange={handleEventTypeChange}
                  />
                  <label
                    htmlFor="holidays"
                    className="calendar_create_event-check-input-label"
                  >
                    تعطیلات
                  </label>
                </div>

                <div className="checkbox-wrapper-47">
                  <input
                    type="checkbox"
                    name="cb"
                    id="task"
                    ref={taskRef}
                    checked={editEvent?.event_type == "task" ? true : false}
                    onChange={handleEventTypeChange}
                  />
                  <label
                    htmlFor="task"
                    className="calendar_create_event-check-input-label"
                  >
                    فعالیت
                  </label>
                </div>
                <StyledTextField
                  className="calendar_create_event-custom-type-input"
                  label="نوع رویداد"
                  value={convertNumberToPersian(editEvent?.custom_event_type)}
                  onChange={(e) => {
                    handleEventTypeChange(e);
                  }}
                  id="custom_type"
                  sx={{
                    textAlign: "center",
                    fontFamily: "Vazir",
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
                />
              </div>

              <br></br>
              <label className="calendar_create_event-check-input-label">
                رنگ رویداد
              </label>
              <input
                type="color"
                value={editEvent?.event_color}
                onChange={(e) =>
                  setEditEvent({
                    ...editEvent,
                    event_color: e.target.value,
                  })
                }
              />
              <br></br>
              <br></br>
              <DateTimePickerValue
                value={dayjs(editEvent?.event_time)}
                setValue={(val) =>
                  setEditEvent({
                    ...editEvent,
                    event_time: convertDateToString(val),
                  })
                }
              />

              <StyledTextField
                className="calendar_create_event-input"
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
                value={convertNumberToPersian(editEvent?.description)}
                onChange={(e) =>
                  setEditEvent({
                    ...editEvent,
                    description: e.target.value,
                  })
                }
              />
              <br></br>
              <div className="calendar_create_event-button-div">
                <input
                  style={{
                    fontFamily: "Vazir",
                  }}
                  type="submit"
                  value="ذخیره"
                  role="save_button"
                  className="calendar_create_event-button-29"
                  onClick={edit_event}
                />
              </div>
            </div>
          </PerTextField>
        </form>
      </Box>
    </div>
  );
}
