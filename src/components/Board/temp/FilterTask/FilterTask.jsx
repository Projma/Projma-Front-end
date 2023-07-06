import * as React from "react";
import { useState, useEffect } from "react";
import apiInstance from "../../../../utilities/axiosConfig";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./FilterTask.scss";
import DatePicker, { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import ShowMembersInFilter from "./ShowMembersInFilter";
import Loading from "../../../Shared/Loading";

export default function FilterTask({ boardId, setLists }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [boardLabels, setBoardLabels] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isPost, setIsPost] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);
  // const [date, setDate] = useState("");
  const [value, setValue] = React.useState(new Date());
  const [date, setDate] = React.useState("");
  useEffect(() => {
    ////console.log("hereeeeeeeeeeeeeeeeee");
    apiInstance.get(`board/${boardId}/get-board-labels/`).then((res) => {
      ////console.log("board labels");
      ////console.log(res.data);
      const board_labels = res.data.map((obj) => ({
        id: obj.id,
        title: obj.title,
        color: obj.color,
        checked: false,
      }));
      ////console.log(board_labels);
      setBoardLabels(board_labels);
    });
  }, []);

  useEffect(() => {
    apiInstance.get(`board/${boardId}/members/`).then((res) => {
      ////console.log("sinasssssssssssssssssssssss");
      ////console.log(res.data);
      const board_members = res.data.map((obj) => ({
        id: obj.user.id,
        full_name: obj.user.first_name + " " + obj.user.last_name,
        username: obj.user.username,
        role: obj.role,
        profile_pic: obj.profile_pic,
        checked: false,
      }));
      ////console.log(board_members);
      setBoardMembers(board_members);
    });
  }, []);

  const filterTaskAfterCheck = (value, type) => {
    // const labelIds =
    setIsPost(true);
    let labels_empty = selectedLabels.length === 0;
    let members_empty = selectedMembers.length === 0;
    let url = `task/${boardId}/filter/`;
    if (!labels_empty) {
      url = url + "?labels=";
      for (let i = 0; i < selectedLabels.length; i++) {
        url = url + `${selectedLabels[i]}`;
        if (i !== selectedLabels.length - 1 || type === "label")
          url = url + "%2C";
      }
    }
    if (type === "label") {
      if (labels_empty) {
        url = url + "?labels=";
      }
      url = url + value;
    }
    if (
      (!members_empty || type === "member") &&
      (!labels_empty || type === "label")
    ) {
      url = url + "&";
    }
    if (labels_empty && type !== "label") {
      url = url + "?";
    }
    if (!members_empty) {
      // if (labels_empty) {
      //   url += "?";
      // }
      url = url + "doers=";
      for (let i = 0; i < selectedMembers.length; i++) {
        url = url + `${selectedMembers[i]}`;
        if (i !== selectedMembers.length - 1 || type === "member")
          url = url + "%2C";
      }
    }
    if (type === "member") {
      if (members_empty) {
        url = url + "doers=";
      }
      url = url + value;
    }
    let datee = "";
    //console.log("hamid");
    //console.log(value);
    try {
      if (!value.toString().includes("Standard")) {
        datee = `${value.year}-${value.month.number}-${value.day}`;
      }
    } catch {}

    //console.log("navid");
    //console.log(datee);
    if (type === "date") {
      //console.log("sina");
      setDate(datee);
      if (datee !== "") {
        if (!labels_empty || !members_empty) {
          url = url + "&";
          url = url + "end_date=" + datee;
        } else {
          url = url + "end_date=" + datee;
        }
      }
    } else {
      //console.log("alinejad");
      //console.log(datee);
      if (date !== "") {
        //console.log("alinejad2");
        url = url + "&end_date=" + date;
      }
    }
    //console.log(url);
    apiInstance.get(url).then((res) => {
      ////console.log("filtered tasks");
      ////console.log(res.data);
      console.log("YYYYYYYYYYYYYYYYYYYYYYYYY");
      console.log(res.data.tasklists);
      res.data.tasklists.map((list) => {
        list.tasks.sort((a, b) => a.order - b.order);
      });
      setLists(res.data.tasklists.sort((a, b) => b.order - a.order));
    });
  };

  const filterTaskAfterUnCheck = (value, type) => {
    setIsPost(true);
    let url = `task/${boardId}/filter/`;
    let labels_empty =
      selectedLabels.length === 0 ||
      (type === "label" && selectedLabels.length === 1);
    let members_empty =
      selectedMembers.length === 0 ||
      (type === "member" && selectedMembers.length === 1);

    if (type !== "label" && !labels_empty) {
      url = url + "?labels=";
      for (let i = 0; i < selectedLabels.length; i++) {
        url = url + `${selectedLabels[i]}`;
        if (i !== selectedLabels.length - 1) url = url + "%2C";
      }
    }

    if (type === "label") {
      if (!labels_empty) {
        url = url + "?labels=";
        let leng = selectedLabels.length;
        if (selectedLabels[selectedLabels.length - 1] === value) leng--;
        for (let i = 0; i < leng; i++) {
          if (selectedLabels[i] !== value) {
            url = url + `${selectedLabels[i]}`;
            if (i !== leng - 1) url = url + "%2C";
          }
        }
      }
    }
    if (!labels_empty && !members_empty) {
      url = url + "&";
    }
    if (type !== "member" && !members_empty) {
      url = url + "?doers=";
      for (let i = 0; i < selectedMembers.length; i++) {
        url = url + `${selectedMembers[i]}`;
        if (i !== selectedMembers.length - 1) url = url + "%2C";
      }
    }
    if (type === "member") {
      if (!members_empty) {
        url = url + "?doers=";
        let leng = selectedMembers.length;
        if (selectedMembers[selectedMembers.length - 1] === value) leng--;
        for (let i = 0; i < leng; i++) {
          if (selectedMembers[i] !== value) {
            url = url + `${selectedMembers[i]}`;
            if (i !== leng - 1) url = url + "%2C";
          }
        }
      }
    }
    if (date !== "") {
      if (!labels_empty || !members_empty) {
        url = url + "&";
        url = url + "end_date=" + date;
      } else {
        url = url + "?end_date=" + date;
      }
    }
    apiInstance
      .get(url)
      .then((res) => {
        //console.log("filtered tasks");
        //console.log(res.data);
        res.data.tasklists.map((list) => {
          list.tasks.sort((a, b) => a.order - b.order);
        });
        setLists(res.data.tasklists.sort((a, b) => b.order - a.order));
      })
      .finally(() => {
        setIsPost(null);
      });
  };

  const resetFilter = (event) => {
    setIsPost(true);
    setSelectedLabels([]);
    setSelectedMembers([]);
    setDate("");
    let url = `task/${boardId}/filter/`;
    const resetlabel = boardLabels.map((val) => {
      return { ...val, checked: false };
    });
    setBoardLabels(resetlabel);
    const resetmem = boardMembers.map((val) => {
      return { ...val, checked: false };
    });
    setBoardMembers(resetmem);
    apiInstance
      .get(url)
      .then((res) => {
        ////console.log("filtered tasks");
        ////console.log(res.data);
        res.data.tasklists.map((list) => {
          list.tasks.sort((a, b) => a.order - b.order);
        });
        setLists(res.data.tasklists.sort((a, b) => b.order - a.order));
      })
      .finally(() => {
        setIsPost(null);
      });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        فیلتر تسک
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="filter-container">
          <Calendar
            className="background-blue"
            value={value}
            onChange={(val) => {
              setValue(val);
              filterTaskAfterCheck(val, "date");
            }}
            calendar={persian}
            locale={persian_fa}
            // calendarPosition="bottom-right"
          />
          {/* <input
          type="date"
          value={date}
          onChange={(e) => filterTaskAfterCheck(e.target.value, "date")}
        /> */}
          <div style={{ marginTop: "10px" }}>
            <div style={{ padding: "5%" }}>
              <h2 style={{ color: "white" }}>اعضا</h2>
              <ShowMembersInFilter
                boardMembers={boardMembers}
                selectedMembers={selectedMembers}
                setSelectedMembers={setSelectedMembers}
                setBoardMembers={setBoardMembers}
                filterTaskAfterCheck={filterTaskAfterCheck}
                filterTaskAfterUnCheck={filterTaskAfterUnCheck}
              />
            </div>
            <div style={{ padding: "5%" }}>
              <h2 style={{ color: "white", marginBottom: "5%" }}>برچسب</h2>
              {boardLabels.map((label) => (
                //console.log(label),
                <div
                  style={{
                    display: "flex",
                    columnGap: "5%",
                    backgroundColor: `${label.color + "99"}`,
                    borderRadius: "5px",
                    padding: "2%",
                    marginTop: "5px",
                  }}
                >
                  <input
                    style={{ display: "flex" }}
                    type="checkbox"
                    id={label.id}
                    name={label.title}
                    value={label.id}
                    checked={label.checked}
                    onChange={(e) => {
                      //console.log("nvdi");
                      if (e.target.checked) {
                        setSelectedLabels([...selectedLabels, e.target.value]);
                        setBoardLabels((prevState) =>
                          prevState.map((item) => {
                            if (item.id === parseInt(e.target.value)) {
                              item.checked = true;
                            }
                            return item;
                          })
                        );
                        filterTaskAfterCheck(e.target.value, "label");
                      } else {
                        setSelectedLabels((prevState) =>
                          prevState.filter((item) => item !== e.target.value)
                        );
                        setBoardLabels((prevState) =>
                          prevState.map((item) => {
                            if (item.id === parseInt(e.target.value)) {
                              item.checked = false;
                            }
                            return item;
                          })
                        );
                        filterTaskAfterUnCheck(e.target.value, "label");
                      }
                    }}
                  />
                  <div
                    style={{
                      backgroundColor: label.color,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 30,
                      width: 17,
                      height: 17,
                      marginLeft: 7,
                    }}
                  ></div>
                  <p style={{ display: "flex", fontSize: "13px" }}>
                    {label.title}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: "3%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                onClick={resetFilter}
                sx={{ height: "35px", fontSize: "13px" }}
              >
                بازنشانی
              </Button>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}
