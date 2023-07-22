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
import "../../styles/TaskModal.scss";
import { useState, useCallback, useEffect } from "react";
import { CacheProvider } from "@emotion/react";
import { Button } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import { Link } from "react-router-dom";
import { convertNumberToPersian } from "../../utilities/helpers";
import Loading from "../Shared/Loading";
import CardLabel from "../Board/List/Card/Content/Body/Content/CardLabel";
import useTheme from "../../hooks/useTheme";

function APIcall() {}

export default function TaskModal(props) {
  const params = { task_id: props.cardId, board_id: props.boardId };

  const randColor = () => {
    return (
      "#" +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, "0")
        ?.toUpperCase()
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
              {initials.first_name[0] + "‌" + initials.last_name[0]}
            </div>
          )}
        </div>
      </Button>
    );
  };

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
  const {theme,getColor} = useTheme();

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
    <div className="taskmodal">
      {isPost ? <Loading /> : null}
      <div className="taskmodal__header">
        <div className="taskmodal__header--title">
          <div className="taskmodal__header--card">{title}</div>
          <div className="taskmodal__header--list">در لیست {tasklistName}</div>
        </div>
      </div>
      <div className="taskmodal__container">
        <div className="taskmodal__container--main">
          <div className="taskmodal__container--header">
            <div className="taskmodal__container--header-container">
              <div className="taskmodal__container--header-container-title">
                اعضا
              </div>
              <div className="taskmodal__container--header-container-content">
                {ListOfDoers.map((doer) => (
                  <InitialIconcircle initials={doer}></InitialIconcircle>
                ))}
              </div>
            </div>
            <div className="taskmodal__container--header-container">
              <div className="taskmodal__container--header-container-title">
                برچسب
              </div>
              <div className="taskmodal__container--header-container-content">
                <CardLabel label={ListOfLabels} />
              </div>
            </div>
            <div className="taskmodal__container--header-container">
              <div className="taskmodal__container--header-container-title">
                تاریخ اتمام
              </div>
              <div className="taskmodal__container--header-container-content">
                {dueDate.toString() != "null" ? (
                  <div className="taskmodal--duetime-showDate">
                    {dueDate.toString().replaceAll("-", "/")}
                  </div>
                ) : (
                  <div>مشخص نشده است</div>
                )}
              </div>
            </div>
          </div>
          <div className="taskmodal__container--content" style={{color: getColor(theme.minorBg)}}>
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
        </div>
        <div className="taskmodal__container--sub">
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
          <CheckList params={params} setAllChecklists={setAllChecklists} />
          <Attachments params={params} setAllAttachments={setAllAttachments} />
          <DueTime params={params} dueDate={dueDate} setDueTime={setDueDate} />
        </div>
      </div>
    </div>
  );
}
