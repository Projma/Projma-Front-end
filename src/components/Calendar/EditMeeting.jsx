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
import PerTextField from "../Shared/PerTextField.js";
import Loading from "../Shared/Loading";
import DateTimePickerValue from "../Shared/DateTimePicker";
import dayjs from "dayjs";
import "./CreateMeeting.scss";
import { convertNumberToPersian } from "../../utilities/helpers.js";
import { InputLabel } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";

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

const buttonStyle = {
  backgroundColor: "transparent",
  width: "20px",
  justifyContent: "center",
};

export default function EditMeeting({
  calendarId,
  handleClose,
  showToast,
  meetingId,
}) {
  const [isPost, setIsPost] = useState(false);
  const [open, setOpen] = React.useState(false);
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
  const [repeatDuration, setRepeatDuration] = useState(0);
  const [editMeeting, setEditMeeting] = useState({});

  React.useEffect(() => {
    apiInstance
      .get(`/calendar/meeting/${meetingId}/get-meeting/`)
      .then((res) => {
        console.log(res.data);
        setEditMeeting(res.data);
        setStartMeetingDate(dayjs(res.data.from_date + "T" + res.data.start));
        setEndMeetingDate(dayjs(res.data.until_date + "T" + res.data.end));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleEditEvent = (event) => {
    setIsPost(true);
    event.preventDefault();
    const startMeetingTime = startMeetingDate.format("HH:mm");
    const endMeetingTime = endMeetingDate.format("HH:mm");
    const startMeetingDatee = startMeetingDate.format("YYYY-MM-DD");
    const endMeetingDatee = endMeetingDate.format("YYYY-MM-DD");
    const form_data = new FormData();
    form_data.append("title", editMeeting.title);
    form_data.append("description", editMeeting.description);
    form_data.append("start", startMeetingTime);
    form_data.append("end", endMeetingTime);
    form_data.append("from_date", startMeetingDatee);
    form_data.append("until_date", endMeetingDatee);
    form_data.append("repeat", editMeeting.repeat);
    form_data.append("color", editMeeting.color);
    console.log(form_data);
    apiInstance
      .patch(`calendar/meeting/${meetingId}/edit-meeting/`, form_data)
      .then((res) => {
        // showToast("رویداد جدید با موفقیت اضافه شد");
        handleClose();
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  const handleChange = (meeting) => {
    if (parseInt(EditMeeting.repeat) == 1) {
      weeklyRef.current.checked = false;
      monthlyRef.current.checked = false;
      // convert meeting.repeat to integer
      const repeat = parseInt(EditMeeting.repeat) ? 1 : 0;
      setRepeatDuration(repeat);
    } else if (parseInt(EditMeeting.repeat) == 7) {
      dailyRef.current.checked = false;
      monthlyRef.current.checked = false;
      const repeat = parseInt(EditMeeting.repeat) ? 7 : 0;
      setRepeatDuration(repeat);
    } else if (parseInt(EditMeeting.repeat) == 30) {
      weeklyRef.current.checked = false;
      dailyRef.current.checked = false;
      const repeat = parseInt(EditMeeting.repeat) ? 30 : 0;
      setRepeatDuration(repeat);
    } else {
      weeklyRef.current.checked = false;
      dailyRef.current.checked = false;
      monthlyRef.current.checked = false;
      const repeat = parseInt(EditMeeting.repeat) ? 0 : 0;
      setRepeatDuration(repeat);
    }
  };

  return (
    <div className="calendar_create_meeting-main-div">
      {isPost ? <Loading /> : null}
      <Box sx={style}>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<CloseIcon />}
            onClick={handleClose}
            style={buttonStyle}
          />
        </div>
        <Typography
          variant="h6"
          id="modal-modal-title"
          component="h2"
          className="neonText calendar_create_meeting-title"
        >
          ویرایش جلسه
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
                value={editMeeting?.title}
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
                onChange={(e) => {
                  setEditMeeting({
                    ...editMeeting,
                    title: e.target.value,
                  });
                }}
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
                      checked={editMeeting?.repeat == 1 ? true : false}
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
                      checked={editMeeting?.repeat == 7 ? true : false}
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
                      checked={editMeeting?.repeat == 30 ? true : false}
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
                  value={EditMeeting.repeat}
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
                  value={editMeeting?.color}
                  onChange={(e) =>
                    setEditMeeting({
                      ...editMeeting,
                      color: e.target.value,
                    })
                  }
                />
              </div>
              <br></br>
              <br></br>
              <DateTimePickerValue
                value={startMeetingDate}
                setValue={(val) =>
                  setStartMeetingDate(val.format("YYYY-MM-DDTHH:mm"))
                }
              />
              <DateTimePickerValue
                value={endMeetingDate}
                setValue={(val) =>
                  setEndMeetingDate(val.format("YYYY-MM-DDTHH:mm"))
                }
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
                value={editMeeting?.description}
                onChange={(e) =>
                  setEditMeeting({
                    ...editMeeting,
                    description: e.target.value,
                  })
                }
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
                  onClick={handleEditEvent}
                />
              </div>
            </div>
          </PerTextField>
        </form>
      </Box>
    </div>
  );
}
