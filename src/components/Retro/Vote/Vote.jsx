import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import VoteCard from "./VoteCard";
import "../RetroReflect.scss";
import VoteSetting from "./VoteSetting";
import { toast } from "react-toastify";
import NextBtn from "../NextBtn/NextBtn";
import useTheme from "../../../hooks/useTheme";
import apiInstance from "../../../utilities/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";


const Vote = () => {
  const { theme, getColor } = useTheme();
  const [allowVotePerUser, setAllowVotePerUser] = React.useState(0);
  const [allowVotePerItem, setAllowVotePerItem] = React.useState(5);
  const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  const [voteNumber, setVoteNumber] = useState([0, 0, 0, 0, 0]);
  const [remainingVote, setRemainingVote] = useState(0);

  const [isRetroAdmin, setIsRetroAdmin] = useState(true);
  const socket = useRef(null);

  useEffect(() => {
    apiInstance.get(`retro/${localStorage.getItem("retro_id")}/get-session-vote/`).then((res) => {
      // console.log(res.data);
      setIsRetroAdmin(res.data.is_retro_admin);
    }).catch((err) => {
      console.log(err);
    });

    socket.current = new WebSocket(
      `ws://localhost:8000/ws/socket-server/retro/vote/${localStorage.getItem(
        "retro_id"
      )}/?token=${localStorage.getItem("access_token")}`
    );

    socket.current.onopen = () => {
      console.log("Vote WebSocket connection opened");
      console.log(socket.current)
    };

    socket.current.onmessage = (event) => {

      // console.log("event.type"); // message
      // console.log(event.type); // message
      const message = JSON.parse(event.data);

      // // if event.data has type 
      // if (event.data.type == 'next_step') {
      if ("data" in message) {
        if ("nextStep" in message.data) {
          console.log("next_step entered");
          handleNavigation(message, event.type);
          return;
        }
      }

    };

    socket.current.onclose = () => {
      console.log("Vote WebSocket connection closed");
    };
  }, []);

  const handleKeyDown = (event, color) => {
    if (event.key === "Enter" && event.target.value != "") {
      if (color === "red") {
        setRedList((perv) => [...perv, event.target.value]);
      } else if (color === "green") {
        setGreenList((perv) => [...perv, event.target.value]);
      }
      event.target.value = "";
    }
  };

  const onVoteChange = (type, index) => {
    if (type === "add") {
      let vt = voteNumber;
      let val = vt[index] + 1;
      if (val > allowVotePerItem) {
        toast.error("تعداد رای‌های یک آیتم نمی‌تواند بیشتر از این باشد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      } else if (remainingVote - 1 < 0) {
        toast.error("تعداد رای‌های مجاز برای یک شخص نمی‌تواند کمتر از 0 باشد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      } else {
        vt[index]++;
        setVoteNumber(vt);
        setRemainingVote(remainingVote - 1);
      }
    } else if (type === "remove") {
      let vt = voteNumber;
      let val = vt[index] - 1;
      if (val < 0) {
        toast.error("تعداد رای‌های یک آیتم نمی‌تواند صفر باشد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      } else {
        vt[index]--;
        setVoteNumber(vt);
        setRemainingVote(remainingVote + 1);
      }
    }
    console.log(voteNumber);
  };

  const handleChangeVoteUser = (type) => {
    if (type === "add") {
      setAllowVotePerUser(allowVotePerUser + 1);
      setRemainingVote(remainingVote + 1);
      console.log(allowVotePerUser);
    } else if (type === "remove") {
      if (allowVotePerUser > 0) {
        setAllowVotePerUser(allowVotePerUser - 1);
        setRemainingVote(remainingVote - 1);
      } else {
        toast.error("تعداد رای‌های مجاز برای یک شخص نمی‌تواند کمتر از 0 باشد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      }
    }
  };

  const handleChangeVoteItem = (type) => {
    if (type === "add") {
      setAllowVotePerItem(allowVotePerItem + 1);
      console.log(allowVotePerItem);
    } else if (type === "remove") {
      if (allowVotePerItem > 0) {
        setAllowVotePerItem(allowVotePerItem - 1);
      } else {
        toast.error(
          "تعداد رای‌های مجاز برای یک آیتم نمی‌تواند کمتر از 0 باشد",
          { position: toast.POSITION.BOTTOM_LEFT, rtl: true }
        );
      }
    }
  };

  const { workspaceId, boardId } = useParams();
  const navigate = useNavigate();
  const handleNavigation = (message, type) => {
    // if (type === "navigate_to_next_step") {
    console.log("--------------------");
    console.log(message);
    // close connection 
    if (socket.current !== null)
      socket.current.close();

    // if (props.WS !== null)
    //     props.WS.close();
    if (message.data.nextStep !== undefined) {
      if (message.data.nextStep === "board") {
        localStorage.removeItem("retro_id");
        navigate(`/workspace/${workspaceId}/kanban/${boardId}/${message.data.nextStep}`);
      } else {
        navigate(`/workspace/${workspaceId}/kanban/${boardId}/retro/${message.data.nextStep}`);
      }
    }
  };

  return (
    <div className="RetroReflect-container" style={{ flexDirection: "column" }}>
      <div className="RetroReflect-vote-header">
        <Typography
          className="RetroReflect-vote-header-myVote"
          style={{ flexDirection: "row" }}
        >
          <div style={{ display: "flex", color: getColor(theme.mainBg) }}>
            {" "}
            رای‌های باقیمانده: {remainingVote}
          </div>
          <div style={{ display: "flex" }}>
            <VoteSetting
              handleChangeVoteUserim={handleChangeVoteUser}
              handleChangeVoteItemim={handleChangeVoteItem}
              allowVotePerUser={allowVotePerUser}
              allowVotePerItem={allowVotePerItem}
            />
          </div>
        </Typography>
      </div>
      <div className="RetroReflect-list">
        <div className="RetroReflect-green">
          <RetroList>
            <div className="RetroReflect-list-title">
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
              ></div>
              <Typography style={{ color: getColor(theme.minorBg) }}>چه چیز هایی کار میکند؟</Typography>
            </div>
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {greenList.map((x, index) => (
                  <VoteCard
                    voteNumber={voteNumber}
                    handleVoteChange={onVoteChange}
                    index={index}
                  >
                    {x}
                  </VoteCard>
                ))}
              </div>
            </div>
          </RetroList>
        </div>
        <div className="RetroReflect-red">
          <RetroList>
            <div className="RetroReflect-list-title">
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              ></div>
              <Typography style={{ color: getColor(theme.minorBg) }}>در کجا ها به مشکل خوردید؟</Typography>
            </div>
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {redList.map((x, index) => (
                  <VoteCard
                    voteNumber={voteNumber}
                    handleVoteChange={onVoteChange}
                    index={index}
                  >
                    {x}
                  </VoteCard>
                ))}
              </div>
            </div>
          </RetroList>
        </div>
      </div>
      {isRetroAdmin && (<NextBtn
        currentStep={"Vote"}
        text={"بعدی"}
        WS={socket.current}
      />)
      }
    </div>
  );
};

export default Vote;
