import {Typography} from "@mui/material";
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import "./PollView.css";
import React, {useEffect, useState} from "react";
import AnonymousVoter from "./Content/AnonymousVoter";
import SingleVote from "./Content/SingleVote";
import MultiVote from "./Content/MultiVote";
import { HowToRegOutlined } from "@mui/icons-material";

const PollView = () => {
  const data = {question: "Are you Gay",options: ["Yes","No","Dont know"]};
  const [tVote, setTVote] = useState(0);
  useEffect(() => {
  }, [tVote]);
  return (
    <div className="poll_pollview-container">
      <div className="poll_pollview-label">
        <Typography>{data.question}</Typography>
      </div>
      <div className="poll_pollview-attendents">
        <AnonymousVoter/>
      </div>
      <div className="poll_pollview-options">
        <MultiVote op={data.options} setTVote={setTVote}/>
      </div>
      <div className="poll_pollview-results">
        <Typography fontSize="1.1rem">{tVote}</Typography>
        <HowToRegOutlined sx={{width:"1.5rem",height:"1.5rem"}}/>
      </div>
    </div>
  );
}

export default PollView;