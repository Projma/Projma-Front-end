import "./Poll.css";
import AddPoll from "./AddPoll/AddPoll";
import PollView from "./PollView";
import { Typography, Button, Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import CreateEvent from "../Calendar/CreateEvent";
import imga from "../../static/images/landing/landing1.jpg";

const Poll = () => {
  const [open, setOpen] = useState(false);
  const openAddPoll = () => {
    setOpen(true);
  };
  const closeAddPoll = () => {
    setOpen(false);
  };
  return (
    <div className="poll_container">
      <Modal
        open={open}
        onClose={closeAddPoll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPoll handleClose={closeAddPoll} />
      </Modal>
      {/*<AddPoll />*/}
      <div className="poll_view">
        <div className="poll_open">
          <PollView />
        </div>
        <div
          className="poll_closed"
        >
        </div>
      </div>
      <div className="poll_button">
        <Fab color="primary" aria-label="add" onClick={openAddPoll}>
          <AddIcon />
        </Fab>
        {/*<Button type="button" variant="contained" >*/}
        {/*  ایجاد نظرسنجی*/}
        {/*</Button>*/}
      </div>
    </div>
  );
};

export default Poll;
