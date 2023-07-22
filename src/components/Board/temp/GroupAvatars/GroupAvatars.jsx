import "./GroupAvatars.scss";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import apiInstance from "../../../../utilities/axiosConfig";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../../utilities/constants";
import useTheme from "../../../../hooks/useTheme";

const GroupAvatars = (props) => {
  const { theme, getColor } = useTheme();
  const [members, setMembers] = React.useState([]);
  const params = useParams();
  useEffect(() => {
    apiInstance.get(`board/${params.boardId}/members/`).then((res) => {
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
      console.log(res.data);
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
            <Avatar
              key={x.id}
              alt={(x.user.first_name + " " + x.user.last_name).toString()}
              src={baseUrl.slice(0, -1) + x.profile_pic}
              sx={{
                color: getColor(theme.secondary),
                backgroundColor: theme.secondary,
              }}
            >
              {(x.user.first_name[0] + x.user.last_name[0])?.toUpperCase()}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    </div>
  );
};

export default GroupAvatars;

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

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
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}
