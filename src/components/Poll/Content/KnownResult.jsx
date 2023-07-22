import { Button, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./KnownResult.scss";
import { useParams } from "react-router-dom";
import apiInstance from "../../../utilities/axiosConfig";
import { HowToVoteOutlined } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import useTheme from "../../../hooks/useTheme";
import { baseUrl } from "../../../utilities/constants";

const KnownResult = ({ voters, options, question, totalVotes }) => {
  const [open, setOpen] = useState(false);
  const [voter, setVoter] = useState(new Array(voters.length));
  const param = useParams();
  const { theme, getColor } = useTheme();

  const closeResultModal = () => {
    setOpen(false);
  };
  const getPercent = (vote, total) => {
    return Math.trunc((vote / total) * 100);
  };
  useEffect(() => {
    const getMember = async () => {
      await apiInstance.get(`board/${param.boardId}/members/`).then((res) => {
        setVoter(
          voters.map((x) => {
            let fn, ln, pp, id;
            res.data.forEach((y) => {
              if (x.user__pk === y.user.id) {
                fn = y.user.first_name;
                ln = y.user.last_name;
                pp = y.profile_pic;
                id = y.user.id;
                // console.log("voter", fn, ln, pp, id);
              }
            });
            return {
              first_name: fn,
              last_name: ln,
              profile_pic: pp,
              userId: id,
            };
          })
        );
        // console.log("options", options);
      });
    };
    getMember();
  }, [voters]);
  // console.log("voter",voter);
  return (
    <div className="known-result_container">
      <Modal open={open} onClose={closeResultModal}>
        <div className="known-result_modal-container">
          <div
            className="known-result_modal-question"
            style={{ color: getColor(theme.minorBg) }}
          >
            {question}
          </div>
          {options.map((x) => (
            <>
              {x.count > 0 && (
                <div className="known-result_modal-options">
                  <div className="known-result_modal-options-header">
                    <div style={{ color: getColor(theme.minorBg) }}>
                      {x.text} - {getPercent(x.count, totalVotes)}%
                    </div>
                    <div style={{ color: getColor(theme.minorBg) }}>
                      {x.count}{" "}
                      <HowToVoteOutlined
                        sx={{
                          fill: getColor(theme.minorBg),
                          fontSize: "1.5rem",
                        }}
                      />
                    </div>
                  </div>
                  <div className="known-result_modal-options-boady">
                    {x.voters.map((y) => {
                      let user;
                      voter.forEach((k) => {
                        if (k.userId === y.user__pk) user = k;
                      });
                      return (
                        <div className="known-result_modal-options-voter">
                          {user !== undefined && (
                            <>
                              <Avatar
                                key={crypto.randomUUID()}
                                alt={user.first_name + " " + user.last_name}
                                src={
                                  user.profile_pic !== null
                                    ? baseUrl.slice(0, -1) + user.profile_pic
                                    : "none"
                                }
                                sx={{
                                  color: getColor(theme.secondary),
                                  backgroundColor: theme.secondary,
                                }}
                              >
                                {(
                                  user.first_name[0] + user.last_name[0]
                                )?.toUpperCase()}
                              </Avatar>
                              <div
                                className="known-result_modal-options-voter-name"
                                style={{ color: getColor(theme.minorBg) }}
                              >
                                {user.first_name + " " + user.last_name}
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </Modal>
      <Button
        variant="text"
        style={{
          height: "2.5rem",
          width: "100%",
          color: getColor(theme.minorBg),
        }}
        onClick={() => setOpen(true)}
      >
        نمایش نتیجه
      </Button>
    </div>
  );
};

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]?.toUpperCase()}${name
      .split(" ")[1][0]
      ?.toUpperCase()}`,
  };
}

export default KnownResult;
