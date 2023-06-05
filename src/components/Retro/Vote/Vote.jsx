import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import RetroList from "../content/RetroList";
import VoteCard from "./VoteCard";
import "../RetroReflect.scss";
import VoteSetting from "./VoteSetting";
import { toast } from "react-toastify";
import NextBtn from "../NextBtn/NextBtn";
import useTheme from "../../../hooks/useTheme";
import apiInstance from "../../../utilities/axiosConfig";
import { useParams, useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RetroCard2 from "./Vote2Card";

const Vote = () => {
  const { theme, getColor } = useTheme();
  const [allowVotePerUser, setAllowVotePerUser] = React.useState(0);
  const [allowVotePerItem, setAllowVotePerItem] = React.useState(5);
  const [greenList, setGreenList] = useState(["1", "2", "3", "4", "5"]);
  const [redList, setRedList] = useState(["1", "2", "3", "4", "5"]);
  const [voteNumber, setVoteNumber] = useState([0, 0, 0, 0, 0]);
  const [remainingVote, setRemainingVote] = useState(0);
  const [isRetroAdmin, setIsRetroAdmin] = useState(true);
  const socket = useRef(null);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    apiInstance
      .get(`retro/${localStorage.getItem("retro_id")}/get-session-vote/`)
      .then((response) => {
        setIsRetroAdmin(response.data.is_retro_admin);
        const myList = Object.entries(response.data.group_votes);
        const data = myList.map((group) => ({
          id: group[1].id,
          cards: group[1].cards,
          is_positive: group[1].is_positive,
          vote_cnt: group[1].vote_cnt,
          hide: true,
        }));
        setAllData(data);
        console.log(response.data);
      })
      .catch((res) => {});
  }, []);

  useEffect(() => {
    socket.current = new WebSocket(
      `ws://localhost:8000/ws/socket-server/retro/vote/${localStorage.getItem(
        "retro_id"
      )}/?token=${localStorage.getItem("access_token")}`
    );

    socket.current.onopen = () => {
      console.log("Vote WebSocket connection opened");
      // console.log(socket.current)
    };

    socket.current.onmessage = (event) => {
      // console.log("event.type"); // message
      // console.log(event.type); // message
      const message = JSON.parse(event.data);

      // // if event.data has type
      // if (event.data.type == 'next_step') {
      if ("data" in message) {
        if ("nextStep" in message.data) {
          console.log("next_step entered");
          handleNavigation(message, event.type);
          return;
        }
      }
    };

    socket.current.onclose = () => {
      console.log("Vote WebSocket connection closed");
    };
  }, []);

  const handleKeyDown = (event, color) => {
    if (event.key === "Enter" && event.target.value != "") {
      if (color === "red") {
        setRedList((perv) => [...perv, event.target.value]);
      } else if (color === "green") {
        setGreenList((perv) => [...perv, event.target.value]);
      }
      event.target.value = "";
    }
  };

  const onVoteChange = (type, id) => {
    console.log("onVoteChange");
    if (type === "add") {
      const new_data = allData.map((data) => {
        if (data.id == id) {
          data.vote_cnt += 1;
          socket.current.send(
            JSON.stringify({
              type: "vote",
              data: {
                value: 1,
                card_group_id: id,
              },
            })
          );
        }
        return data;
      });
      setAllData(new_data);
    } else if (type === "remove") {
      const new_data = allData.map((data) => {
        if (data.id == id) {
          if (data.vote_cnt != 0) {
            data.vote_cnt -= 1;
            setAllData(new_data);
            socket.current.send(
              JSON.stringify({
                type: "vote",
                data: {
                  value: -1,
                  card_group_id: id,
                },
              })
            );
          }
        }
        return data;
      });
    }
  };

  const handleClickHide = (group) => {
    console.log(group);
    const the_group = { ...group, hide: !group.hide };
    const index = allData.findIndex((x) => x.id === the_group.id);
    const new_allData = [...allData];
    new_allData[index] = the_group;
    setAllData(new_allData);
  };

  const handleChangeVoteUser = (type) => {
    if (type === "add") {
      setAllowVotePerUser(allowVotePerUser + 1);
      setRemainingVote(remainingVote + 1);
      console.log(allowVotePerUser);
    } else if (type === "remove") {
      if (allowVotePerUser > 0) {
        setAllowVotePerUser(allowVotePerUser - 1);
        setRemainingVote(remainingVote - 1);
      } else {
        toast.error("تعداد رای‌های مجاز برای یک شخص نمی‌تواند کمتر از 0 باشد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
      }
    }
  };

  const handleChangeVoteItem = (type) => {
    if (type === "add") {
      setAllowVotePerItem(allowVotePerItem + 1);
      console.log(allowVotePerItem);
    } else if (type === "remove") {
      if (allowVotePerItem > 0) {
        setAllowVotePerItem(allowVotePerItem - 1);
      } else {
        toast.error(
          "تعداد رای‌های مجاز برای یک آیتم نمی‌تواند کمتر از 0 باشد",
          { position: toast.POSITION.BOTTOM_LEFT, rtl: true }
        );
      }
    }
  };

  const { workspaceId, boardId } = useParams();
  const navigate = useNavigate();
  const handleNavigation = (message, type) => {
    // if (type === "navigate_to_next_step") {
    console.log("--------------------");
    console.log(message);
    // close connection
    if (socket.current !== null) socket.current.close();

    // if (props.WS !== null)
    //     props.WS.close();
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
  };

  return (
    <div className="RetroReflect-container" style={{ flexDirection: "column" }}>
      <div className="RetroReflect-vote-header">
        <Typography
          className="RetroReflect-vote-header-myVote"
          style={{ flexDirection: "row" }}
        >
          <div style={{ display: "flex", color: getColor(theme.mainBg) }}>
            {" "}
            رای‌های باقیمانده: {remainingVote}
          </div>
          <div style={{ display: "flex" }}>
            <VoteSetting
              handleChangeVoteUserim={handleChangeVoteUser}
              handleChangeVoteItemim={handleChangeVoteItem}
              allowVotePerUser={allowVotePerUser}
              allowVotePerItem={allowVotePerItem}
            />
          </div>
        </Typography>
      </div>
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
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {allData.map(
                  (group, index) =>
                    group.is_positive && (
                      <div style={{ width: "100%" }}>
                        <div style={{ display: "flex" }}>
                          {group.hide && (
                            <ArrowDropDownIcon
                              sx={{ color: "#fff" }}
                              onClick={() => handleClickHide(group)}
                            ></ArrowDropDownIcon>
                          )}
                          {!group.hide && (
                            <ArrowDropUpIcon
                              sx={{ color: "#fff" }}
                              onClick={() => handleClickHide(group)}
                            ></ArrowDropUpIcon>
                          )}

                          <VoteCard
                            voteNumber={group.vote_cnt}
                            handleVoteChange={onVoteChange}
                            index={group.id}
                          >
                            {group.cards[0].text}
                          </VoteCard>
                        </div>
                        {group.hide == false && (
                          <div>
                            {group.cards.map((card) => (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <RetroCard2>{card.text}</RetroCard2>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                )}
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
            <div className="RetroReflect-list-card">
              <div className="RetroReflect-list-card-container">
                {allData.map(
                  (group, index) =>
                    !group.is_positive && (
                      <div style={{ width: "100%" }}>
                        <div style={{ display: "flex" }}>
                          {group.hide && (
                            <ArrowDropDownIcon
                              sx={{ color: "#fff" }}
                              onClick={() => handleClickHide(group)}
                            ></ArrowDropDownIcon>
                          )}
                          {!group.hide && (
                            <ArrowDropUpIcon
                              sx={{ color: "#fff" }}
                              onClick={() => handleClickHide(group)}
                            ></ArrowDropUpIcon>
                          )}

                          <VoteCard
                            voteNumber={group.vote_cnt}
                            handleVoteChange={onVoteChange}
                            index={group.id}
                          >
                            {group.cards[0].text}
                          </VoteCard>
                        </div>
                        {group.hide == false && (
                          <div>
                            {group.cards.map((card) => (
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <RetroCard2>{card.text}</RetroCard2>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                )}
              </div>
            </div>
          </RetroList>
        </div>
      </div>
      {isRetroAdmin && (
        <NextBtn currentStep={"Vote"} text={"بعدی"} WS={socket.current} />
      )}
    </div>
  );
};

export default Vote;
