import React, { useEffect } from "react";
import "./Discuss.scss";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import ThumbUpTwoToneIcon from '@mui/icons-material/ThumbUpTwoTone';
import { convertNumberToPersian, convertNumberToEnglish } from "../../../utilities/helpers";
import GroupAvatars from "../../Board/temp/GroupAvatars/GroupAvatars";
import { useParams } from "react-router-dom";
import RetroCard from "../content/RetroCard";
import apiInstance from "../../../utilities/axiosConfig";
import NextBtn from "../NextBtn/NextBtn";
import { createContext, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";


const Discuss = () => {
    const { workspaceId, boardId } = useParams();
    const [boardName, setBoardName] = React.useState("");
    const [BoardDescription, setBoardDescription] = React.useState("");
    const [groups_and_cards, setGroups_and_cards] = useState([]);
    const socket = useRef(null);
    const [isRetroAdmin, setIsRetroAdmin] = useState(true);

    useEffect(() => {
        apiInstance.
            get(`/board/${boardId}/get-board-overview/`).then((res) => {
                setBoardName(res.data.name);
                setBoardDescription(res.data.description);
            }).catch((err) => {
                console.log(err);
            });

        apiInstance.get(`retro/${localStorage.getItem("retro_id")}/get-session-discuss/`).then((res) => {
            // {
            //     "id": 2,
            //     "retro_step": 0,
            //     "groups": [
            //       {
            //         "id": 1,
            //         "name": "1",
            //         "retro_session": 2,
            //         "is_discussed": false,
            //         "votes": 0
            //       },
            //       {
            //         "id": 2,
            //         "name": "2",
            //         "retro_session": 2,
            //         "is_discussed": false,
            //         "votes": 0
            //       },
            //       {
            //         "id": 3,
            //         "name": "5",
            //         "retro_session": 2,
            //         "is_discussed": false,
            //         "votes": 0
            //       },
            //       {
            //         "id": 4,
            //         "name": "7",
            //         "retro_session": 2,
            //         "is_discussed": false,
            //         "votes": 0
            //       }
            //     ]
            //   }
            console.log(res.data.groups);
            setGroups_and_cards(res.data.groups);
            setIsRetroAdmin(res.data.is_retro_admin);
            console.log("isRetroAdmin: ", res.data.is_retro_admin);
        }).catch((err) => {
            console.log(err);
        });

        socket.current = new WebSocket(
            `ws://localhost:8000/ws/socket-server/retro/discuss/${localStorage.getItem(
                "retro_id"
            )}/?token=${localStorage.getItem("access_token")}`
        );
        socket.current.onopen = () => {
            console.log("WebSocket connection opened");
            // socket.current.send(
            //   JSON.stringify({
            //     type: "join_board_group",
            //     data: { board_id: boardId },
            //   })
            // );
        };

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data);
            // console.log(message);
            // if (event.data.type == 'next_step') {
            if ("nextStep" in message.data) {
                console.log("next_step entered");
                handleNavigation(message, event.type);
                return;
            }
        };

        socket.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

    }, []);

    const navigate = useNavigate();
    const handleNavigation = (message, type) => {
        // if (type === "navigate_to_next_step") {
        console.log("--------------------");
        console.log(message);
        // // delete retro id from database
        // apiInstance.delete(`/retro/${localStorage.getItem("retro_id")}/`).then((res) => {
        //     console.log(res);
        // }).catch((err) => {
        //     console.log(err);
        // });

        // close connection 
        if (socket.current !== null)
            socket.current.close();

        // if (props.WS !== null)
        //     props.WS.close();
        if (message.data.nextStep !== undefined) {
            if (message.data.nextStep === "board") {
                localStorage.removeItem("retro_id");
                navigate(`/workspace/${workspaceId}/kanban/${boardId}/${message.data.nextStep}`);
            } else {
                navigate(`/workspace/${workspaceId}/kanban/${boardId}/retro/${message.data.nextStep}`);
            }
        }
    };

    return (
        <>
            <div style={{
                width: '100%',
                overflow: 'scroll',
                maxHeight: '100%',
            }}>
                <div className="discuss-header">
                    <div className="discuss-header-right">
                        <div>
                            <span className="discuss-header-right-title">نام بورد:</span>
                            <span className="discuss-header-right-title"> </span>
                            <span className="discuss-header-right-title">{boardName}</span>
                        </div>
                        <div>
                            <span className="discuss-header-right-subtitle">توضیحات بورد:</span>
                            <span className="discuss-header-right-subtitle"> </span>
                            <span className="discuss-header-right-subtitle"> {BoardDescription}</span>
                        </div>
                    </div>
                    <div className="discuss-header-left">
                        <GroupAvatars boardId={boardId} />
                    </div>
                </div>
                <p className="header_text">
                    بحث و گفت‌و‌گو
                </p>
                <p className="paragraph">
                    برای ثبت گام‌های بعدی، کارت‌های کاری آماده تهیه کنید.
                </p>

                {/* <div>
                    <div className="discuss-topic">
                        <span className="discuss-topic-item">
                            <span className="discuss-topic-item-title">"</span>
                            <span className="discuss-topic-item-title">کم کاری ممد</span>
                            <span className="discuss-topic-item-title">"</span>
                            <span className="discuss-topic-item-title"> </span>
                            <span className="discuss-topic-item-like">
                                <ThumbUpTwoToneIcon className="discuss-topic-item-like-icon" />
                                <span className="discuss-topic-item-like-number">{convertNumberToPersian(10)}</span>
                            </span>
                        </span>
                    </div>
                    <Container>
                        <Grid
                            container
                            columns={{ xs: 2, sm: 4, md: 4 }}
                            spacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{
                                marginBottom: "7%",
                            }}
                        >
                            <Grid item xs={2} sm={2} md={2} sx={{}} >
                                <RetroCard>
                                    مناظره هایی که در چت گروهی به جایی نمی رسد
                                </RetroCard>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} sx={{}}>
                                <RetroCard>
                                    برخی از مردم همیشه تمام وقت خود را برای پخش می گذارند. به سختی می توان ایده های من را مطرح کرد
                                </RetroCard>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} sx={{}}>
                                <RetroCard>
                                    من مایلم به کارآموزان و کارکنان جوان خود فضای بیشتری برای به اشتراک گذاشتن ایده ها و تفکر تازه خود بدهم
                                </RetroCard>
                            </Grid>
                            <Grid item xs={2} sm={2} md={2} sx={{}}>
                                <RetroCard>
                                    لعنت به این زندگی کوفتی.
                                </RetroCard>
                            </Grid>
                        </Grid>

                    </Container>
                </div> */}

                {
                    groups_and_cards?.map((group, index) => {
                        return (
                            <div key={index} id={group.id} 
                            >
                                <div className="discuss-topic">
                                    <span className="discuss-topic-item">
                                        <span className="discuss-topic-item-title">نام گروه: </span>
                                        <span className="discuss-topic-item-title">"</span>
                                        <span className="discuss-topic-item-title">{group.name}</span>
                                        <span className="discuss-topic-item-title">"</span>
                                        <span className="discuss-topic-item-title"> </span>
                                        <span className="discuss-topic-item-like">
                                            <span className="discuss-topic-item-like-number"> آراء:</span>
                                            <ThumbUpTwoToneIcon className="discuss-topic-item-like-icon" />
                                            <span className="discuss-topic-item-like-number">{convertNumberToPersian(group.votes)}</span>
                                        </span>
                                    </span>
                                </div>
                                <Container>
                                    {/* show all cards(<RetroCard>) here width Grid in responsible mode */}
                                    <Grid
                                        container
                                        columns={{ xs: 2, sm: 4, md: 4 }}
                                        spacing={{ xs: 1, sm: 2, md: 3 }}
                                        sx={{
                                            // paddingTop: "5%",
                                            // marginTop: "10%",
                                            marginBottom: "7%",
                                            // backgroundColor: "#f5f5f5",
                                        }}
                                    >
                                        {
                                            group.cards?.map((card, index) => {
                                                return (
                                                    <Grid item xs={2} sm={2} md={2} sx={{}} key={index}>
                                                        {/*add green label to the good RetroCard */}
                                                        {/*add red label to the bad RetroCard */}
                                                        <RetroCard>
                                                            {card.text}
                                                        </RetroCard>
                                                    </Grid>
                                                );
                                            }
                                            )
                                        }
                                    </Grid>
                                </Container>
                            </div>
                        );
                    })
                }

            </div>
            {isRetroAdmin && (<NextBtn
                currentStep={"Discuss"}
                text={"پایان جلسه"}
                WS={socket.current}
            />)
            }
        </>
    );
};

export default Discuss;