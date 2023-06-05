import React from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import "./Vote.scss";
import useTheme from "../../../hooks/useTheme";

const VoteCard = ({ children, voteNumber, handleVoteChange, index }) => {
  const handleColorVote = () => {
    if (voteNumber[index] > 0) {
      return "green";
    } else {
      return "white";
    }
  };
  const {theme, getColor} = useTheme();
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div className="RetroReflect-vote-card">
        <Button onClick={() => handleVoteChange("add", index)}>
          <AddIcon sx={{ color: "white", fontSize: "18px" }} />
        </Button>

        <Typography sx={{ color: "white", fontSize: "17px" }}>
          {voteNumber[index]}
        </Typography>
        <ThumbUpOffAltIcon sx={{ color: handleColorVote, fontSize: "23px" }} />
        <Button>
          <RemoveIcon
            onClick={() => handleVoteChange("remove", index)}
            sx={{ color: "white", fontSize: "18px" }}
          />
        </Button>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: theme.secondary,
          borderRadius: "1rem",
          display: "flex",
          flexFlow: "column",
          padding: "1rem 1rem",
          // alignItems: "flex-start",
          justifyContent: "flex-start",
          gap: "1.5rem",
          color: getColor(theme.secondary),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default VoteCard;
