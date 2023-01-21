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
  //console.log(list);
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
    console.log("YYFYFYFYFYFYFYFY");
    console.log(doer);
    apiInstance
      .get(`/workspaces/board/${params.board_id}/members/`)
      .then((res) => {
        // //console.log(res);
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          firstName: obj.user.first_name,
          lastName: obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic,
          checked: false,
        }));
        // members already in doers
        console.log("NNNNNNNNNNNNNNNNNNNN");
        console.log(doer);
        console.log(members);
        members.map((member) => {
          if (doer.some((item) => item.username === member.userName)) {
            member.checked = true;
          }
          return member;
        });
        console.log(members);

        setListOfMembers(members);
      });
  }, [doer]);

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
  // const add_member_to_doers = (member) => {
  //   //console.log(member);
  //   const members = ListOfMembers.map((obj) => {
  //     if (obj.id === member.id) {
  //       obj.checked = !obj.checked;
  //     }
  //     return obj;
  //   });
  //   setListOfMembers(members);
  //   const formData = new FormData();
  //   const json = {
  //     doers: [member.id],
  //   };
  //   //console.log(doer);
  //   if (member.checked === true) {
  //     //console.log("if");
  //     apiInstance
  //       .patch(
  //         `/workspaces/task/${params.task_id}/delete-doers-from-task/`,
  //         json
  //       )
  //       .then((res) => {
  //         setDoers(doer.filter((item) => item.username !== member.userName));
  //       });
  //   } else {
  //     //console.log("else");
  //     const form_data = { doers: [member.id] };
  //     apiInstance
  //       .patch(`/workspaces/task/${params.task_id}/add-doers-to-task/`, json)
  //       .then((res) => {
  //         //console.log("havid");
  //         //console.log(res);
  //         setDoers([...doer, member]);
  //       });
  //   }
  //   setChangeMemberStatus(!changeMemberStatus);
  // };
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
  // const HandleSubmit = (member) => {
  //   // if (ListOfAddedMembers.includes(member)) {
  //   //   setListOfAddedMembers(ListOfAddedMembers.filter((m) => m !== member));
  //   // } else {
  //   //   setListOfAddedMembers([...ListOfAddedMembers, member]);
  //   // }
  //   // //console.log(member.id);
  //   const formData = new FormData();
  //   formData.append("doers", [member.id]);
  //   apiInstance
  //     .patch(`/workspaces/task/${params.task_id}/add-doers-to-task/`, formData)
  //     .then((res) => {
  //       //console.log(res);
  //     });
  //   // //console.log(ListOfAddedMembers);
  // };

  const add_to_doers = (member) => {
    // change the checked value of the member
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/add-doers-to-task/`, {
        doers: [member.id],
      })
      .then((res) => {
        //console.log(res);
        console.log("in add");
        const new_doer = {
          email: member.email,
          username: member.userName,
          first_name: member.firstName,
          last_name: member.lastName,
          profile_pic: member.image,
        };
        setDoers([...doer, new_doer]);
      });
  };
  const delete_from_doers = (member) => {
    member.checked = !member.checked;
    apiInstance
      .patch(`/workspaces/task/${params.task_id}/delete-doers-from-task/`, {
        doers: [member.id],
      })
      .then((res) => {
        //console.log(res);
        console.log("in delete");
        const new_doers = doer.filter(
          (item) => item.username !== member.userName
        );
        console.log(new_doers);
        setDoers(new_doers);
      });
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
                  <div
                    sx={{
                      fontSize: "12px",
                      fontFamily: "Vazir",
                      width: "90%",
                      justifyContent: "flex-start",
                      display: "flex",
                      color: "white",
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
                    <div className="flex">
                      <p>{member.firstName}</p>
                      <p>{member.lastName}</p>
                      <input
                        type="checkbox"
                        checked={member.checked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            add_to_doers(member);
                          } else {
                            delete_from_doers(member);
                          }
                          setListOfMembers((prevState) =>
                            prevState.map((obj) => {
                              if (obj.userName === member.userName) {
                                console.log("in the if");
                                obj.checked = !obj.checked;
                              }
                              return obj;
                            })
                          );
                        }}
                      />
                    </div>
                  </div>
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
