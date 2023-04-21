import "./Poll.css";
import AddPoll from "./AddPoll/AddPoll";
import PollView from "./PollView";
import { Fab, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import apiInstance from "../../utilities/axiosConfig";
import useBoard from "../../hooks/useBoard";

const Poll = () => {
  const { boardId, poll, getBoard } = useBoard();
  const [open, setOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const openAddPoll = () => {
    setOpen(true);
  };
  const closeAddPoll = () => {
    setOpen(false);
  };

  const handlClick = (e) => {
    if (e.type === 'click') {
      console.log('Left click');
    } else if (e.type === 'contextmenu') {
      console.log('Right click');
    }
  }

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  useEffect(() => {
    const getPoll = async (id) => {
      await apiInstance.get(`board/poll/${id}/`).then((res) => {
        setPolls([...polls, res.data]);
        console.log("asdada", res);
      });
    };
    poll.forEach((x) => {
      getPoll(x);
    });
    return () => {
      setPolls([]);
    };
  }, [poll]);

  return (
    <div className="poll_container" onClick={handlClick}>
      <Modal
        open={open}
        onClose={closeAddPoll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPoll handleClose={closeAddPoll} />
      </Modal>
      <div className="poll_view">
        <div className="poll_open">
          {polls.map((x) => {
            if (x.is_open) {
              console.log(poll);
              return (
                <PollView
                  pollId={x.id}
                  Multi={x.is_multianswer}
                  Anonymous={x.is_known}
                  isOpen
                  question={x.question}
                />
              );
            }
            return null;
          })}
        </div>
        <div className="poll_closed">
          {polls.map((x) => {
            if (!x.is_open) {
              return (
                <PollView
                  pollId={x.id}
                  Multi={x.is_multianswer}
                  Anonymous={x.is_known}
                  isOpen={false}
                  question={x.question}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="poll_button">
        <Fab color="primary" aria-label="add" onClick={openAddPoll}>
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default Poll;
