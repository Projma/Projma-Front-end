// rface snippet
import React from "react";
import "./InvitationHeader.scss";
import GroupAvatars from "../GroupAvatars/GroupAvatars";
import ShareButton from "../ShareButton/ShareButton";
import AddList from "../../Add List/AddList";
import { Filter } from "@mui/icons-material";
import FilterTask from "../FilterTask/FilterTask";
import InfoChart from "../InfoChart/InfoChart";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const InvitationHeader = (props) => {
  const handleCreateList = (data) => {
    props.onCreateList(data);
  };
  const matches = useMediaQuery("(min-width:450px)");
  if (matches) {
    return (
      <>
        <div className="invite-box">
          <ShareButton boardId={props.board_id} />
          <GroupAvatars boardId={props.board_id} />
          <AddList boardId={props.board_id} onCreateList={handleCreateList} />
          <FilterTask boardId={props.board_id} setLists={props.setLists} />
          <InfoChart boardId={props.board_id} />
        </div>
      </>
    );
  } else {
    return (
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        // padding: "5%",
        // margin: "0 5% 5% 5%",

      }}>
        <div className="invite-box" style={{
          marginBottom: "5%",
        }}>
          <ShareButton boardId={props.board_id} />
          <GroupAvatars boardId={props.board_id} />
        </div>
        <div className="invite-box" style={{
          marginBottom: "5%",
        }}>
          <AddList boardId={props.board_id} onCreateList={handleCreateList} />
          <FilterTask boardId={props.board_id} setLists={props.setLists} />
        </div>
        <div className="invite-box">
          <InfoChart boardId={props.board_id} />
        </div>
      </div>
    );
  }
};

export default InvitationHeader;
