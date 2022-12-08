// import React from 'react';
import "./GroupAvatars.scss";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

const GroupAvatars = () => {
    return (
        <div className="board_card-avatar">
            <AvatarGroup
                max={6}
                spacing="medium"
                sx={{ direction: "ltr", border: "none" }}
                // className="board_avatar-container"
            >
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
        </div>
    )
}


export default GroupAvatars