import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import {useEffect, useState} from 'react';
import apiInstance from '../../../utilities/axiosConfig';
import {useParams} from 'react-router-dom';

const KnownVoter = ({voters}) => {
  // const [member, setMember] = useState([]);
  const [voter, setVoter] = useState(new Array(voters.length));
  const param = useParams();
  useEffect(() => {
    const getMember = async () => {
      await apiInstance.get(`board/${param.boardId}/members/`).then(res => {
        // setMember(res.data);
        setVoter(voters.map(x => {
          let fn, ln, pp;
          res.data.forEach(y => {
            if (x.user__pk === y.user.id) {
              fn = y.user.first_name;
              ln = y.user.last_name;
              pp = y.profile_pic;
              // console.log("inbaz",fn,ln,pp);
            }
          });
          return {first_name: fn, last_name: ln, profile_pic: pp};
        }));
        // console.log('member', res.data);
      });
    };
    getMember();
  }, [voters]);
  // console.log(voter,voters);
  return (<>
    <AvatarGroup
      max={5}
      spacing="6"
      sx={{direction: 'ltr', border: 'none'}}
      className="card_avatar-container"
    >
      {voter.map((x) => (
        <Tooltip title={x.first_name + ' ' + x.last_name}>
          <Avatar
            key={crypto.randomUUID()}
            alt={x.first_name + ' ' + x.last_name}
            src={x.profile_pic !== null ? x.profile_pic : 'none'}
            {...stringAvatar(x.first_name + ' ' + x.last_name)}
            className="card_avatar-profile-picture"
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  </>);
};

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
    children: `${name.split(' ')[0][0].toUpperCase()}${name.split(' ')[1][0].toUpperCase()}`,
  };
}

export default KnownVoter;