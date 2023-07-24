import "./Poll.scss";
import AddPoll from "./AddPoll/AddPoll";
import PollView from "./PollView";
import { Button, Fab, Popover } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState, useRef } from "react";
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
import Dialog from "../Asset/Dialog";
import Modal from "../Asset/Modal";
import { v4 as uuidv4 } from "uuid";

const Poll = () => {
  // const { getBoard } = useBoard();
  const param = useParams();
  const [open, setOpen] = useState(false);
  const [polls, setPolls] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openPolls, setOpenPolls] = useState(undefined);
  const [closePolls, setClosePolls] = useState(undefined);
  const [contexmenu, setContexmenu] = useState({});
  const [reRender, setReRender] = useState(false);
  const { theme, getColor } = useTheme();
  const [tab, setTab] = useState("open");
  const openAddPoll = () => {
    setOpen(true);
  };
  const closeAddPoll = () => {
    setOpen(false);
    setReRender(!reRender);
  };
  const handleReRender = () => {
    setReRender(!reRender);
  };
  const handlClick = (e, contexmenu) => {
    console.log(contexmenu);
    e.preventDefault();
    if (e.type === "contextmenu") {
      // console.log("Right click");
      setContexmenu(contexmenu);
      optionClickHandler(e);
      setOpenMenu(true);
    }
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const optionClickHandler = (event) => {
    // console.log("fusda", event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const isMounted = useRef(true);

  useEffect(() => {
    // Set the isMounted ref to true when the component mounts
    isMounted.current = true;

    const getPoll = async (id) => {
      await apiInstance.get(`board/poll/${id}/`).then((res) => {
        if (isMounted.current) { // Check if the component is still mounted
          setPolls((prev) => [...prev, res.data]);
          console.log(res.data);
        }
      });
    };

    const getBoard = async () => {
      await apiInstance.get(`board/${param.boardId}/get-board-overview/`)
        .then((response) => {
          if (isMounted.current) { // Check if the component is still mounted
            setPolls([]); // Clear the polls array before adding new poll data
            response.data.polls.forEach((x) => {
              getPoll(x);
            });
          }
        });
    };

    getBoard();

    // Set the isMounted ref to false when the component unmounts
    return () => {
      isMounted.current = false;
    };
  }, [reRender]);


  // console.log('pooool', polls);
  const handleOption = () => {
    setOpenMenu(false);
  };
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
      <div
        onContextMenu={(e) => e.preventDefault()}
        style={{ position: "relative" }}
      >
        <Modal open={openMenu} onClose={handleOption}>
          <div className="poll_option">
            <div className="poll_option-button-container">
              {contexmenu.is_open && (
                <div
                  className="poll_option-in-button"
                  onClick={async () => {
                    await apiInstance.delete(
                      `board/poll/${contexmenu.id}/retract-all-votes/`
                    );
                    handleOption();
                    setReRender(!reRender);
                  }}
                >
                  <ReplayOutlined
                    sx={{ fill: theme.primary, fontSize: "1.5rem" }}
                  />
                  <div style={{ color: getColor(theme.minorBg) }}>
                    برداشتن رای
                  </div>
                </div>
              )}
              {contexmenu.is_creator && (
                <>
                  {contexmenu.is_open && (
                    <div
                      className="poll_option-in-button"
                      onClick={async () => {
                        apiInstance.patch(`board/poll/${contexmenu.id}/close/`);
                        handleOption();
                        setReRender(!reRender);
                      }}
                    >
                      <RemoveCircleOutlineOutlined
                        sx={{ fill: theme.primary, fontSize: "1.5rem" }}
                      />
                      <div style={{ color: getColor(theme.minorBg) }}>
                        اتمام رای گیری
                      </div>
                    </div>
                  )}

                  <div
                    className="poll_option-in-button"
                    onClick={async () => {
                      apiInstance.delete(`board/poll/${contexmenu.id}/`);
                      handleOption();
                      setReRender(!reRender);
                    }}
                  >
                    <DeleteOutline
                      sx={{
                        fill: theme.primary,
                        fontSize: "1.5rem",
                        color: getColor(theme.mainBg),
                      }}
                    />
                    <div style={{ color: getColor(theme.minorBg) }}>
                      پاک کردن رای گیری
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal>
      </div>
      <div className="poll_view">
        <div className="poll_view-header">
          <Button
            onClick={() => setTab("open")}
            variant={tab === "open" ? "contained" : "text"}
          >
            <div className="poll_view-label">
              <HowToVoteOutlined sx={{ fontSize: "1.5rem" }} />
              <div>رای گیری های در حال انجام</div>
            </div>
          </Button>
          <Button
            onClick={() => setTab("closed")}
            variant={tab === "closed" ? "contained" : "text"}
          >
            <div className="poll_view-label">
              <RemoveCircleOutlineOutlined sx={{ fontSize: "1.5rem" }} />
              <div>رای گیری های بسته شده</div>
            </div>
          </Button>
        </div>
        {tab === "open" ? (
          <div className="poll_view-section-open">
            <div className="poll_open">
              {polls
                .sort((a, b) => a.id - b.id)
                .map((x) => {
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
                          key={x.id}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        ) : (
          <div className="poll_view-section-closed">
            <div className="poll_closed">
              {polls
                .sort((a, b) => a.id - b.id)
                .map((x) => {
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
                          key={x.id}
                        />
                      </div>
                    );
                  }
                  return null;
                })}
            </div>
          </div>
        )}
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
