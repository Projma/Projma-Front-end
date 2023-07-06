import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { baseUrl } from "../../utilities/constants";
import createCache from "@emotion/cache";
import Labels from "./Labels";
import Members from "./Members";
import DueTime from "./dueTime";
import Description from "./Description";
import Taskmodal_CheckList from "./Taskmodal-Checklist";
import Taskmodal_Attachment from "./Taskmodal-Attachment";
import TaskModal_Activity from "./Taskmodal-Activity";
import Attachments from "./Attachments";
import CheckList from "./Checklist";
import "../../styles/TaskModal.css";
import { useState, useCallback, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import PersonIcon from "@mui/icons-material/Person";
import InitialIcon from "./InitialIcon";
import { Link } from "react-router-dom";
import { convertNumberToPersian } from "../../utilities/helpers";
import Loading from "../Shared/Loading";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

function APIcall() {}

export default function TaskModal(props) {
  const params = { task_id: props.cardId, board_id: props.boardId };

  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const InitialIconcircle = ({ initials }) => {
    return (
      <Button
        component={Link}
        to={`/profileview/${initials.username}`}
        sx={{ borderRadius: "50%" }}
        style={{
          maxWidth: "30px",
          maxHeight: "30px",
          minWidth: "30px",
          minHeight: "30px",
          padding: "0px",
          marginLeft: "3px",
        }}
      >
        <div
          style={{
            backgroundColor: randColor(),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 30,
            width: 30,
            height: 30,
          }}
        >
          {initials.profile_pic != null ? (
            <img
              src={
                initials.profile_pic.toString().includes("http")
                  ? initials.profile_pic
                  : baseUrl + initials.profile_pic
              }
              alt={initials.first_name}
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Vazir",
                color: "white",
                fontSize: "12px",
              }}
            >
              {/* {initials.first_name[0] + "‌" + initials.last_name[0]} */}
            </div>
          )}
        </div>
      </Button>
    );
  };
  // const InitialIcon = ({ initials }) => {
  //   return (
  //     <div
  //       data-testid="initial-icon"
  //       className="flex-row"
  //       style={{
  //         backgroundColor: initials.color + "55",
  //         alignItems: "center",
  //         justifyContent: "start",
  //         width: 90,
  //         height: 30,
  //         borderRadius: 30,
  //       }}
  //     >
  //       <div
  //         style={{
  //           backgroundColor: initials.color,
  //           alignItems: "center",
  //           justifyContent: "center",
  //           borderRadius: 30,
  //           marginRight: "8%",
  //           width: 17,
  //           height: 17,
  //           marginLeft: 7,
  //         }}
  //       ></div>
  //       <div
  //         style={{
  //           display: "flex",
  //           color: "white",
  //           fontSize: 13,
  //           width: "50",
  //           height: "100%",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           overflowX: "auto",
  //           paddingTop: 2,
  //           paddingRight: -10,
  //         }}
  //       >
  //         {initials.title}
  //       </div>
  //     </div>
  //   );
  // };

  const [ListOfComments, setListOfComments] = useState([]);
  const [ListOfDoers, setListOfDoers] = useState([]);
  const [user, setUser] = useState({});
  const [allChecklists, setAllChecklists] = useState([]);
  const [ListOfLabels, setListOfLabels] = useState([]);
  const [ListOfMembers, setListOfMembers] = React.useState([]);
  const [estimate, setEstimate] = useState("");
  const [tasklistName, setTasklistName] = useState("");
  const [done, setDone] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isPost, setIsPost] = useState(false);
  const [allAttachments, setAllAttachments] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    apiInstance.get(`/board/${params.board_id}/members/`).then((res) => {
      const members = res.data.map((obj) => ({
        id: obj.user.id,
        firstName: obj.user.first_name,
        lastName: obj.user.last_name,
        userName: obj.user.username,
        email: obj.user.email,
        image: obj.profile_pic,
      }));
      setListOfMembers(members);
    });
    apiInstance
      .get(`/task/checklist/${params.task_id}/get-all-checklists/`)
      .then((res) => {
        setAllChecklists(res.data);
      });
    apiInstance.get(`/accounts/profile/myprofile/`).then((res) => {
      setUser(res.data);
    });
    apiInstance.get(`task/${params.task_id}/get-task/`).then((res) => {
      setDueDate(convertNumberToPersian(res.data.end_date));
      setEstimate(convertNumberToPersian(res.data.estimate));
      setTasklistName(res.data.tasklist_name);
      setDone(convertNumberToPersian(res.data.spend));
      setDescription(res.data.description);
      setTitle(res.data.title);
      const attachments = res.data.attachments.map((obj) => ({
        id: obj.id,
        file: obj.file,
        created_at: obj.created_at,
      }));
      setAllAttachments(attachments);
      const labels = res.data.labels.map((item) => ({
        id: item.id,
        title: item.title,
        color: item.color,
      }));
      setListOfLabels(labels);
      const doer = res.data.doers.map((item) => ({
        // id: item.id,
        email: item.email,
        username: item.username,
        first_name: item.first_name,
        last_name: item.last_name,
        profile_pic: item.profile_pic,
      }));
      setListOfDoers(doer);
      const comments = res.data.comments.map((obj) => ({
        text: obj.text,
        created: obj.created_at,
        sender: obj.sender,
        updated: obj.updated_at,
        task: obj.task,
        reply: obj.reply_to,
        id: obj.id,
      }));
      setListOfComments(comments);
    });
  }, []);

  return (
    <div>
      {isPost ? <Loading /> : null}
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <div
            className="taskmodal--page"
            style={{ width: "50vw", marginTop: 0 }}
          >
            <div className="taskmodal--container" style={{ width: "100%" }}>
              <div className="taskmodal--header flex-row flex-column-gap-2">
                <div className="flex-taskmodal" style={{ marginTop: "3px" }}>
                  <PersonIcon
                    fontSize="large"
                    sx={{ color: "white" }}
                  ></PersonIcon>
                </div>
                <div
                  className="flex-column"
                  style={{ gap: "9%", width: "100%" }}
                >
                  <div className="neonText taskmodal--title">{title}</div>
                  <div className="neonText taskmodal--subtitle">
                    در لیست {tasklistName}
                  </div>
                </div>
              </div>
              <div
                className="taskmodal--larger_smaller"
                style={{ height: "80%", marginRight: "2%" }}
              >
                <div className="taskmodal--body-larger">
                  <div className="flex-row taskmodal--body-options flex-gap">
                    <div className="taskmodal--body-members">
                      <div className="taskmodel--body-members-title">اعضا</div>
                      <div className="flex-gap Taskmodal--body-members-icons">
                        {ListOfDoers.map((doer) => (
                          <InitialIconcircle
                            initials={doer}
                          ></InitialIconcircle>
                        ))}
                      </div>
                    </div>
                    <div className="taskmodal--body-labels">
                      <div className="taskmodel--body-members-title">برچسب</div>
                      <div className="flex-gap Taskmodal--body-labels-icons">
                        {ListOfLabels.map((label) => (
                          <InitialIcon initials={label}></InitialIcon>
                        ))}
                      </div>
                    </div>
                    <div className="taskmodal--body-duetime">
                      <div
                        className="flex-taskmodal taskmodel--body-members-title"
                        style={{ marginBottom: "0px" }}
                      >
                        تاریخ اتمام
                      </div>
                      <div
                        className="flex-taskmodal"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div className="Taskmodal--body-dueDate">
                          {dueDate.toString() != "null" ? (
                            <div className="taskmodal--duetime-showDate">
                              {dueDate.toString().replaceAll("-", "/")}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Description
                    params={params}
                    description={description}
                    setDescription={setDescription}
                  />
                  <Taskmodal_CheckList
                    params={params}
                    allChecklists={allChecklists}
                    setAllChecklists={setAllChecklists}
                  />
                  <Taskmodal_Attachment
                    params={params}
                    allAttachments={allAttachments}
                    setAllAttachments={setAllAttachments}
                  />
                  <TaskModal_Activity
                    params={params}
                    user={user}
                    done={done}
                    setDone={setDone}
                    ListOfComments={ListOfComments}
                    setListOfComments={setListOfComments}
                    estimate={estimate}
                    setEstimate={setEstimate}
                  />
                </div>
                <div className="flex-column taskmodal--body-smaller">
                  <Members
                    params={params}
                    setDoers={setListOfDoers}
                    doer={ListOfDoers}
                  />
                  <Labels
                    params={params}
                    task_labels={ListOfLabels}
                    set_task_labels={setListOfLabels}
                  />
                  <CheckList
                    params={params}
                    setAllChecklists={setAllChecklists}
                  />
                  <Attachments
                    params={params}
                    setAllAttachments={setAllAttachments}
                  />
                  <DueTime
                    params={params}
                    dueDate={dueDate}
                    setDueTime={setDueDate}
                  />
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
