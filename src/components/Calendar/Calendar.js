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

const Calendar = () => {
  const { collapsed } = useProSidebar();
  const calendar = useRef();
  useEffect(() => {
    // if(calendar !== null)
      // calendar.updateSize();
  }, [collapsed]);
  return (
    <dir className="calendar--container">
      <FullCalendar
        ref={calendar}
        height={"87vh"}
        locale={faLocale}
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={[
          {
            title: "ex",
            start: "2023-04-02",
          },
          {
            title: "Meeting",
            start: "2023-04-02T14:30:00",
            extendedProps: {
              status: "done",
            },
          },
          {
            title: "Birthday Party",
            start: "2023-04-04T07:00:00",
            backgroundColor: "green",
            borderColor: "green",
          },
        ]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,timeGridDay,listMonth",
        }}
        windowResize={() => {}}
        nowIndicator
        navLinks
        weekNumbers
        weekText=""
      />
    </dir>
  );
};

export default Calendar;
