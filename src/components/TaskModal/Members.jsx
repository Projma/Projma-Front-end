import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import "../../styles/TaskModal.css";
import "./Members.scss";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";
import Loading from "../Shared/Loading";

export default function Members({ params, setDoers, doer }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isPost, setIsPost] = React.useState(false);
  const [changeMemberStatus, setChangeMemberStatus] = React.useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    apiInstance.get(`/board/${params.board_id}/members/`).then((res) => {
      const members = res.data.map((obj) => ({
        id: obj.user.id,
        firstName: obj.user.first_name,
        lastName: obj.user.last_name,
        userName: obj.user.username,
        email: obj.user.email,
        image: obj.profile_pic,
        checked: false,
      }));
      members.map((member) => {
        if (doer.some((item) => item.username === member.userName)) {
          member.checked = true;
        }
        return member;
      });

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
        ?.toUpperCase()
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
          {initials.toString().includes("undefined‌undefined")
            ? ""
            : initials.toString()}
        </div>
      </div>
    );
  };
  const [member, setMember] = React.useState("");

  const add_to_doers = (member) => {
    setIsPost(true);
    apiInstance
      .patch(`/task/${params.task_id}/add-doers-to-task/`, {
        doers: [member.id],
      })
      .then((res) => {
        const new_doer = {
          email: member.email,
          username: member.userName,
          first_name: member.firstName,
          last_name: member.lastName,
          profile_pic: member.image,
        };
        setDoers([...doer, new_doer]);
      })
      .finally(() => {
        setIsPost(null);
      });
  };

  const delete_from_doers = (member) => {
    member.checked = !member.checked;
    setIsPost(true);
    apiInstance
      .patch(`/task/${params.task_id}/delete-doers-from-task/`, {
        doers: [member.id],
      })
      .then((res) => {
        ////console.log(res);
        //console.log("in delete");
        const new_doers = doer.filter(
          (item) => item.username !== member.userName
        );
        //console.log(new_doers);
        setDoers(new_doers);
      })
      .finally(() => {
        setIsPost(null);
      });
  };
  return (
    <div className="taskmodal-flexibale-icon">
      {isPost ? <Loading /> : null}
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
          height: "80%",
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
          vertical: "center",
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
                <div
                  className="flex-row taskmodal-members-body-row"
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
                              //console.log("in the if");
                              obj.checked = !obj.checked;
                            }
                            return obj;
                          })
                        );
                      }}
                    />
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
                  <div
                    className="flex"
                    style={{
                      fontSize: "13px",
                      color: "white",
                      width: "100%",
                      justifyContent: "flex-start",
                      overflowX: "auto",
                      columnGap: "2%",
                    }}
                  >
                    <p>{member.firstName}</p>
                    <p>{member.lastName}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Popover>
    </div>
  );
}
