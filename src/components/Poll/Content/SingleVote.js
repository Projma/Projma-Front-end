import React, { useEffect, useState } from "react";
import "./SingleVote.css";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { TaskAltOutlined } from "@mui/icons-material";

const SingleVoted = ({ op, setVote }) => {
  return (
    <div className="single-vote_voted">
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
          onChange={(event) => setVote(event.target.value)}
        >
          {op.map((o) => (
            <FormControlLabel

              value={o}
              control={
                <Radio
                  sx={{
                    color: "#5090D3",
                    fontSize: "1rem",
                    "& .MuiSvgIcon-root": {
                      height: "1.5rem",
                      width: "1.5rem",
                    },
                  }}
                />
              }
              label={<Typography fontSize={"1.2rem"}>{o}</Typography>}
              sx={{ height: "4rem", width: "100%", padding: "0.5rem" }}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const getPercent = (vote, all) => {
  let per = 0;
  all.forEach((x) => {
    if (vote === x.vote) per++;
  });
  return Math.trunc((per / all.length) * 100);
};

const SingleVoteResult = ({ vote, op, userVote }) => {
  // const [percentage, setPercentage] = useState(0);
  return (
    <div className="single-vote_result">
      {op.map((v, i) => (
        <div className="single-vote_result-container">
          <div className="single-vote_result-icon">
            {userVote === v && (
              <TaskAltOutlined
                sx={{ width: "1.5rem", height: "1.5rem", color: "#5090d3" }}
              />
            )}
          </div>
          <div className="single-vote_result-progressbar">
            <LinearProgress
              variant="buffer"
              value={getPercent(v, vote)}
              valueBuffer={100}
              sx={{
                height: 6,
                width: "100%",
                maxWidth: "100%",
                rotate: '180deg',
                borderRadius: 5,
                [`&.linearProgressClasses`]: {
                  backgroundColor: "#5090D3",
                },
                [`& .linearProgressClasses.bar`]: {
                  borderRadius: 5,
                  backgroundColor: "#0059B2",
                },
              }}
            />
          </div>
          <div className="single-vote_result-title">{v}</div>
          <div className="single-vote_result-percentage">
            {getPercent(v, vote)}%
          </div>
        </div>
      ))}
    </div>
  );
};

const SingleVote = ({ op, setTVote }) => {
  // const [isVote, setIsVote] = useState(false);
  const [vote, setVote] = useState(undefined);
  const [allVote, setAllVote] = useState([
    { id: 1, vote: "Yes" },
    { id: 2, vote: "No" },
    { id: 3, vote: "Yes" },
  ]);
  useEffect(() => {
    if (vote !== undefined) setAllVote([...allVote, { id: 4, vote }]);
    setTVote(allVote.length);
  }, [vote]);
  return (
    <div className="single-vote_container">
      {vote === undefined ? (
        <SingleVoted op={op} setVote={setVote} />
      ) : (
        <SingleVoteResult op={op} vote={allVote} userVote={vote} />
      )}
    </div>
  );
};

export default SingleVote;
