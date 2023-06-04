import "./Poll.scss";
import AddPoll from "./AddPoll/AddPoll";
import PollView from "./PollView";
import { Button, Fab, Modal, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import apiInstance from "../../utilities/axiosConfig";
import {
  DeleteOutline,
  RemoveCircleOutlineOutlined,
  ReplayOutlined,
  HowToVoteOutlined,
} from "@mui/icons-material";
import { useParams } from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import useTheme from "../../hooks/useTheme";

const Poll = () => {
  const { getBoard } = useBoard();
  const param = useParams();
  const [open, setOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const openPopover = Boolean(anchorEl);
  const [openPolls, setOpenPolls] = useState(undefined);
  const [closePolls, setClosePolls] = useState(undefined);
  const [contexmenu, setContexmenu] = useState({});
  const [reRender, setReRender] = useState(false);
  const {theme, getColor} = useTheme();
  const openAddPoll = () => {
    setOpen(true);
  };
  const closeAddPoll = () => {
    setOpen(false);
    setReRender(!reRender);
  };
  const handleReRender = () => {
    setReRender(!reRender);
  }
  const handlClick = (e, contexmenu) => {
    e.preventDefault();
    if (e.type === "contextmenu") {
      // console.log("Right click");
      setContexmenu(contexmenu);
      optionClickHandler(e);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOption = () => {
    setAnchorEl(null);
  };
  const optionClickHandler = (event) => {
    // console.log("fusda", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const getPoll = async (id) => {
      await apiInstance.get(`board/poll/${id}/`).then((res) => {
        setPolls((perv) => [...perv, res.data]);
        // console.log(res.data);
      });
    };
    const getPolls = async () => {
      await apiInstance
        .get(`board/${param.boardId}/get-board-overview/`)
        .then((response) => {
          response.data.polls.forEach((x) => {
            getPoll(x);
          });
          // console.log("logs", response.data.polls);
        });
    };
    getBoard();
    getPolls();
    return () => {
      setPolls([]);
    };
  }, [reRender]);
  // console.log('pooool', polls);
  return (
    <div className="poll_container">
      <Modal
        open={open}
        onClose={closeAddPoll}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPoll closeAddPoll={closeAddPoll} />
      </Modal>
      <div onContextMenu={(e) => e.preventDefault()}>
        <Popover
          id={crypto.randomUUID()}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleOption}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            [".MuiPopover-paper"]: {
              backgroundColor: "#00000077",
            },
          }}
        >
          <div className="poll_option">
            <div className="poll_option-button-container">
              {contexmenu.is_open && (
                <Button
                  onClick={async () => {
                    apiInstance.delete(
                      `board/poll/${contexmenu.id}/retract-all-votes/`
                    );
                    handleOption();
                    setReRender(!reRender);
                  }}
                  sx={{ color: getColor(theme.mainBg), width: "100%", height: "3rem" }}
                >
                  <div className="poll_option-in-button">
                    <ReplayOutlined
                      sx={{ fill: theme.primary, fontSize: "1.5rem" }}
                    />
                    <div style={{color: getColor(theme.minorBg)}}>برداشتن رای</div>
                  </div>
                </Button>
              )}
              {contexmenu.is_creator && (
                <>
                  {contexmenu.is_open && (
                    <Button
                      onClick={async () => {
                        apiInstance.patch(`board/poll/${contexmenu.id}/close/`);
                        handleOption();
                        setReRender(!reRender);
                      }}
                      sx={{ color: getColor(theme.mainBg), width: "100%", height: "3rem" }}
                    >
                      <div className="poll_option-in-button">
                        <RemoveCircleOutlineOutlined
                          sx={{ fill: theme.primary, fontSize: "1.5rem" }}
                        />
                        <div style={{color: getColor(theme.minorBg)}}>اتمام رای گیری</div>
                      </div>
                    </Button>
                  )}
                  <Button
                    onClick={async () => {
                      apiInstance.delete(`board/poll/${contexmenu.id}/`);
                      handleOption();
                      setReRender(!reRender);
                    }}
                    sx={{ color: getColor(theme.mainBg), width: "100%", height: "3rem" }}
                  >
                    <div className="poll_option-in-button">
                      <DeleteOutline
                        sx={{ fill: theme.primary, fontSize: "1.5rem", color: getColor(theme.mainBg) }}
                      />
                      <div style={{color: getColor(theme.minorBg)}}>پاک کردن رای گیری</div>
                    </div>
                  </Button>
                </>
              )}
            </div>
          </div>
        </Popover>
      </div>
      <div className="poll_view">
        <div className="poll_view-section-open">
          <div className="poll_view-label">
            <HowToVoteOutlined sx={{ fill: getColor(theme.mainBg), fontSize: "1.5rem" }} />
            <div style={{color: getColor(theme.minorBg)}}>رای گیری های در حال انجام</div>
          </div>
          <div className="poll_open">
            {polls.sort((a,b) => a.id - b.id).map((x) => {
              if (x.is_open) {
                return (
                  <div onContextMenu={(event) => handlClick(event, x)}>
                    <PollView
                      pollId={x.id}
                      Multi={x.is_multianswer}
                      Anonymous={!x.is_known}
                      isOpen
                      question={x.question}
                      handleReRender={handleReRender}
                      key={crypto.randomUUID()}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="poll_view-section-closed">
          <div className="poll_view-label">
            <RemoveCircleOutlineOutlined
              sx={{ fill: getColor(theme.mainBg), fontSize: "1.5rem" }}
            />
            <div style={{color: getColor(theme.minorBg)}}>رای گیری های بسته شده</div>
          </div>
          <div className="poll_closed">
            {polls.sort((a,b) => a.id - b.id).map((x) => {
              if (!x.is_open) {
                return (
                  <div onContextMenu={(event) => handlClick(event, x)}>
                    <PollView
                      pollId={x.id}
                      Multi={x.is_multianswer}
                      Anonymous={!x.is_known}
                      isOpen={false}
                      question={x.question}
                      handleReRender={handleReRender}
                      key={crypto.randomUUID()}
                    />
                  </div>
                );
              }
              return null;
            })}
          </div>
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
