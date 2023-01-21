// rface snippet
import React from "react";
import "./InvitationHeader.scss";
import GroupAvatars from "../GroupAvatars/GroupAvatars";
import ShareButton from "../ShareButton/ShareButton";
import AddList from "../Add List/AddList";
import { Filter } from "@mui/icons-material";
import FilterTask from "../FilterTask/FilterTask";
import InfoChart from "../InfoChart/InfoChart";
import { Grid } from "@mui/material";

const InvitationHeader = (props) => {
  const handleCreateList = (data) => {
    props.onCreateList(data);
  };
  return (
    <>
    <div className="invite-box">
      {/* <Grid container spacing={1} columns={{ xs: 6, sm: 8, md: 15 }}>
      <Grid item xs={2} sm={2} md={2} >
        <ShareButton boardId={props.board_id} />
      </Grid>

      <Grid item xs={2} sm={2} md={2}>
        <GroupAvatars boardId={props.board_id} />
      </Grid>

      <Grid item xs={2} sm={2} md={3}>
        <AddList boardId={props.board_id} onCreateList={handleCreateList} />
      </Grid>

      <Grid item xs={2} sm={2} md={2}>
        <FilterTask boardId={props.board_id} setLists={props.setLists} />
      </Grid>

      <Grid item xs={2} sm={2} md={4}>
        <InfoChart boardId={props.board_id} />
      </Grid>
    </Grid> */}
      <ShareButton boardId={props.board_id} />
      <GroupAvatars boardId={props.board_id} />
      <AddList boardId={props.board_id} onCreateList={handleCreateList} />
      {/* </div> */}
      {/* <div className="invite-box"> */}
      <FilterTask boardId={props.board_id} setLists={props.setLists} />
      <InfoChart boardId={props.board_id} />
    </div>
    </>
  );
};

export default InvitationHeader;
