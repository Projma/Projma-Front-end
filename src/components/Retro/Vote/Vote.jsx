import * as React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import VoteCard from "./VoteCard";
import "../RetroReflect.scss";
import VoteSetting from "./VoteSetting";
import { toast } from "react-toastify";
import NextBtn from "../NextBtn/NextBtn";

const Vote = () => {
  const [allowVotePerUser, setAllowVotePerUser] = React.useState(0);
  const [allowVotePerItem, setAllowVotePerItem] = React.useState(5);
  const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  const [voteNumber, setVoteNumber] = useState([0, 0, 0, 0, 0]);
  const [remainingVote, setRemainingVote] = useState(0);

  const [isRetroAdmin, setIsRetroAdmin] = useState(true);
  /// in first get data from server
  // setIsRetroAdmin(response.data.is_retro_admin);
  // useEffect(() => {
  //   apiInstance.get(`retro/${localStorage.getItem("retro_id")}/get-session-vote/`).then((res) => {
  //     // console.log(res.data);
  //     setIsRetroAdmin(response.data.is_retro_admin);
  // }).catch((err) => {
  //     console.log(err);
  // });
  // }, []);
  
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

  return (
    <div className="RetroReflect-container" style={{ flexDirection: "column" }}>
      <div className="RetroReflect-vote-header">
        <Typography
          className="RetroReflect-vote-header-myVote"
          style={{ flexDirection: "row" }}
        >
          <div style={{ display: "flex" }}>
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
              <Typography>چه چیز هایی کار میکند؟</Typography>
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
              <Typography>در کجا ها به مشکل خوردید؟</Typography>
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
        currentStep={"Group"}
        text={"بعدی"}
      // WebSocket={socket.current}
      />)
      }
    </div>
  );
};

export default Vote;
