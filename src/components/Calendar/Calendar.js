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
import EditEvent from "./EditEvent";
import useBoard from "../../hooks/useBoard";
import apiInstance from "../../utilities/axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Calendar = () => {
  const { collapsed } = useProSidebar();
  const { boardId, calendar } = useBoard();
  const [openAddEvent, setOpenAddEvent] = useState(false);
  const [openEditEvent, setOpenEditEvent] = useState(false);
  const [event, setEvent] = useState([]);
  const [eventId, setEventId] = useState(0);
  useEffect(() => {}, [collapsed]);
  const handleAddEvent = (e) => {
    setOpenAddEvent(!openAddEvent);
  };
  const handleCloseAddEvent = () => {
    setOpenAddEvent(false);
    console.log(calendar);
  };
  const handleEditEvent = (e) => {
    console.log(e.event._def.publicId);
    setEventId(e.event._def.publicId);
    setOpenEditEvent(!openEditEvent);
  };
  const handleCloseEditEvent = () => {
    setOpenEditEvent(false);
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
      await apiInstance
        .get(
          `/calendar/simple-calendar/${boardId}/events/?start=2000-01-01 00:00:00&end=2099-12-30 00:00:00`
        )
        .then((res) => {
          const ev = res.data.map((x) => {
            x = {
              id: x.id,
              title: x.title,
              start: x.event_time.split("T")[0],
              color:
                x.event_color !== "" || x.event_color !== undefined
                  ? x.event_color
                  : "",
            };
            return x;
          });
          setEvent(ev);
        });
    };
    getEvent();
  }, [openAddEvent, openEditEvent]);
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
          calendarId={calendar}
          showToast={showToast}
        />
      </Modal>
      <Modal
        open={openEditEvent}
        onClose={handleCloseEditEvent}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditEvent
          handleClose={handleCloseEditEvent}
          calendarId={boardId}
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
          left: "addEvent prev,next today",
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
        }}
        eventClick={handleEditEvent}
      />
    </dir>
  );
};

export default Calendar;
