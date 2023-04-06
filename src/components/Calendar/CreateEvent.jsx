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
import Modal from "@mui/material/Modal";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField.js";
import Loading from "../Shared/Loading";
import DateTimePickerValue from "../Shared/DateTimePicker";
import dayjs from "dayjs";
import "./CreateEvent.css";
import { convertNumberToPersian } from "../../utilities/helpers.js";

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

export default function CreateEvent({ calendarId }) {
  const [isPost, setIsPost] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventColor, setEventColor] = React.useState("#265D97");
  const [eventDate, setEventDate] = React.useState(dayjs("2022-04-17T15:30"));
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
  const handleClose = () => {
    setOpen(false);
  };
  const createEvent = (event) => {
    setIsPost(true);
    event.preventDefault();
    var event_time =
      eventDate.$y +
      "-" +
      (eventDate.$M + 1) +
      "-" +
      eventDate.$D +
      "T" +
      eventDate.$H +
      ":" +
      eventDate.$m +
      ":" +
      eventDate.$s +
      "Z";
    const form_data = new FormData();
    form_data.append("title", eventTitle);
    form_data.append("description", eventDescription);
    form_data.append("event_time", event_time);
    form_data.append("repeat_duration", repeatDuration);
    form_data.append("event_color", eventColor);
    if (eventType === "") form_data.append("custom_type", customType);
    if (customType === "") form_data.append("event_type", eventType);
    form_data.append("calendar", calendarId);
    console.log(form_data);
    apiInstance
      .post(`calendar/event/`, form_data)
      .then((res) => {
        // showToast("رویداد جدید با موفقیت اضافه شد");
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
      var repeat = event.target.checked ? 1 : 0;
      setRepeatDuration(repeat);
    }
    if (event.target.id == "weekly") {
      dailyRef.current.checked = false;
      monthlyRef.current.checked = false;
      var repeat = event.target.checked ? 7 : 0;
      setRepeatDuration(repeat);
    }
    if (event.target.id == "monthly") {
      weeklyRef.current.checked = false;
      dailyRef.current.checked = false;
      var repeat = event.target.checked ? 30 : 0;
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
      var type = event.target.checked ? "جلسه" : "";
      setEventType(type);
      setCustomType("");
    }
    if (event.target.id == "holidays") {
      meetingRef.current.checked = false;
      taskRef.current.checked = false;
      var type = event.target.checked ? "تعطیلات" : "";
      setEventType(type);
      setCustomType("");
    }
    if (event.target.id == "task") {
      meetingRef.current.checked = false;
      holidayRef.current.checked = false;
      var type = event.target.checked ? "فعالیت" : "";
      setEventType(type);
      setCustomType("");
    }
  };

  return (
    <div className="calendar_create_event-main-div">
      {isPost ? <Loading /> : null}
      <div>
        <EditIcon onClick={handleOpen} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
            ساخت رویداد جدید
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
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                />
                <br></br>
                <div className="calendar_create_event-check-inputs">
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
                      class="calendar_create_event-check-input-label"
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
                      class="calendar_create_event-check-input-label"
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
                      class="calendar_create_event-check-input-label"
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
                    value={repeatDuration}
                  />
                </div>
                <br></br>

                <div className="calendar_create_event-check-inputs">
                  <div class="checkbox-wrapper-47">
                    <input
                      type="checkbox"
                      name="cb"
                      id="meeting"
                      ref={meetingRef}
                      // value={isSubscribed}
                      onChange={handleEventTypeChange}
                    />
                    <label
                      for="meeting"
                      class="calendar_create_event-check-input-label"
                    >
                      جلسه
                    </label>
                  </div>

                  <div class="checkbox-wrapper-47">
                    <input
                      type="checkbox"
                      name="cb"
                      id="holidays"
                      ref={holidayRef}
                      onChange={handleEventTypeChange}
                    />
                    <label
                      for="holidays"
                      class="calendar_create_event-check-input-label"
                    >
                      تعطیلات
                    </label>
                  </div>

                  <div class="checkbox-wrapper-47">
                    <input
                      type="checkbox"
                      name="cb"
                      id="task"
                      ref={taskRef}
                      onChange={handleEventTypeChange}
                    />
                    <label
                      for="task"
                      class="calendar_create_event-check-input-label"
                    >
                      فعالیت
                    </label>
                  </div>
                  <StyledTextField
                    className="calendar_create_event-custom-type-input"
                    label="نوع رویداد"
                    value={convertNumberToPersian(customType)}
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
                <label class="calendar_create_event-check-input-label">
                  رنگ رویداد
                </label>
                <input
                  type="color"
                  value={eventColor}
                  onChange={(e) => setEventColor(e.target.value)}
                />
                <br></br>
                <br></br>
                <DateTimePickerValue
                  value={eventDate}
                  setValue={setEventDate}
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
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                />
                <br></br>
                <div className="calendar_create_event-button-div">
                  <input
                    style={{
                      fontFamily: "Vazir",
                    }}
                    type="submit"
                    value="ایجاد"
                    role="save_button"
                    className="calendar_create_event-button-29"
                    onClick={createEvent}
                  />
                </div>
              </div>
            </PerTextField>
          </form>
        </Box>
      </Modal>
    </div>
  );
}