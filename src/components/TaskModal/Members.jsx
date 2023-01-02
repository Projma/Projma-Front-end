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
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";

function check_username_in_list(username, userName, list) {
  console.log(list);
  for (let i = 0; i < list.length; i++) {
    if (list[i].username === username) {
      return true;
    } else if (list[i].userName === username) {
      return true;
    } else if (list[i].userName === userName) {
      return true;
    }
  }
  return false;
}

export default function Members({ params, setDoers, doer }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [changeMemberStatus, setChangeMemberStatus] = React.useState(false);

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
        // console.log(res);
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic,
        }));
        setListOfMembers(members);
      });
  }, []);

  const [ListOfMembers, setListOfMembers] = React.useState([]);
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
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
  const add_member_to_doers = (member) => {
    console.log(member);
    const formData = new FormData();
    const json = {
      doers: [member.id],
    };
    console.log(doer);
    if (check_username_in_list(member.userName, member.username, doer)) {
      console.log("if");
      apiInstance
        .patch(
          `/workspaces/task/${params.task_id}/delete-doers-from-task/`,
          json
        )
        .then((res) => {
          setDoers(doer.filter((item) => item.username !== member.userName));
          console.log("else");
          console.log(res);
        });
    } else {
      console.log("else");
      const form_data = { doers: [member.id] };
      apiInstance
        .patch(`/workspaces/task/${params.task_id}/add-doers-to-task/`, json)
        .then((res) => {
          console.log("havid");
          console.log(res);
          setDoers([...doer, member]);
        });
    }
    setChangeMemberStatus(!changeMemberStatus);
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
  const HandleSubmit = (member) => {
    // if (ListOfAddedMembers.includes(member)) {
    //   setListOfAddedMembers(ListOfAddedMembers.filter((m) => m !== member));
    // } else {
    //   setListOfAddedMembers([...ListOfAddedMembers, member]);
    // }
    // console.log(member.id);
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
    <div style={{ width: "100%" }}>
      <Button
        className="taskmodal-smaller-button-inner"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          bgcolor: "#173b5e",
          marginTop: "5%",
          borderRadius: "35px",
          display: "flex",
          justifyContent: "start",
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
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div className="tm-members-main-div">
          <header className="tm-members-header">
            <h2 className="tm_labels-header-title">اعضا</h2>
            <Divider sx={{ backgroundColor: "black" }} />
          </header>
          <div className="taskmodal-members-body">
            {ListOfMembers.map((member) => {
              return (
                <div className="flex-row taskmodal-members-body-row">
                  <Button
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Vazir",
                      width: "90%",
                      justifyContent: "flex-start",
                      color: "white",
                    }}
                    onClick={() => {
                      add_member_to_doers(member);
                    }}
                  >
                    <div className="flex taskmodal-members-body-row-icon">
                      {member.image != null ? (
                        <img
                          src={`${baseURL}${member.image}`}
                          alt="profile"
                          style={{
                            borderRadius: 30,
                            width: 30,
                            height: 30,
                          }}
                        />
                      ) : (
                        <InitialIconcircle
                          initials={
                            member.firstName[0] + "‌" + member.lastName[0]
                          }
                        />
                      )}
                      {/* <InitialIconcircle initials={member.username[0]} /> */}
                    </div>
                    <div className="flex taskmodal-members-body-row-text">
                      <div className="taskmodal-members-body-descriptionn">
                        {member.firstName +
                          " " +
                          member.lastName +
                          " ( " +
                          member.userName +
                          " )"}
                      </div>
                      <div>
                        {check_username_in_list(
                          member.userName,
                          member.username,
                          doer
                        ) ? (
                          <CheckBoxIcon
                            fontSize="large"
                            className="flex taskmodal-members-checkbox"
                          ></CheckBoxIcon>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
      </Popover>
    </div>
  );
}
