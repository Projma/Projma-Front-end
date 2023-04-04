// import React from 'react';
import "./GroupAvatars.scss";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import apiInstance from "../../../../utilities/axiosConfig";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../utilities/constants";
// import { Box } from "@mui/material";

const GroupAvatars = (props) => {
    const [members, setMembers] = React.useState([]);
    const params = useParams();
    useEffect(() => {
        apiInstance.get(`/workspaces/board/${params.id}/members/`).then((res) => {
            // apiInstance.get(`/workspaces/board/${props.boardId}/members/`).then((res) => {
            // ////console.log(res.data);
            setMembers(res.data);
            // array of members
            // "user": {
            //     "id": 1,
            //     "first_name": "",
            //     "last_name": "",
            //     "username": "superuser",
            //     "password": "pbkdf2_sha256$390000$KpLcn5HQQv28LKn5PcbOvQ$si5sOOcWlTO+3U2Gwu1TqldM9TQ/F44Z7VcQiDJwZD0=",
            //     "email": "superuser@gmail.com"
            //   },
            //   "birth_date": null,
            //   "bio": null,
            //   "phone": null,
            //   "profile_pic": null,
            //   "role": "Member"
            // }
        });
    }, []);
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
                {members.map((x) => (
                    <Tooltip title={x.user.username}>
                        {/* <Box sx={{
                            // display: "flex",
                            // marginLeft: "2%",
                        }}> */}
                            <Avatar
                                key={x.id}
                                alt={(x.user.first_name + " " + x.user.last_name).toString()}
                                src={x.profile_pic !== null ? baseUrl+x.profile_pic : "none"}
                                {...stringAvatar((x.user.first_name + " " + x.user.last_name).toString())}
                            // className="board_avatar-profile-picture"
                            />
                        {/* </Box> */}
                    </Tooltip>
                ))}

                {/* <Avatar alt="Remy Sharp" />
                <Avatar alt="Travis Howard" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" /> */}

            </AvatarGroup>
        </div>
    )
}


export default GroupAvatars

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
            // width: 56,
            // height: 56
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
    // return {
    //     children: `${name.split(" ")[0][0].toUpperCase()}${name
    //         .split(" ")[1][0]
    //         .toUpperCase()}`,
    // };
}
