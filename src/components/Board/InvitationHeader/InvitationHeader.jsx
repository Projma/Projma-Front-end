// rface snippet
import React from "react";
import "./InvitationHeader.scss";
import GroupAvatars from "../GroupAvatars/GroupAvatars";
import ShareButton from "../ShareButton/ShareButton";
import AddList from "../Add List/AddList";
import { Filter } from "@mui/icons-material";
import FilterTask from "../FilterTask/FilterTask";

const InvitationHeader = (props) => {
  const handleCreateList = (data) => {
    props.onCreateList(data);
  };
  return (
    <div className="invite-box">
      <ShareButton boardId={props.board_id} />
      <GroupAvatars boardId={props.board_id} />
      <AddList boardId={props.board_id} onCreateList={handleCreateList} />
      <FilterTask boardId={props.board_id} setLists={props.setLists} />
    </div>
  );
};

export default InvitationHeader;
