import * as React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import VoteCard from "./VoteCard";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import "../RetroReflect.css";
import VoteSetting from "./VoteSetting";

const Vote = () => {
  const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  const [voteNumber, setVoteNumber] = useState([0, 0, 0, 0, 0]);
  const [remainingVote, setRemainingVote] = useState(5);
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
      vt[index]++;
      setVoteNumber(vt);
      let num = remainingVote - 1;
      setRemainingVote(num);
    } else if (type === "remove") {
      let vt = voteNumber;
      vt[index]--;
      setVoteNumber(vt);
      let num = remainingVote + 1;
      setRemainingVote(num);
    }
    console.log(voteNumber);
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
            <VoteSetting />
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
    </div>
  );
};

export default Vote;
