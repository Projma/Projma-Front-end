import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import RetroList from "./content/RetroList";
import RetroCard from "./content/RetroCard";
import "./RetroReflect.scss";
import { useParams } from "react-router";
import StyledTextField from "../Shared/StyledTextField";
import PerTextField from "../Shared/PerTextField";
import NextBtn from "./NextBtn/NextBtn";
import apiInstance from "../../utilities/axiosConfig";

const RetroReflect = () => {
  const params = useParams();
  const [greenList, setGreenList] = useState([]);
  const [redList, setRedList] = useState([]);
  const socket = useRef(null);
  const [redCount, setRedCount] = useState([]);
  const [greenCount, setGreenCount] = useState([]);
  // type => retro_reflect
  // data => json
  // text, is_positive
  const handleKeyDown = (event, color) => {
    if (event.key === "Enter" && event.target.value != "") {
      if (color === "red") {
        setRedList((perv) => [...perv, event.target.value]);
        socket.current.send(
          JSON.stringify({
            // type: "retro_reflect",
            // data: {
            text: event.target.value,
            is_positive: 0,
            // },
          })
        );
      } else if (color === "green") {
        setGreenList((perv) => [...perv, event.target.value]);
        socket.current.send(
          JSON.stringify({
            // type: "retro_reflect",
            // data: {
            text: event.target.value,
            is_positive: 1,
            // },
          })
        );
      }
      event.target.value = "";
    }
  };

  useEffect(() => {
    socket.current = new WebSocket(
      `ws://localhost:8000/ws/socket-server/retro/reflect/${localStorage.getItem(
        "retro_id"
      )}/?token=${localStorage.getItem("access_token")}`
    );
    socket.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setRedCount(message.negative_cnt);
      setGreenCount(message.positive_cnt);
    };

    socket.current.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }, []);
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
                <StyledTextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  placeholder="بازتاب افکار خورد را بنویسید"
                  defaultValue={""}
                  onKeyDown={(e) => handleKeyDown(e, "green")}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: "Vazir",
                      backgroundColor: "$secondary",
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
                />
              </PerTextField>
            </div>
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {greenList.map((x) => (
                  <RetroCard>{x}</RetroCard>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  height: "100%",
                  color: "green",
                }}
              >
                تعداد کارت‌های سبز: {greenCount}
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
                <StyledTextField
                  margin="normal"
                  variant="filled"
                  required
                  fullWidth
                  placeholder="بازتاب افکار خورد را بنویسید"
                  defaultValue={""}
                  onKeyDown={(e) => handleKeyDown(e, "red")}
                  InputProps={{
                    disableUnderline: true,
                    style: {
                      fontFamily: "Vazir",
                      backgroundColor: "$secondary",
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
                />
              </PerTextField>
            </div>
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {redList.map((x) => (
                  <RetroCard>{x}</RetroCard>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  height: "100%",
                  color: "red",
                }}
              >
                تعداد کارت‌های قرمز: {redCount}
              </div>
            </div>
          </RetroList>
        </div>
      </div>
      <NextBtn />
    </div>
  );
};

export default RetroReflect;
