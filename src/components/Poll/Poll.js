import "./Poll.css";
import AddPoll from "./AddPoll/AddPoll";
import {
  Typography,Button,Fab,Modal
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import React, {useState} from "react";
import CreateEvent from "../Calendar/CreateEvent";

const Poll = () => {
  const [open, setOpen] = useState(false);
  const openAddPoll = () => {
    setOpen(true);
  }
  const closeAddPoll = () => {
    setOpen(false);
  }
  return (
    <div className="poll_container">
      <Modal
        open={open}
        onClose={closeAddPoll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPoll
          handleClose={closeAddPoll}
        />
      </Modal>
       {/*<AddPoll />*/}
      <div className="poll_label">
        <Typography>awdwd</Typography>
      </div>
      <div className="poll_attendents">
        {/*<Typography>Anonymous Poll</Typography>*/}
      </div>
      <div className="poll_options">

      </div>
      <div className="poll_results"></div>
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
