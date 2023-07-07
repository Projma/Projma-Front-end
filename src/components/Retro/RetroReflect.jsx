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
import { useNavigate } from "react-router-dom";
import { Button } from "bootstrap";
import { baseUrlForSocket } from "../../utilities/constants";

const RetroReflect = () => {
  const params = useParams();
  const { theme, getColor } = useTheme();
  const [greenList, setGreenList] = useState([]);
  const [redList, setRedList] = useState([]);
  const socket = useRef(null);
  const [redCount, setRedCount] = useState(0);
  const [greenCount, setGreenCount] = useState(0);
  const [retro, setRetro] = useState([]);
  const [allData, setAllData] = useState([]);
  const [isRetroAdmin, setIsRetroAdmin] = useState(false);
  const handleKeyDown = (event, color) => {
    if (event.key === "Enter" && event.target.value != "") {
      if (color === "red") {
        console.log(event.target.value);
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
        setAllData(response.data.cards);
        setIsRetroAdmin(response.data.is_retro_admin);
      })
      .catch((res) => {});
  }, []);

  useEffect(() => {
    socket.current = new WebSocket(
      `${baseUrlForSocket}/ws/socket-server/retro/reflect/${localStorage.getItem(
        "retro_id"
      )}/?token=${localStorage.getItem("access_token")}`
    );
    socket.current.onopen = () => {
      console.log("Refelct WebSocket connection opened");
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if ("data" in message) {
        if ("nextStep" in message.data) {
          handleNavigation(message, event.type);
          return;
        }
      }

      setRedCount(message.data.negative_cnt);
      setGreenCount(message.data.positive_cnt);
    };

    socket.current.onclose = () => {
      console.log("Reflect WebSocket connection closed");
    };
  }, []);

  const { workspaceId, boardId } = useParams();
  const navigate = useNavigate();
  const handleNavigation = (message, type) => {
    console.log(message);
    if (socket.current !== null) socket.current.close();

    if (message.data.nextStep !== undefined) {
      if (message.data.nextStep === "board") {
        localStorage.removeItem("retro_id");
        navigate(
          `/workspace/${workspaceId}/kanban/${boardId}/${message.data.nextStep}`
        );
      } else {
        navigate(
          `/workspace/${workspaceId}/kanban/${boardId}/retro/${message.data.nextStep}`
        );
      }
    }
    // }
  };

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
              <Typography style={{ color: getColor(theme.minorBg) }}>
                چه چیز هایی کار میکند؟
              </Typography>
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
                      color: getColor(theme.secondary),
                      backgroundColor: theme.secondary,
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontFamily: "Vazir",
                      color: getColor(theme.secondary),
                      // fontSize: "1.6rem",
                    },
                  }}
                  in
                  hiddenLabel
                  sx={{
                    border: "none",
                    borderRadius: "0.5rem",
                    // borderRadius: "0.5rem",
                    color: getColor(theme.secondary),
                    "& input::placeholder": {
                      fontSize: "1rem",
                      color: getColor(theme.secondary),
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
              <Typography style={{ color: getColor(theme.minorBg) }}>
                در کجا ها به مشکل خوردید؟
              </Typography>
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
                      color: getColor(theme.secondary),
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
                    "& input::placeholder": {
                      fontSize: "1rem",
                      color: getColor(theme.secondary),
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
      {isRetroAdmin && (
        <NextBtn currentStep={"Reflect"} text={"بعدی"} WS={socket.current} />
      )}
    </div>
  );
};

export default RetroReflect;
