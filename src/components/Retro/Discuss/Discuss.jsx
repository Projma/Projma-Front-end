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


const Discuss = () => {
    const { boardId } = useParams();
    const [boardName, setBoardName] = React.useState("");
    const [BoardDescription, setBoardDescription] = React.useState("");
    const [groups_and_cards, setGroups_and_cards] = useState([]);
    const socket = useRef(null);

    useEffect(() => {
        apiInstance.
            get(`/board/${boardId}/get-board-overview/`).then((res) => {
                setBoardName(res.data.name);
                setBoardDescription(res.data.description);
            }).catch((err) => {
                console.log(err);
            });

        apiInstance.get(`retro/${localStorage.getItem("retro_id")}/get-group/`).then((res) => {
            console.log(res.data);
            setGroups_and_cards(res.data);
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
            console.log(message);
            // dnd_socket(message, message.type);
            // setGoodCards(message.good_cards);
            // setBadCards(message.bad_cards);
            // setGroups(message.groups);
        };

        socket.current.onclose = () => {
            console.log("WebSocket connection closed");
        };

    }, []);

    return (
        <>
            <div style={{
                width: '100%',
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

                <div>
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
                        {/* show all cards(<RetroCard>) here width Grid in responsible mode */}
                        <Grid
                            container
                            columns={{ xs: 2, sm: 4, md: 4 }}
                            spacing={{ xs: 1, sm: 2, md: 3 }}
                            sx={{
                                marginBottom: "7%",
                            }}
                        >
                            <Grid item xs={2} sm={2} md={2} sx={{}} >
                                {/*add green label to the RetroCard */}
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
                </div>
                {/* like the above div but with different color */}

                {
                    groups_and_cards.map((group, index) => {
                        return (
                            <div key={index}>
                                <div className="discuss-topic">
                                    <span className="discuss-topic-item">
                                        <span className="discuss-topic-item-title">"</span>
                                        <span className="discuss-topic-item-title">{group.name}</span>
                                        <span className="discuss-topic-item-title">"</span>
                                        <span className="discuss-topic-item-title"> </span>
                                        <span className="discuss-topic-item-like">
                                            <ThumbUpTwoToneIcon className="discuss-topic-item-like-icon" />
                                            <span className="discuss-topic-item-like-number">{convertNumberToPersian(group.likes)}</span>
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
                                            group.cards.map((card, index) => {
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
            {/* if is admin ? */}
            <NextBtn 
                currentStep={"Discuss"}
                text={"پایان جلسه"}
                WebSocket={socket.current}
            />
        </>
    );
};

export default Discuss;