import React, { useEffect, useState } from "react";
import "./SingleVote.scss";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import { TaskAltOutlined } from "@mui/icons-material";
import apiInstance from "../../../utilities/axiosConfig";
import useTheme from '../../../hooks/useTheme';
import { v4 as uuidv4 } from 'uuid';

const SingleVoted = ({ options, handleReRender }) => {
  const {theme, getColor} = useTheme();
  return (
    <div className="single-vote_voted" data-testid="single-vote-voted">
      <FormControl
        sx={{
          ".MuiFormControlLabel-label": {
            fontSize: "1rem",
          },
          ".MuiFormControlLabel-root": {
            margin: "0 0",
          },
        }}
        variant="standard"
      >
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="vote"
          onChange={async (event) => {
            const id = event.target.id.split("|");
            await apiInstance
              .post(`board/poll-answers/${id[0]}/vote/`, {
                text: event.target.value,
                poll: id[1] / 1,
              })
              .then((res) => {
                handleReRender();
              });
          }}
        >
          {options.sort((a,b) => a.id - b.id).map((o) => (
            <FormControlLabel
              value={o.text}
              control={
                <Radio
                  id={o.id + "|" + o.poll}
                  sx={{
                    color: theme.tertiary,
                    fontSize: "1rem",
                    "& .MuiSvgIcon-root": {
                      height: "1.5rem",
                      width: "1.5rem",
                    },
                  }}
                />
              }
              label={<Typography fontSize={"1.2rem"} style={{color: getColor(theme.minorBg)}}>{o.text}</Typography>}
              sx={{ height: "4rem", width: "100%", padding: "0.5rem" }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const getPercent = (vote, total) => {
  return Math.trunc((vote / total) * 100);
};

const SingleVoteResult = ({ options, totalVotes }) => {
  const {theme, getColor} = useTheme();

  return (
    <div className="single-vote_result" data-testid="single-vote-result"> 
      {options.map((v, i) => (
        <div className="single-vote_result-container">
          <div className="single-vote_result-icon">
            {v.is_user_voted === true && (
              <TaskAltOutlined
                sx={{ width: "1.5rem", height: "1.5rem", color: theme.tertiary }}
              />
            )}
          </div>
          <div className="single-vote_result-progressbar">
            <LinearProgress
              variant="buffer"
              value={getPercent(v.count, totalVotes)}
              valueBuffer={100}
              sx={{
                height: 6,
                width: "100%",
                maxWidth: "100%",
                rotate: "180deg",
                borderRadius: 5,
                [`&.linearProgressClasses`]: {
                  backgroundColor: theme.primary,
                },
                [`& .linearProgressClasses.bar`]: {
                  borderRadius: 5,
                  backgroundColor: theme.secondary,
                },
              }}
            />
          </div>
          <div className="single-vote_result-title" style={{color: getColor(theme.minorBg)}}>{v.text}</div>
          <div className="single-vote_result-percentage" style={{color: getColor(theme.minorBg)}}>
            {getPercent(v.count, totalVotes)}%
          </div>
        </div>
      ))}
    </div>
  );
};

const SingleVote = ({
  options,
  isOpen,
  isVoted,
  totalVotes,
  handleReRender,
}) => {
  // console.log('options', options);

  // console.log("total votes",totalVotes);
  return (
    <div className="single-vote_container">
      {isOpen === true && isVoted !== true ? (
        <SingleVoted
          key={uuidv4()}
          options={options}
          handleReRender={handleReRender}
          // setVote={setVote}
        />
      ) : (
        <SingleVoteResult
          key={uuidv4()}
          options={options}
          totalVotes={totalVotes}
        />
      )}
    </div>
  );
};

export default SingleVote;
