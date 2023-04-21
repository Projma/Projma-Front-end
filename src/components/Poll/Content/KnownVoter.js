import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";

const KnownVoter = ({voters}) => {
  console.log(voters);
  return ( <>
    <AvatarGroup
      max={5}
      spacing="-1"
      sx={{ direction: "ltr", border: "none" }}
      className="card_avatar-container"
    >
      {voters.map((x) => (
        <Tooltip title={x.first_name + " " + x.last_name}>
          <Avatar
            key={crypto.randomUUID()}
            alt={x.first_name + " " + x.last_name}
            src={x.profile_pic !== null ? x.profile_pic : "none"}
            {...stringAvatar(x.first_name + " " + x.last_name)}
            className="card_avatar-profile-picture"
          />
        </Tooltip>
      ))}
    </AvatarGroup>
    </> );
}

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
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
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}
export default KnownVoter;