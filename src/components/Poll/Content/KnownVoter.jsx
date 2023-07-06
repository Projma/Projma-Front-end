import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import React, {useEffect, useState} from 'react';
import apiInstance from '../../../utilities/axiosConfig';
import {useParams} from 'react-router-dom';
import {Typography} from '@mui/material';
import useTheme from '../../../hooks/useTheme';
import { baseUrl } from '../../../utilities/constants';


const KnownVoter = ({voters}) => {
  // const [member, setMember] = useState([]);
  const [voter, setVoter] = useState(new Array(voters.length));
  const param = useParams();
  const {theme, getColor} = useTheme();
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
        // console.log('member', voters);
      });
    };
    getMember();
  }, [voters]);
  // console.log(voter,voters);
  return (<>
    {voters.length === 0  ?
      (<Typography fontSize="1.1rem" style={{color: getColor(theme.minorBg)}}>رای گیری شناس</Typography>) :
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
              src={x.profile_pic !== null ? baseUrl.slice(0,-1)+x.profile_pic : 'none'}
              sx={{color: getColor(theme.secondary), backgroundColor: theme.secondary}}
              
              className="card_avatar-profile-picture"
            >
              {(x.first_name[0] +x.last_name[0]).toUpperCase()}
            </Avatar>
          </Tooltip>
        ))}
      </AvatarGroup>
    }
  </>);
};

export default KnownVoter;