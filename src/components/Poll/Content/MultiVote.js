import React, { useEffect, useState } from "react";
import "./MultiVote.css";
import FormControl from "@mui/material/FormControl";
import { FormControlLabel, Checkbox, FormGroup, Button } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";
import { TaskAltOutlined } from "@mui/icons-material";

const MultiVoted = ({ op, setVote }) => {
  let mulVote = [];

  const handleChecked = (event) => {
    if (!mulVote.includes(event.target.value)) mulVote.push(event.target.value);
    else mulVote = mulVote.filter((x) => x !== event.target.value);
    // console.log(mulVote);
  };

  const handleClick = (event) => {
    event.preventDefault();
    event.stopPropagation()
    setVote(mulVote);
    console.log(mulVote);
  };

  return (
    <div className="multi-vote_voted">
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
        <FormGroup name="vote">
          {op.map((o) => (
            <FormControlLabel
              value={o}
              control={
                <Checkbox
                  onChange={handleChecked}
                  // checked={mulVote.includes(o)}
                  // name={o}
                  sx={{
                    color: "#5090D3",
                    fontSize: "1rem",
                    "& .MuiSvgIcon-root": {
                      height: "1.5rem",
                      width: "1.5rem",
                      borderRadius: "50%",
                    },
                  }}
                />
              }
              label={<Typography fontSize={"1.2rem"}>{o}</Typography>}
              sx={{ height: "4rem", width: "100%", padding: "0.5rem" }}
            />
          ))}
        </FormGroup>
      <Button
        variant="contained"
        style={{ height: "2rem", margin: "0.5rem 0.5rem" }}
        onClick={handleClick}
      >
        ثبت
      </Button>
      </FormControl>
    </div>
  );
};

const getPercent = (vote, all) => {
  let per = 0;
  all.forEach((i) => {
    i.vote.forEach((y) => {
      if (vote === y) per++;
    });
  });
  return Math.trunc((per / all.length) * 100);
};

const MultiVoteResult = ({ vote, op, userVote }) => {
  // const [percentage, setPercentage] = useState(0);
  return (
    <div className="multi-vote_result">
      {op.map((v, i) => (
        <div className="multi-vote_result-container">
          <div className="multi-vote_result-icon">
            {userVote === v && (
              <TaskAltOutlined
                sx={{ width: "1.5rem", height: "1.5rem", color: "#5090d3" }}
              />
            )}
          </div>
          <div className="multi-vote_result-progressbar">
            <LinearProgress
              variant="buffer"
              value={getPercent(v, vote)}
              valueBuffer={100}
              sx={{
                height: 6,
                width: "100%",
                maxWidth: "100%",
                rotate: "180deg",
                borderRadius: 5,
                [`&.linearProgressClasses`]: {
                  backgroundColor: "#5090D366",
                },
                [`& .linearProgressClasses.bar`]: {
                  borderRadius: 5,
                  backgroundColor: "#0059B2",
                },
              }}
            />
          </div>
          <div className="multi-vote_result-title">{v}</div>
          <div className="multi-vote_result-percentage">
            {getPercent(v, vote)}%
          </div>
        </div>
      ))}
    </div>
  );
};

const MultiVote = ({ op, setTVote }) => {
  const [vote, setVote] = useState(undefined);
  const [allVote, setAllVote] = useState([
    { id: 1, vote: ["Yes", "No"] },
    { id: 2, vote: ["No"] },
    { id: 3, vote: ["Yes"] },
  ]);
  useEffect(() => {
    if (vote !== undefined) setAllVote([...allVote, { id: 4, vote }]);
    setTVote(allVote.length);
  }, [vote]);
  console.log(vote);
  return (
    <div className="multi-vote_container">
      {vote === undefined ? (
        <MultiVoted op={op} setVote={setVote} />
      ) : (
        <MultiVoteResult op={op} vote={allVote} userVote={vote} />
      )}
    </div>
  );
};

export default MultiVote;
