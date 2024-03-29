import { Typography } from "@mui/material";
import "./PollView.scss";
import React, { useEffect, useState, useCallback } from "react";
import AnonymousVoter from "./Content/AnonymousVoter";
import SingleVote from "./Content/SingleVote";
import MultiVote from "./Content/MultiVote";
import KnownVoter from "./Content/KnownVoter";
import apiInstance from "../../utilities/axiosConfig";
import AnonymousResult from "./Content/AnonymousResult";
import KnownResult from "./Content/KnownResult";
import useTheme from "../../hooks/useTheme";
import { v4 as uuidv4 } from "uuid";

const PollView = ({
  Multi,
  question,
  isOpen,
  Anonymous,
  pollId,
  handleReRender,
}) => {
  const { theme, getColor } = useTheme();
  const [poll, setPoll] = useState([]);
  const [isVoted, setIsVoted] = useState(false);
  const [voters, setVoters] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  // const [totalVotes, setTotalVotes] = useState(1);
  const fetchPoll = useCallback(async () => {
    const response = await apiInstance
      .get(`board/poll/${pollId}/show-result/`)
      .then((res) => {
        let data = res.data.answers;
        setPoll(data);
        let v = [];
        data.forEach((x) => {
          if (x.is_user_voted) {
            setIsVoted(true);
          }
          if(x.voters !== undefined)
          x.voters.forEach((x) => {
            v.push(x);
          });
        });
        setVoters(
          v.reduce((unique, o) => {
            if (!unique.some((obj) => obj.user__pk === o.user__pk)) {
              unique.push(o);
            }
            return unique;
          }, [])
        );
      });
      if(response !== undefined)
    setPoll(response.data);
  }, [pollId]);

  useEffect(() => {
    fetchPoll();
  }, [fetchPoll]);
  
  const getSum = () => {
    let sum = 0;
    poll.forEach((x) => (sum = sum + x.count));
    return sum;
  };

  console.log("poll", pollId, poll, voters, voters.length, totalVotes);
  return (
    <div className="poll_pollview-container">
      <div className="poll_pollview-label">
        <Typography style={{ color: getColor(theme.mainBg) }}>
          {question}
        </Typography>
      </div>
      <div className="poll_pollview-attendents">
        {Anonymous ? <AnonymousVoter /> : <KnownVoter voters={voters} />}
      </div>
      <div className="poll_pollview-options">
        {Multi ? (
          <MultiVote
            options={poll}
            isOpen={isOpen}
            isVoted={isVoted}
            totalVotes={voters.length !== 0 ? voters.length : getSum()}
            key={uuidv4()}
            handleReRender={handleReRender}
          />
        ) : (
          <SingleVote
            options={poll}
            isOpen={isOpen}
            isVoted={isVoted}
            totalVotes={voters.length !== 0 ? voters.length : getSum()}
            key={uuidv4()}
            handleReRender={handleReRender}
          />
        )}
      </div>
      <div
        className={
          Anonymous || !(isOpen === true && isVoted === true)
            ? "poll_pollview-results-anonymous"
            : "poll_pollview-results-known"
        }
      >
        {Anonymous ? (
          <AnonymousResult totalVotes={getSum()} />
        ) : (
          <>
            {isOpen === true && isVoted === true ? (
              <KnownResult
                voters={voters}
                options={poll}
                question={question}
                totalVotes={voters.length}
              />
            ) : (
              <AnonymousResult totalVotes={voters.length} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PollView;
