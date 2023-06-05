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
import useTheme from "../../hooks/useTheme";

const RetroReflect = () => {
  const params = useParams();
  const {theme, getColor} = useTheme();
  const [greenList, setGreenList] = useState([]);
  const [redList, setRedList] = useState([]);
  const socket = useRef(null);
  const [redCount, setRedCount] = useState([]);
  const [greenCount, setGreenCount] = useState([]);
  const [retro, setRetro] = useState([]);
  const [allData, setAllData] = useState([]);
  const handleKeyDown = (event, color) => {
    if (event.key === "Enter" && event.target.value != "") {
      if (color === "red") {
        setAllData((prev) => [
          ...prev,
          { text: event.target.value, is_positive: 0 },
        ]);
        socket.current.send(
          JSON.stringify({
            type: "create_card",
            data: {
              text: event.target.value,
              is_positive: 0,
            },
          })
        );
      } else if (color === "green") {
        setAllData((prev) => [
          ...prev,
          { text: event.target.value, is_positive: 1 },
        ]);
        socket.current.send(
          JSON.stringify({
            type: "create_card",
            data: {
              text: event.target.value,
              is_positive: 1,
            },
          })
        );
      }
      console.log(allData);
      event.target.value = "";
    }
  };

  useEffect(() => {
    apiInstance
      .get(`retro/${localStorage.getItem("retro_id")}/get-session-reflect/`)
      .then((response) => {
        console.log(response.data.cards);
        setAllData(response.data.cards);
      })
      .catch((res) => {});
  }, []);

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
      // console.log(event.data);
      // console.log(event.type); // message
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
              <Typography style={{color: getColor(theme.minorBg)}}>چه چیز هایی کار میکند؟</Typography>
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
                      backgroundColor: theme.secondary,
                      color: getColor(theme.secondary)
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
                {allData.map((x) =>
                  x.is_positive ? <RetroCard>{x.text}</RetroCard> : null
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
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
              <Typography style={{color: getColor(theme.minorBg)}}>در کجا ها به مشکل خوردید؟</Typography>
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
                      backgroundColor: theme.secondary,
                      color: getColor(theme.secondary)
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
                {allData.map((x) =>
                  !x.is_positive ? <RetroCard>{x.text}</RetroCard> : null
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  color: "red",
                }}
              >
                تعداد کارت‌های قرمز: {redCount}
              </div>
            </div>
          </RetroList>
        </div>
      </div>
      {/* if is admin ? */}
      <NextBtn
        currentStep={"Reflect"}
        text={"بعدی"}
        WebSocket={socket.current}
      />
    </div>
  );
};

export default RetroReflect;
