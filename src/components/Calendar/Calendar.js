import "./Calendar.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import faLocale from "@fullcalendar/core/locales/fa";
import { useProSidebar } from "react-pro-sidebar";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { CleaningServices } from "@mui/icons-material";
import { wait } from "@testing-library/user-event/dist/utils";
import CreateEvent from "./CreateEvent";
import Modal from "@mui/material/Modal";
import ShowEvent from "./showEvent";
import useBoard from "../../hooks/useBoard";
import apiInstance from "../../utilities/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import CreateMeeting from "./CreateMeeting";

const Calendar = () => {
  const { collapsed } = useProSidebar();
  const { boardId, getBoard, calendar } = useBoard();
  const [calendarId, setCalendarId] = useState(calendar);
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [openCreateMeeting, setOpenCreateMeeting] = useState(false);
  const [openShowEvent, setOpenShowEvent] = useState(false);
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState(0);
  useEffect(() => {}, [collapsed]);
  const handleAddEvent = (e) => {
    setOpenAddEvent(!openAddEvent);
  };
  const handleCreateMeeting = (e) => {
    setOpenCreateMeeting(!openCreateMeeting);
  };
  const handleCloseAddEvent = () => {
    setOpenAddEvent(false);
    console.log(calendarId);
  };
  const handleCloseCreateMeeting = () => {
    setOpenCreateMeeting(false);
  };
  const handleShowEvent = (e) => {
    console.log(e.event._def.extendedProps.eventId);
    setEventId(e.event._def.extendedProps.eventId);
    setOpenShowEvent(!openShowEvent);
  };
  const handleCloseShowEvent = () => {
    setOpenShowEvent(false);
  };

  const showToast = (text) => {
    toast.success(text, {
      position: toast.POSITION.BOTTOM_LEFT,
      rtl: true,
      style: {
        fontFamily: "Vazir",
        fontSize: "1.2rem",
      },
    });
  };

  useEffect(() => {
    const getEvent = async () => {
      await apiInstance.get(`board/${boardId}/get-board-overview/`).then((response) => {
        setCalendarId(response.data.calendar);
        apiInstance
        .get(
          `/calendar/simple-calendar/${response.data.calendar}/events/?start=2000-01-01 00:00:00&end=2099-12-30 00:00:00`
        )
        .then((res) => {
          const ev = res.data.map((x) => {
            x = {
              id: crypto.randomUUID(),
              title: x.title,
              start: x.event_time.split("T")[0],
              color:
                x.event_color !== "" || x.event_color !== undefined
                  ? x.event_color
                  : "",
              extendedProps: {
                eventId: x.id,
              },
            };
            return x;
          });
          console.log(res.data);
          console.log(calendarId);
          setEvent(ev);
        });
      });
      
    };
    getEvent();
  }, [openAddEvent, openShowEvent]);
  
  return (
    <dir className="calendar--container">
      <Modal
        open={openAddEvent}
        onClose={handleCloseAddEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateEvent
          handleClose={handleCloseAddEvent}
          calendarId={calendarId}
          showToast={showToast}
        />
      </Modal>
      <Modal
        open={openCreateMeeting}
        onClose={handleCloseCreateMeeting}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateMeeting
          handleClose={handleCloseCreateMeeting}
          calendarId={calendarId}
          showToast={showToast}
        />
      </Modal>
      <Modal
        open={openShowEvent}
        onClose={handleCloseShowEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ShowEvent
          handleClose={handleCloseShowEvent}
          calendarId={calendarId}
          eventId={eventId}
        />
      </Modal>
      <FullCalendar
        height={"87vh"}
        locale={faLocale}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={event}
        headerToolbar={{
          left: "addMeeting addEvent prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,timeGridDay,listMonth",
        }}
        handleWindowResize
        windowResize={() => {}}
        nowIndicator
        navLinks
        weekNumbers
        weekText=""
        selectable
        customButtons={{
          addEvent: {
            text: "افزودن رویداد",
            click: handleAddEvent,
          },
          addMeeting: {
            text: "افزودن جلسه",
            click: handleCreateMeeting,
          },
        }}
        eventClick={handleShowEvent}
      />
    </dir>
  );
};

export default Calendar;
