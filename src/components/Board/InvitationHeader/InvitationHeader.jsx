// rface snippet
import React from 'react';
import "./InvitationHeader.scss";
import GroupAvatars from '../GroupAvatars/GroupAvatars';
import ShareButton from '../ShareButton/ShareButton';

const InvitationHeader = (props) => {
    return (
        <div className='invite-box'>
            <ShareButton boardId={props.board_id}/>
            <GroupAvatars boardId={props.board_id}/>
        </div>
    )
}

export default InvitationHeader