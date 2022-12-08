// import React from 'react';
import "./GroupAvatars.scss";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const GroupAvatars = () => {
    // like Card.js
    return (
        <div className="board_card-avatar">
            <AvatarGroup
                max={6}
                spacing="medium"
                sx={{
                    direction: "ltr",
                    border: "none",
                    margin: "1%",
                }}
            // className="board_avatar-container"
            >
                {/* {members.map((x) => (
                <Tooltip title={x.name}>
                    <Avatar
                        key={x.id}
                        alt={x.name}
                        src={x.avatar !== null ? x.avatar : "none"}
                        {...stringAvatar(x.name)}
                        className="board_avatar-profile-picture"
                    />
                </Tooltip>
            } */}
                <Avatar alt="Remy Sharp" />
                <Avatar alt="Travis Howard" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
        </div>
    )
}

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
    // return {
    //     children: `${name.split(" ")[0][0].toUpperCase()}${name
    //         .split(" ")[1][0]
    //         .toUpperCase()}`,
    // };
}


export default GroupAvatars