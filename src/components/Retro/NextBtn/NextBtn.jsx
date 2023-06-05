// import { useState, useEffect } from "react";
// import { Typography } from "@mui/material";
import { useEffect } from "react";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { createContext, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const NextBtn = (props) => {
    // get workspaceId and boardId from url
    const socket = useRef(null);
    const { workspaceId, boardId } = useParams();
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const navigateToNextStep = () => {
        var nextStep = "group"
        if (props.currentStep === "Reflect") {
            nextStep = "group";
        } else if (props.currentStep === "Group") {
            nextStep = "vote";
        } else if (props.currentStep === "Vote") {
            nextStep = "discuss";
        } else if (props.currentStep === "Discuss") {
            nextStep = "board";
        } else {
            nextStep = "";
        }

        // socket.current.send(
        //     JSON.stringify({
        //         type: "navigate_to_next_step",
        //         data: { nextStep: nextStep },
        //     })
        // );
        props.WebSocket.send(
            JSON.stringify({
                type: "navigate_to_next_step",
                data: { nextStep: nextStep },
            })
        );

        // close connection
        // if (socket.current !== null)
        //     socket.current.close();
        if (props.WebSocket !== null)
            props.WebSocket.close();

        if (nextStep === "board") {
            localStorage.removeItem("retro_id");
            navigate(`/workspace/${workspaceId}/kanban/${boardId}/board`);
        } else {
            navigate(`/workspace/${workspaceId}/kanban/${boardId}/retro/${nextStep}`);
        }

        // console.log("here")
    };

    const handleNavigation = (message, type) => {
        // if (type === "navigate_to_next_step") {
        
        // close connection 
        if (socket.current !== null)
            socket.current.close();

        // if (props.WebSocket !== null)
        //     props.WebSocket.close();
        
        if (message.data.nextStep === "board") {
            localStorage.removeItem("retro_id");
            navigate(`/workspace/${workspaceId}/kanban/${boardId}/${message.data.nextStep}`);
        } else {
            navigate(`/workspace/${workspaceId}/kanban/${boardId}/retro/${message.data.nextStep}`);
        }
        // }
    }

    useEffect(() => {

        // socket.current = new WebSocket(
        //     `ws://localhost:8000/ws/socket-server/retro/session/${localStorage.getItem("retro_id")}/?token=${localStorage.getItem(
        //         "access_token"
        //     )}`
        // );
        socket.current = new WebSocket(
            `ws://localhost:8000/ws/socket-server/retro/discuss/${localStorage.getItem(
                "retro_id"
            )}/?token=${localStorage.getItem("access_token")}`
        );

        socket.current.onopen = () => {
            console.log("Next WebSocket connection opened");
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
            handleNavigation(message, message.type);
        };
        socket.current.onclose = () => {
            console.log("Next WebSocket connection closed");
        };
        

        // props.WebSocket.onmessage = (event) => {
        //     const message = JSON.parse(event.data);
        //     console.log(message);
        //     handleNavigation(message, message.type);
        // };


    }, [])

    return (
        <Box sx={{
            width: 500,
            position: 'fixed',
            bottom: 15,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }} >
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                sx={{
                    backgroundColor: '#FFF',
                    borderRadius: '10px'
                }}
            >
                <BottomNavigationAction label={props.text} icon={<NavigateNextIcon />} onClick={
                    () => {
                        navigateToNextStep();
                    }
                } />
                {/* <BottomNavigationAction label="Recents" icon={<RestoreIcon />}  />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
            </BottomNavigation>
        </Box>
    )
};

export default NextBtn;