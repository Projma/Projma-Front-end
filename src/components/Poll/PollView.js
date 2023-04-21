import { Typography } from "@mui/material";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import "./PollView.css";
import React, { useEffect, useState } from "react";
import AnonymousVoter from "./Content/AnonymousVoter";
import SingleVote from "./Content/SingleVote";
import MultiVote from "./Content/MultiVote";
import { HowToRegOutlined } from "@mui/icons-material";

const PollView = ({Multi, question, isOpen, Anonymous, pollId}) => {

  return (
    <div className="poll_pollview-container">
      <div className="poll_pollview-label">
        <Typography>{question}</Typography>
      </div>
      <div className="poll_pollview-attendents">
        <AnonymousVoter />
      </div>
      <div className="poll_pollview-options">
        {Multi ? <MultiVote op={["Yes","No"]} /> : <SingleVote op={["Yes","No"]} />}
      </div>
      <div className="poll_pollview-results">
        <Typography fontSize="1.1rem">x</Typography>
        <HowToRegOutlined sx={{ width: "1.5rem", height: "1.5rem" }} />
      </div>
    </div>
  );
};

export default PollView;
