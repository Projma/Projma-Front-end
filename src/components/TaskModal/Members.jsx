import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LabelIcon from "@mui/icons-material/Label";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./Members.scss";
import { CheckBox } from "@mui/icons-material";
import { waitFor } from "@testing-library/react";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
import apiInstance from "../../utilities/axiosConfig";

export default function Members({ params }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    apiInstance
      .get(`/workspaces/board/${params.board_id}/members/`)
      .then((res) => {
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic,
        }));
        setListOfMembers(members);
        console.log(members);
        console.log("navid");
      });
  }, []);
  const [ListOfMembers, setListOfMembers] = React.useState([]);
  const [ListOfAddedMembers, setListOfAddedMembers] = React.useState([]);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };
  const InitialIconcircle = ({ initials }) => {
    return (
      <div
        style={{
          backgroundColor: randColor(),
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          width: 30,
          height: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            color: "white",
            fontSize: 12,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {initials}
        </div>
      </div>
    );
  };
  const [member, setMember] = React.useState("");
  const HandleSubmit = () => {
    // if (ListOfAddedMembers.includes(member)) {
    //   setListOfAddedMembers(ListOfAddedMembers.filter((m) => m !== member));
    // } else {
    //   setListOfAddedMembers([...ListOfAddedMembers, member]);
    // }
    console.log(member.id);
    const formData = new FormData();
    formData.append("doers", [member.id]);
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/add-doers-to-task/`, formData)
      .then((res) => {
        console.log(res);
      });
    // console.log(ListOfAddedMembers);
  };
  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
        }}
      >
        <PersonIcon rotate="90" fontSize="large"></PersonIcon>{" "}
        <div className="taskmodal-smaller-button">اعضا</div>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="tm_labels-main-div">
          <header className="tm_labels-header">
            <h2 className="tm_labels-header-title">برچسب‌ها</h2>
            <Divider sx={{ backgroundColor: "black" }} />
          </header>
          <div className="taskmodal-members-body">
            {ListOfMembers.map((member) => {
              return (
                <div className="flex-row taskmodal-members-body-row">
                  <div className="flex taskmodal-members-body-row-icon">
                    {/* <InitialIconcircle initials={member.username[0]} /> */}
                  </div>
                  <div className="flex taskmodal-members-body-row-text">
                    <Button
                      sx={{
                        fontSize: "12px",
                        fontFamily: "Vazir",
                        width: "100%",
                        justifyContent: "flex-start",
                      }}
                      onClick={() => {
                        setMember(member);
                        HandleSubmit();
                      }}
                    >
                      {member.userName}
                    </Button>
                  </div>
                </div>
              );
            })}
            ;
          </div>
        </div>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
      </Popover>
    </div>
  );
}
