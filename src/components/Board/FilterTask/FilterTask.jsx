import * as React from "react";
import { useState, useEffect } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./FilterTask.css";

export default function FilterTask({ boardId, setLists }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [boardLabels, setBoardLabels] = useState([]);
  const [boardMembers, setBoardMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [date, setDate] = useState("");
  useEffect(() => {
    console.log("hereeeeeeeeeeeeeeeeee");
    apiInstance
      .get(`workspaces/board/${boardId}/get-board-labels/`)
      .then((res) => {
        console.log("board labels");
        console.log(res.data);
        const board_labels = res.data.map((obj) => ({
          id: obj.id,
          title: obj.title,
          color: obj.color,
          checked: false,
        }));
        console.log(board_labels);
        setBoardLabels(board_labels);
      });
  }, []);

  useEffect(() => {
    apiInstance.get(`workspaces/board/${boardId}/members/`).then((res) => {
      console.log("sinasssssssssssssssssssssss");
      console.log(res.data);
      const board_members = res.data.map((obj) => ({
        id: obj.user.id,
        full_name: obj.user.first_name + " " + obj.user.last_name,
        username: obj.user.username,
        role: obj.role,
        profile_pic: obj.profile_pic,
        checked: false,
      }));
      console.log(board_members);
      setBoardMembers(board_members);
    });
  }, []);

  const filterTaskAfterCheck = (value, type) => {
    // const labelIds =
    let labels_empty = selectedLabels.length === 0;
    let members_empty = selectedMembers.length === 0;
    let url = `workspaces/task/${boardId}/filter/`;
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
    if (!members_empty) {
      url = url + "?doers=";
      for (let i = 0; i < selectedMembers.length; i++) {
        url = url + `${selectedMembers[i]}`;
        if (i !== selectedMembers.length - 1 || type === "member")
          url = url + "%2C";
      }
    }
    if (type === "member") {
      if (members_empty) {
        url = url + "?doers=";
      }
      url = url + value;
    }
    if (type === "date") {
      setDate(value);
      if (value !== "") {
        if (!labels_empty || !members_empty) {
          url = url + "&";
          url = url + "end_date=" + value;
        } else {
          url = url + "?end_date=" + value;
        }
      }
    } else {
      if (date !== "") url = url + "&end_date=" + date;
    }
    apiInstance.get(url).then((res) => {
      console.log("filtered tasks");
      console.log(res.data);
      res.data.tasklists.map((list) => {
        list.tasks.sort((a, b) => a.order - b.order);
      });
      setLists(res.data.tasklists.sort((a, b) => b.order - a.order));
    });
  };

  const filterTaskAfterUnCheck = (value, type) => {
    let url = `workspaces/task/${boardId}/filter/`;
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
    apiInstance.get(url).then((res) => {
      console.log("filtered tasks");
      console.log(res.data);
      res.data.tasklists.map((list) => {
        list.tasks.sort((a, b) => a.order - b.order);
      });
      setLists(res.data.tasklists.sort((a, b) => b.order - a.order));
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
        <input
          type="date"
          value={date}
          onChange={(e) => filterTaskAfterCheck(e.target.value, "date")}
        />
        <div>
          {boardMembers.map((member) => (
            <div>
              <p>
                {member.full_name} {member.username} {member.id}
              </p>
              <input
                type="checkbox"
                id={member.id}
                name={member.name}
                value={member.id}
                checked={member.checked}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedMembers([...selectedMembers, e.target.value]);
                    setBoardMembers((prevState) =>
                      prevState.map((item) => {
                        if (item.id === parseInt(e.target.value)) {
                          item.checked = true;
                        }
                        return item;
                      })
                    );
                    filterTaskAfterCheck(e.target.value, "member");
                  } else {
                    setSelectedMembers((prevState) =>
                      prevState.filter((item) => item !== e.target.value)
                    );
                    setBoardMembers((prevState) =>
                      prevState.map((item) => {
                        if (item.id === parseInt(e.target.value)) {
                          item.checked = false;
                        }
                        return item;
                      })
                    );
                    filterTaskAfterUnCheck(e.target.value, "member");
                  }
                }}
              />
            </div>
          ))}
          {boardLabels.map((label) => (
            <div>
              <p>{label.title}</p>
              <input
                type="checkbox"
                id={label.id}
                name={label.title}
                value={label.id}
                checked={label.checked}
                onChange={(e) => {
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
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
}
