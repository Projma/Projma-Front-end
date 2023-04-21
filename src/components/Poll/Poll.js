import "./Poll.css";
import AddPoll from "./AddPoll/AddPoll";
import PollView from "./PollView";
import {Button, Fab, Modal, Popover} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import apiInstance from "../../utilities/axiosConfig";
import useBoard from "../../hooks/useBoard";
import {DeleteOutline, RemoveCircleOutlineOutlined, ReplayOutlined} from "@mui/icons-material";

const Poll = () => {
  const {boardId, poll, getBoard} = useBoard();
  const [open, setOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openPopover = Boolean(anchorEl);
  const openAddPoll = () => {
    setOpen(true);
  };
  const closeAddPoll = () => {
    setOpen(false);
  };

  const handlClick = (e) => {
    e.preventDefault();
    if (e.type === 'contextmenu') {
      console.log('Right click');
      optionClickHandler(e);
    }
  }
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOption = () => {
    setAnchorEl(null);
  };
  const optionClickHandler = (event) => {
    console.log("fusda");
    setAnchorEl(event.currentTarget);
  };

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
    <div className="poll_container">
      <Modal
        open={open}
        onClose={closeAddPoll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPoll handleClose={closeAddPoll}/>
      </Modal>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Popover
          id={crypto.randomUUID()}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleOption}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          sx={{
            [".MuiPopover-paper"]: {
              backgroundColor: "#001e3c55",
            }
          }}
        >
          <div className="poll_option">
            <div className="poll_option-button-container">
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
                sx={{color: "#fff", width: "100%", height: "3rem"}}
              >
                <div className="poll_option-in-button">
                  <ReplayOutlined  sx={{fill:"#1976d2", fontSize: "1.5rem"}}/>
                  <div>برداشتن رای</div>
                </div>
              </Button>
              <Button
                onClick={() => {
                  setIsOpen(true);
                }}
                sx={{color: "#fff", width: "100%", height: "3rem"}}
              >
                <div className="poll_option-in-button">
                  <RemoveCircleOutlineOutlined sx={{fill:"#1976d2", fontSize: "1.5rem"}}/>
                  <div>اتمام رای گیری</div>
                </div>
              </Button>
              <Button
              onClick={() => {
                setIsOpen(true);
              }}
              sx={{color: "#fff", width: "100%", height: "3rem"}}
            >
              <div className="poll_option-in-button">
                <DeleteOutline  sx={{fill:"#1976d2", fontSize: "1.5rem"}}/>
                <div>پاک کردن رای گیری</div>
              </div>
            </Button>
            </div>
          </div>
        </Popover>
      </div>
      <div className="poll_view">
        <div className="poll_open">
          {polls.map((x) => {
            if (x.is_open) {
              console.log(poll);
              return (
                <div onContextMenu={handlClick}>
                  <PollView
                    pollId={x.id}
                    Multi={x.is_multianswer}
                    Anonymous={x.is_known}
                    isOpen
                    question={x.question}
                  />
                </div>
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
          <AddIcon/>
        </Fab>
      </div>
    </div>
  );
};

export default Poll;
