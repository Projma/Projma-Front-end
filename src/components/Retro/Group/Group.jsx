import React from "react";
import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import RetroCard from "../content/RetroCard";
import "../RetroReflect.css";
import StyledTextField from "../../Shared/StyledTextField";
import PerTextField from "../../Shared/PerTextField";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Group = () => {
  const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  // useEffect(() => {
  //   setNavWorkspace(workspace);
  // }, [workspace]);
  return (
    <div className="RetroReflect-container">
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
            <div className="RetroReflect-list-textfield">
              <PerTextField>
                {/* <StyledTextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  placeholder="بازتاب افکار خورد را بنویسید"
                  defaultValue={""}
                  // onKeyDown={(e) => handleKeyDown(e, "green")}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: "Vazir",
                      backgroundColor: "var(--main-item-color)",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Vazir",
                      // fontSize: "1.6rem",
                    },
                  }}
                  hiddenLabel
                  sx={{
                    border: "none",
                    borderRadius: "0.5rem",
                    // borderRadius: "0.5rem",
                    "& input::placeholder": {
                      fontSize: "1rem",
                    },
                    margin: 0,
                  }}
                /> */}
              </PerTextField>
            </div>
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {greenList.map((x) => (
                  <RetroCard>{x}</RetroCard>
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
            <div className="RetroReflect-list-textfield">
              <PerTextField>
                {/* <StyledTextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  placeholder="بازتاب افکار خورد را بنویسید"
                  defaultValue={""}
                  // onKeyDown={(e) => handleKeyDown(e, "red")}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: "Vazir",
                      backgroundColor: "var(--main-item-color)",
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Vazir",
                      // fontSize: "1.6rem",
                    },
                  }}
                  hiddenLabel
                  sx={{
                    border: "none",
                    borderRadius: "0.5rem",
                    // borderRadius: "0.5rem",
                    "& input::placeholder": {
                      fontSize: "1rem",
                    },
                    margin: 0,
                  }}
                /> */}
              </PerTextField>
            </div>
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {redList.map((x) => (
                  <RetroCard>{x}</RetroCard>
                ))}
              </div>
            </div>
          </RetroList>
        </div>
      </div>
    </div>
  );
};

export default Group;
