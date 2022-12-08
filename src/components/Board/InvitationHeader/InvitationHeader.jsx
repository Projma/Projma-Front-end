// rface snippet
import React from 'react';
import "./InvitationHeader.scss";
import GroupAvatars from '../GroupAvatars/GroupAvatars';
import ShareButton from '../ShareButton/ShareButton';

const InvitationHeader = () => {
    return (
        <div className='invite-box'>
            <ShareButton/>
            <GroupAvatars/>
        </div>
    )
}

export default InvitationHeader