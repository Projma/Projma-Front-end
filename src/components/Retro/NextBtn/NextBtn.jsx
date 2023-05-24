// import { useState, useEffect } from "react";
// import { Typography } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const NextBtn = () => {

    const [value, setValue] = React.useState(0);
    const navigateToNextStep = () => {
        // navigate(`/kanban/${boardId}/board`);
        console.log("here")
    };

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