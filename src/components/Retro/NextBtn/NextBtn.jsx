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

const NextBtn = () => {

    const [value, setValue] = React.useState(0);
    const navigateToNextStep = () => {
        // navigate(`/kanban/${boardId}/board`);
        console.log("here")
    };
    const socket = useRef(null);
    useEffect(() => {
        // socket.current = new WebSocket(
        //     `ws://localhost:8000/ws/socket-server/retro/session/${localStorage.getItem("retro_id")}/?token=${localStorage.getItem(
        //         "access_token"
        //     )}`
        // );
        // socket.current.onopen = () => {
        //     console.log("WebSocket connection opened");
        //     socket.current.send(
        //         JSON.stringify({
        //             type: "session_next",
        //         })
        //     );
        // };

        // socket.current.onmessage = (event) => {
        //     const message = JSON.parse(event.data);
        //     console.log(message);
        //     // dnd_socket(message, message.type);
        // };

        // socket.current.onclose = () => {
        //     console.log("WebSocket connection closed");
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
                <BottomNavigationAction label="بعدی" icon={<NavigateNextIcon />} onClick={
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