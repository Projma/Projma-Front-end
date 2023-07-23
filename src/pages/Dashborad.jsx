import React, { Fragment, useState, useEffect } from "react";
import "../styles/Dashboard.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import { Divider } from "@mui/material";
import Header from "../components/Header/Header";
import BasicModal from "../components/Dashboard/Modal/BasicModal";
import DashboardTwoToneIcon from "@mui/icons-material/DashboardTwoTone";
import ContentPasteTwoToneIcon from "@mui/icons-material/ContentPasteTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import AvTimerTwoToneIcon from "@mui/icons-material/AvTimerTwoTone";
import WorkspacesTwoToneIcon from "@mui/icons-material/WorkspacesTwoTone";
// import HomeRepairServiceTwoToneIcon from "@mui/icons-material/HomeRepairServiceTwoTone";
import Diversity2TwoToneIcon from "@mui/icons-material/Diversity2TwoTone";
import ViewDayTwoToneIcon from "@mui/icons-material/ViewDayTwoTone";
// import MessageTwoToneIcon from "@mui/icons-material/MessageTwoTone";
import StarPurple500TwoToneIcon from "@mui/icons-material/StarPurple500TwoTone";
import DeveloperBoardTwoToneIcon from "@mui/icons-material/DeveloperBoardTwoTone";

import useMediaQuery from "@mui/material/useMediaQuery";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import FolderIcon from "@mui/icons-material/Folder";
// import RestoreIcon from "@mui/icons-material/Restore";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
import Paper from "@mui/material/Paper";
import apiInstance from "../utilities/axiosConfig";

import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import CreateBoardModal from "../components/Dashboard/CreateBoardModal/CreateBoardModal";
import { toast } from "react-toastify";
import CreateBoard from "../components/Dashboard/CreateBoard/CreateBoard";
import CreateTemplateModal from "../components/Dashboard/CreateTemplateModal/CreateTemplateModal";
import useTheme from "../hooks/useTheme";

// useMediaQuery
// rafce

export const Dashborad = () => {
  let [workspaces, setWorkspaces] = useState([]);
  let [owningWorkspaces, setOwningWorkspaces] = useState([]);
  let [boards, setBoards] = useState([]);
  let [recentBoards, setRecentBoards] = useState([]);
  let [starredBoards, setStarredBoards] = useState([]);
  let [flag, setFlag] = useState(false);
  const [templates, setTemplates] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    apiInstance
      .get("/workspaces/dashboard/myworkspaces/")
      .then((response) => {
        // array of
        // {
        //     "id": 2,
        //     "name": "تست 1",
        //     "description": "تست",
        //     "type": "education",
        //     "created_at": "2022-12-01T09:07:35.527499Z",
        //     "updated_at": "2022-12-01",
        //     "owner": 11,
        //     "members": [
        //         5,
        //         10,
        //         11
        //     ],
        //     "boards": [
        //         9,
        //         10,
        //         11
        //     ]
        // }

        setWorkspaces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    apiInstance
      .get("/workspaces/dashboard/myowning-workspaces/")
      .then((response) => {
        setOwningWorkspaces(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    apiInstance
      .get("/workspaces/dashboard/myboards/")
      .then((response) => {
        ////console.log(response.data);

        // array of
        // {
        //     "id": 5,
        //     "name": "فرزان رحمانی",
        //     "description": "تست",
        //     "background_pic": null,
        //     "workspace": 4,
        //     "admins": [
        //         11
        //     ],
        //     "created_at": "2022-12-01T09:10:30.165930Z",
        //     "updated_at": "2022-12-01",
        //     "members": [
        //         5,
        //         11
        //     ],
        //     "tasklists": [
        //         2
        //     ],
        //     "labels": []
        // }
        setBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    apiInstance
      .get("/workspaces/dashboard/myrecent-boards/")
      .then((response) => {
        setRecentBoards(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const getStarredBoard = async () => {
      let allWs;
      await apiInstance
        .get("workspaces/dashboard/myworkspaces/")
        .then((res) => {
          allWs = res.data.map((w) => {
            return {
              boards: w["boards"],
              id: w["id"],
            };
          });
        });
      function findWsId(boardId) {
        const object = allWs.find((obj) => obj.boards.includes(boardId));
        return object ? object.id : null;
      }
      await apiInstance
        .get("workspaces/dashboard/mystarred-boards/")
        .then((res) => {
          const star = res.data.map((s) => {
            return {
              name: s["name"],
              description: s["description"],
              id: s["id"],
              pic: s["background_pic"]===null ? null : baseUrl.slice(0, -1) + s["background_pic"],
              wsId: findWsId(s["id"]),
            };
          });
          setStarredBoards(star);
        });
    };

    getStarredBoard();
  }, [flag]);

  const [boardsInfo, setBoardsInfo] = useState([]);
  useEffect(() => {
    let res = {};
    for (let i = 0; i < boards.length; i++) {
      res[boards[i].id] = boards[i];
    }
    setBoardsInfo(res);
  }, [boards]);

  const navigate = useNavigate();

  const navigateToWorkspace = (workspaceId) => {
    // navigate(`/workspace/${workspaceId}/dashboard/Boards`);
    navigate(`/workspace/${workspaceId}/dashboard/board`);
  };

  const navigateToBoard = (boardId) => {
    navigate(`/kanban/${boardId}/board`);
  };
  const navigateToBoard2 = (boardId, workspaceId) => {
    navigate(`/workspace/${workspaceId}/kanban/${boardId}/board`);
  };

  useEffect(() => {
    apiInstance
      .get("/template/")
      .then((response) => {
        ////console.log(response.data);
        // [
        //   {
        //     "id": 21,
        //     "name": "Agile WsBoard",
        //     "description": "Agile WsBoard Template",
        //     "background_pic": null,
        //     "created_at": "2023-01-21T11:15:24.581576Z",
        //     "updated_at": "2023-01-21",
        //     "tasklists": [
        //       {
        //         "id": 9,
        //         "title": "Done",
        //         "board": 21,
        //         "order": 9,
        //         "tasks": []
        //       }
        //     ],
        //     "labels": [
        //       {
        //         "id": 9,
        //         "title": "Demand Marketing",
        //         "color": "#E221FF96",
        //         "board": 21
        //       },
        //       {
        //         "id": 10,
        //         "title": "Planning",
        //         "color": "#5EFF96",
        //         "board": 21
        //       }
        //     ]
        //   },
        //   {
        //     "id": 22,
        //     "name": "Kanban",
        //     "description": "Kanban Template",
        //     "background_pic": null,
        //     "created_at": "2023-01-21T11:15:37.576353Z",
        //     "updated_at": "2023-01-21",
        //     "tasklists": [
        //       {
        //         "id": 15,
        //         "title": "Backlog",
        //         "board": 22,
        //         "order": 15,
        //         "tasks": []
        //       }
        //     ],
        //     "labels": [
        //       {
        //         "id": 14,
        //         "title": "In Queue",
        //         "color": "#FF7896",
        //         "board": 22
        //       }
        //     ]
        //   },
        //   {
        //     "id": 23,
        //     "name": "Project Management",
        //     "description": "Project Management Template",
        //     "background_pic": null,
        //     "created_at": "2023-01-21T11:15:46.661086Z",
        //     "updated_at": "2023-01-21",
        //     "tasklists": [
        //       {
        //         "id": 22,
        //         "title": "Project Resources",
        //         "board": 23,
        //         "order": 22,
        //         "tasks": []
        //       }
        //     ],
        //     "labels": [
        //       {
        //         "id": 17,
        //         "title": "Copy Request",
        //         "color": "#D6FF36",
        //         "board": 23
        //       }
        //     ]
        //   },
        //   {
        //     "id": 24,
        //     "name": "Simple Template",
        //     "description": "Simple WsBoard Template",
        //     "background_pic": null,
        //     "created_at": "2023-01-21T11:15:54.468111Z",
        //     "updated_at": "2023-01-21",
        //     "tasklists": [
        //       {
        //         "id": 29,
        //         "title": "Brainstorm",
        //         "board": 24,
        //         "order": 29,
        //         "tasks": []
        //       },
        //       {
        //         "id": 30,
        //         "title": "To Do",
        //         "board": 24,
        //         "order": 30,
        //         "tasks": []
        //       }
        //     ],
        //     "labels": []
        //   }
        // ]
        setTemplates(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const computer_tabs = {
    boards: {
      title: "بورد ها",
      icon: <DashboardTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        <>
          <p variant="h1" component="h2" className="text paragraph">
            <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> بورد های ستاره‌دار
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              marginBottom: "7%",
            }}
          >
            {starredBoards.map((starBoard) => {
              return (
                <Grid item xs={2} sm={2} md={2} key={starBoard.id} sx={{}}>
                  <Paper
                    sx={{
                      padding: "3%",
                      textAlign: "center",
                      // color: theme.primary,
                      backgroundColor: theme.primary, // 5090D3
                      borderRadius: "10px",
                      // width: "100%",
                      // height: "100%",
                      // minWidth: "200px",
                      // maxWidth: "300px",
                      minHeight: "150px",
                      // maxHeight: "300px",
                      margin: "10%",
                      // padding: "10px",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // flexDirection: "column",
                      ":hover": {
                        backgroundColor: theme.hover,
                        cursor: "pointer",
                      },
                    }}
                    // hover
                    onClick={() => {
                      // navigateToBoard(board["id"]);
                      navigateToBoard2(starBoard.id, starBoard.wsId);
                    }}
                  >
                    <p variant="h1" component="h2" className="text paragraph">
                      {/* check that is null or not */}
                      {starBoard.name ? starBoard.name : "بی‌نام"}
                    </p>
                    <p variant="h1" component="h2" className="text paragraph">
                      {starBoard.description
                        ? starBoard.description
                        : "بدون توضیحات"}
                    </p>
                    {/* </> */}
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          {/* <p variant="h1" component="h2" className="text paragraph">
            <AvTimerTwoToneIcon sx={{ ml: 1.5 }} /> اخیرا دیده شده
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              // paddingTop: "5%",
              // marginTop: "10%",
              marginBottom: "7%",
              // backgroundColor: "#f5f5f5",
            }}
          >
            {recentBoards.map((board) => {
              return (
                <Grid item xs={2} sm={2} md={2} key={board["id"]} sx={{}}>
                  <Paper
                    sx={{
                      padding: "3%",
                      textAlign: "center",
                      // color: theme.primary,
                      backgroundColor: theme.primary, // 5090D3
                      borderRadius: "10px",
                      // width: "100%",
                      // height: "100%",
                      // minWidth: "200px",
                      // maxWidth: "300px",
                      minHeight: "150px",
                      // maxHeight: "300px",
                      margin: "10%",
                      // padding: "10px",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // flexDirection: "column",
                      ":hover": {
                        backgroundColor: theme.hover,
                        cursor: "pointer",
                      },
                    }}
                    // hover
                    onClick={() => {
                      navigateToBoard(board["id"]);
                    }}
                  >
                    <p
                      variant="h1"
                      component="h2"
                      className="text paragraph"
                    >
                      {board["name"]
                        ? board["name"]
                        : "بی‌نام"}
                    </p>
                    <p
                      variant="h1"
                      component="h2"
                      className="text paragraph"
                    >
                      {board["description"]
                        ? board["description"]
                        : "بدون توضیحات"}
                    </p>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} /> */}
          <p variant="h1" component="h2" className="text paragraph">
            <Diversity2TwoToneIcon
              sx={{
                // paddingLeft: "1%",
                // minWidth: "35px",
                ml: 1.5,
              }}
            />{" "}
            فضا های کاری شما
          </p>
          {workspaces.map((workspace) => {
            return (
              <>
                <div>
                  <p variant="h1" component="h2" className="text paragraph">
                    {workspace.name}
                  </p>
                </div>
                <Grid
                  container
                  columns={{ xs: 2, sm: 4, md: 8 }}
                  // spacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    // paddingTop: "5%",
                    // marginTop: "10%",
                    marginBottom: "7%",
                    // backgroundColor: "#f5f5f5",
                  }}
                >
                  {workspace.boards.map((board_id) => {
                    return (
                      <Grid item xs={2} sm={2} md={2} key={board_id} sx={{}}>
                        <Paper
                          sx={{
                            padding: "3%",
                            textAlign: "center",
                            // color: theme.primary,
                            backgroundColor: theme.primary, // 5090D3
                            borderRadius: "10px",
                            // width: "100%",
                            // height: "100%",
                            // minWidth: "200px",
                            // maxWidth: "300px",
                            minHeight: "150px",
                            // maxHeight: "300px",
                            margin: "10%",
                            // padding: "10px",
                            // display: "flex",
                            // justifyContent: "center",
                            // alignItems: "center",
                            // flexDirection: "column",
                            ":hover": {
                              backgroundColor: theme.hover,
                              cursor: "pointer",
                            },
                          }}
                          // hover
                          onClick={() => {
                            // navigateToBoard(board_id);
                            navigateToBoard2(board_id, workspace.id);
                          }}
                        >
                          <p
                            variant="h1"
                            component="h2"
                            className="text paragraph"
                          >
                            {/* check that is null or not */}
                            {boardsInfo[board_id]
                              ? boardsInfo[board_id].name
                              : "بی‌نام"}
                          </p>
                          <p
                            variant="h1"
                            component="h2"
                            className="text paragraph"
                          >
                            {boardsInfo[board_id]
                              ? boardsInfo[board_id].description
                              : "بدون توضیحات"}
                          </p>
                          {/* </> */}
                        </Paper>
                      </Grid>
                    );
                  })}
                  <Grid item xs={2} sm={2} md={2} sx={{}}>
                    <Paper
                      sx={{
                        // padding: "10%",
                        textAlign: "center",
                        // color: theme.primary,
                        backgroundColor: theme.primary, // 5090D3
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                        // minWidth: "200px",
                        // maxWidth: "300px",
                        minHeight: "150px",
                        // maxHeight: "300px",
                        margin: "10%",
                        // padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // flexDirection: "column",
                        ":hover": {
                          backgroundColor: theme.hover,
                          cursor: "pointer",
                        },
                      }}
                      // hover
                      // onClick={() => {
                      //     navigateToBoard(board_id);
                      //     open create modal board
                      // }}
                    >
                      {/* <p variant="h1" component="h2" className="add--text"> */}
                      {/* ساخت بورد جدید */}
                      <CreateBoardModal
                        workspace_id={workspace.id}
                        flag={flag}
                        setFlag={setFlag}
                        // sx={{
                        //   onclick: () => {
                        //     setFlag(!flag);
                        //     // flag++;
                        //   },
                        // }}
                      />
                      {/* </p> */}
                    </Paper>
                  </Grid>
                </Grid>
              </>
            );
          })}
          {/* Grid */}
          {/* <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <HomeRepairServiceTwoToneIcon sx={{ ml: 1.5 }} /> فضا های مهمان
          </p> */}
        </>
      ),
    },
    templates: {
      title: "تمپلیت ها",
      icon: <ContentPasteTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        <>
          <p variant="h1" component="h2" className="text paragraph">
            <ViewDayTwoToneIcon
              sx={{
                // paddingLeft: "1%",
                // minWidth: "35px",
                ml: 1.5,
              }}
            />{" "}
            تمپلیت های گوناگون
          </p>
          {templates.map((template) => {
            return (
              <>
                <div>
                  <p variant="h1" component="h2" className="text paragraph">
                    {template.name}
                  </p>
                </div>
                <Grid
                  container
                  columns={{ xs: 2, sm: 4, md: 8 }}
                  // spacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    // paddingTop: "5%",
                    // marginTop: "10%",
                    marginBottom: "7%",
                    // backgroundColor: "#f5f5f5",
                  }}
                >
                  <Grid item xs={2} sm={2} md={2} key={template.id} sx={{}}>
                    <Paper
                      sx={{
                        padding: "3%",
                        // textAlign: "center",
                        // color: theme.primary,
                        // backgroundColor: theme.primary, // 5090D3
                        backgroundColor: "#0A1929", // 5090D3 , 007fff, 132F4C, 173A5E
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                        // minWidth: "200px",
                        // maxWidth: "300px",
                        minHeight: "150px",
                        // maxHeight: "300px",
                        margin: "10%",
                        // padding: "10px",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // flexDirection: "column",
                        ":hover": {
                          backgroundColor: "#173A5E", // 5090D3
                          // cursor: "pointer",
                        },
                      }}
                      // hover
                      // onClick={() => {
                      //   // openCreateTemplateModal(template.id, template.name, template.description, template.background_pic);
                      // }}
                    >
                      <p variant="h1" component="h2" className="text paragraph">
                        نام تمپلیت:
                        <br />
                        {template.name ? template.name : "بی‌نام"}
                      </p>
                      <p variant="h1" component="h2" className="text paragraph">
                        توضیحات:
                        <br />
                        {template ? template.description : "بدون توضیحات"}
                      </p>
                      {/* <CreateTemplateModal
                          template_id={template.id}
                          template_name={template.name}
                          template_description={template.description}
                          template_background_pic={template.background_pic}
                        /> */}
                    </Paper>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    key={template.id * template.id + 2}
                    sx={{}}
                  >
                    <Paper
                      sx={{
                        padding: "3%",
                        textAlign: "center",
                        // color: theme.primary,
                        backgroundColor: theme.primary, // 5090D3
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                        // minWidth: "200px",
                        // maxWidth: "300px",
                        minHeight: "150px",
                        // maxHeight: "300px",
                        margin: "10%",
                        // padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        ":hover": {
                          backgroundColor: theme.hover,
                          cursor: "pointer",
                        },
                      }}
                      // hover
                      // onClick={() => {
                      //   // openCreateTemplateModal(template.id, template.name, template.description, template.background_pic);
                      // }}
                    >
                      {/* <p
                        variant="h1"
                        component="h2"
                        className="text paragraph"
                      >
                        {template.name
                          ? template.name
                          : "بی‌نام"}
                      </p>
                      <p
                        variant="h1"
                        component="h2"
                        className="text paragraph"
                      >
                        {template
                          ? template.description
                          : "بدون توضیحات"}
                      </p> */}
                      <CreateTemplateModal
                        template_id={template.id}
                        template_name={template.name}
                        template_description={template.description}
                        template_background_pic={template.background_pic}
                      />
                    </Paper>
                  </Grid>
                </Grid>
                <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
              </>
            );
          })}
        </>
      ),
    },
    home: {
      title: "خانه",
      icon: <HomeTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        // <a className="option" href="#"><HomeTwoToneIcon /> </a>
        <>
          {/* <p variant="h1" component="h2" className="text paragraph">
            <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> برجسته ها
          </p>
          <Grid></Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} /> */}
          <p variant="h1" component="h2" className="text paragraph">
            <AvTimerTwoToneIcon sx={{ ml: 1.5 }} /> اخیرا دیده شده
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              // paddingTop: "5%",
              // marginTop: "10%",
              marginBottom: "7%",
              // backgroundColor: "#f5f5f5",
            }}
          >
            {recentBoards.map((board) => {
              return (
                <Grid item xs={2} sm={2} md={2} key={board["id"]} sx={{}}>
                  <Paper
                    sx={{
                      padding: "3%",
                      textAlign: "center",
                      // color: theme.primary,
                      backgroundColor: theme.primary, // 5090D3
                      borderRadius: "10px",
                      // width: "100%",
                      // height: "100%",
                      // minWidth: "200px",
                      // maxWidth: "300px",
                      minHeight: "150px",
                      // maxHeight: "300px",
                      margin: "10%",
                      // padding: "10px",
                      // display: "flex",
                      // justifyContent: "center",
                      // alignItems: "center",
                      // flexDirection: "column",
                      ":hover": {
                        backgroundColor: theme.hover,
                        cursor: "pointer",
                      },
                    }}
                    // hover
                    onClick={() => {
                      navigateToBoard(board["id"]);
                    }}
                  >
                    <p variant="h1" component="h2" className="text paragraph">
                      {board["name"] ? board["name"] : "بی‌نام"}
                    </p>
                    <p variant="h1" component="h2" className="text paragraph">
                      {board["description"]
                        ? board["description"]
                        : "بدون توضیحات"}
                    </p>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <DeveloperBoardTwoToneIcon sx={{ ml: 1.5 }} /> ساخت بورد جدید
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              // paddingTop: "5%",
              // marginTop: "10%",
              marginBottom: "7%",
              // backgroundColor: "#f5f5f5",
            }}
          >
            <Grid item xs={2} sm={2} md={2} sx={{}}>
              <Paper
                sx={{
                  // padding: "10%",
                  textAlign: "center",
                  // color: theme.primary,
                  backgroundColor: theme.primary, // 5090D3
                  borderRadius: "10px",
                  // width: "100%",
                  // height: "100%",
                  // minWidth: "200px",
                  // maxWidth: "300px",
                  minHeight: "150px",
                  // maxHeight: "300px",
                  margin: "10%",
                  // padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // flexDirection: "column",
                  ":hover": {
                    backgroundColor: theme.hover,
                    cursor: "pointer",
                  },
                }}
              >
                {/* <p variant="h1" component="h2" className="add--text"> */}
                {/* ساخت بورد جدید */}
                <CreateBoard flag={flag} setFlag={setFlag} />
                {/* </p> */}
              </Paper>
            </Grid>
          </Grid>
          {/* <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <MessageTwoToneIcon sx={{ ml: 1.5 }} /> پیام ها
          </p> */}
        </>
      ),
    },
  };

  const mobile_tabs = {
    boards: {
      title: "بورد ها",
      icon: <DashboardTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        <>
          <p variant="h1" component="h2" className="text paragraph">
            <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> بورد های ستاره‌دار
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              // paddingTop: "5%",
              // marginTop: "10%",
              marginBottom: "10%",
              // backgroundColor: "#f5f5f5",
            }}
          >
            {starredBoards.map((starBoard) => {
              return (
                <Grid item xs={2} sm={2} md={2} key={starBoard.id} sx={{}}>
                  <div>
                    {/* // style={{}}> */}
                    <Paper
                      sx={{
                        padding: "2%",
                        textAlign: "center",
                        // color: theme.primary,
                        backgroundColor: theme.primary, // 5090D3
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                        // minWidth: "200px",
                        // maxWidth: "300px",
                        minHeight: "150px",
                        // maxHeight: "300px",
                        margin: "10%",
                        // padding: "100px",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // flexDirection: "column",
                        ":hover": {
                          backgroundColor: theme.hover,
                          cursor: "pointer",
                        },
                      }}
                      // hover
                      onClick={() => {
                        navigateToBoard2(starBoard.id, starBoard.wsId);
                      }}
                    >
                      <p variant="h1" component="h2" className="text paragraph">
                        {/* check that is null or not */}
                        {starBoard.name ? starBoard.name : "بی‌نام"}
                      </p>
                      <p variant="h1" component="h2" className="text paragraph">
                        {starBoard.description
                          ? starBoard.description
                          : "بدون توضیحات"}
                      </p>
                    </Paper>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <Diversity2TwoToneIcon
              sx={{
                // paddingLeft: "1%",
                // minWidth: "35px",
                ml: 1.5,
              }}
            />{" "}
            فضا های کاری شما
          </p>
          {workspaces.map((workspace) => {
            return (
              <>
                <div>
                  <p variant="h1" component="h2" className="text paragraph">
                    {workspace.name}
                  </p>
                </div>
                <Grid
                  container
                  columns={{ xs: 2, sm: 4, md: 8 }}
                  // spacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    // paddingTop: "5%",
                    // marginTop: "10%",
                    marginBottom: "10%",
                    // backgroundColor: "#f5f5f5",
                  }}
                >
                  {workspace.boards.map((board_id) => {
                    return (
                      <Grid item xs={2} sm={2} md={2} key={board_id} sx={{}}>
                        <div>
                          {/* // style={{}}> */}
                          <Paper
                            sx={{
                              padding: "2%",
                              textAlign: "center",
                              // color: theme.primary,
                              backgroundColor: theme.primary, // 5090D3
                              borderRadius: "10px",
                              // width: "100%",
                              // height: "100%",
                              // minWidth: "200px",
                              // maxWidth: "300px",
                              minHeight: "150px",
                              // maxHeight: "300px",
                              margin: "10%",
                              // padding: "100px",
                              // display: "flex",
                              // justifyContent: "center",
                              // alignItems: "center",
                              // flexDirection: "column",
                              ":hover": {
                                backgroundColor: theme.hover,
                                cursor: "pointer",
                              },
                            }}
                            // hover
                            onClick={() => {
                              // navigateToBoard(board_id);
                              navigateToBoard2(board_id, workspace.id);
                            }}
                          >
                            <p
                              variant="h1"
                              component="h2"
                              className="text paragraph"
                            >
                              {/* check that is null or not */}
                              {boardsInfo[board_id]
                                ? boardsInfo[board_id].name
                                : "بی‌نام"}
                            </p>
                            <p
                              variant="h1"
                              component="h2"
                              className="text paragraph"
                            >
                              {boardsInfo[board_id]
                                ? boardsInfo[board_id].description
                                : "بدون توضیحات"}
                            </p>
                          </Paper>
                        </div>
                      </Grid>
                    );
                  })}
                  <Grid item xs={2} sm={2} md={2} sx={{}}>
                    <Paper
                      sx={{
                        // padding: "10%",
                        textAlign: "center",
                        // color: theme.primary,
                        backgroundColor: theme.primary, // 5090D3
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                        // minWidth: "200px",
                        // maxWidth: "300px",
                        minHeight: "150px",
                        // maxHeight: "300px",
                        margin: "10%",
                        // padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        // flexDirection: "column",
                        ":hover": {
                          backgroundColor: theme.hover,
                          cursor: "pointer",
                        },
                      }}
                      // hover
                      // onClick={() => {
                      //     navigateToBoard(board_id);
                      //     open create modal board
                      // }}
                    >
                      {/* <p variant="h1" component="h2" className="add--text">
                        ساخت بورد جدید
                      </p> */}
                      <CreateBoardModal
                        workspace_id={workspace.id}
                        flag={flag}
                        setFlag={setFlag}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </>
            );
          })}
          {/* <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <HomeRepairServiceTwoToneIcon sx={{ ml: 1.5 }} /> فضا های مهمان
          </p> */}
        </>
      ),
    },
    templates: {
      title: "تمپلیت ها",
      icon: <ContentPasteTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        <>
          <p variant="h1" component="h2" className="text paragraph">
            <ViewDayTwoToneIcon
              sx={{
                // paddingLeft: "1%",
                // minWidth: "35px",
                ml: 1.5,
              }}
            />{" "}
            تمپلیت های گوناگون
          </p>
          {templates.map((template) => {
            return (
              <>
                <div>
                  <p variant="h1" component="h2" className="text paragraph">
                    {template.name}
                  </p>
                </div>
                <Grid
                  container
                  columns={{ xs: 2, sm: 4, md: 8 }}
                  // spacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{
                    // paddingTop: "5%",
                    // marginTop: "10%",
                    marginBottom: "10%",
                    // backgroundColor: "#f5f5f5",
                  }}
                >
                  <Grid
                    item
                    xs={2}
                    sm={2}
                    md={2}
                    key={template.id * template.id + 1}
                    sx={{}}
                  >
                    <div>
                      <Paper
                        sx={{
                          padding: "2%",
                          // textAlign: "center",
                          // color: theme.primary,
                          backgroundColor: "#0A1929", // 5090D3 , 007fff, 132F4C, 173A5E
                          borderRadius: "10px",
                          // width: "100%",
                          // height: "100%",
                          // minWidth: "200px",
                          // maxWidth: "300px",
                          minHeight: "150px",
                          // maxHeight: "300px",
                          margin: "10%",
                          // padding: "100px",
                          // display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          // flexDirection: "column",
                          ":hover": {
                            backgroundColor: theme.hover,
                            // backgroundColor: theme.primary,
                            // cursor: "pointer",
                          },
                        }}
                        // hover
                        // onClick={() => {
                        //   // openCreateTemplateModal(template.id, template.name, template.description, template.background_pic);
                        // }}
                      >
                        <p
                          variant="h1"
                          component="h2"
                          className="text paragraph"
                        >
                          نام تمپلیت:
                          <br />
                          {template.name ? template.name : "بی‌نام"}
                        </p>
                        <p
                          variant="h1"
                          component="h2"
                          className="text paragraph"
                        >
                          توضیحات:
                          <br />
                          {template.description
                            ? template.description
                            : "بدون توضیحات"}
                        </p>
                        {/* <CreateTemplateModal
                          template_id={template.id}
                          template_name={template.name}
                          template_description={template.description}
                          template_background_pic={template.background_pic}
                        /> */}
                      </Paper>
                    </div>
                  </Grid>
                  <Grid item xs={2} sm={2} md={2} key={template.id} sx={{}}>
                    <div>
                      <Paper
                        sx={{
                          padding: "2%",
                          textAlign: "center",
                          // color: theme.primary,
                          backgroundColor: theme.primary, // 5090D3
                          borderRadius: "10px",
                          // width: "100%",
                          // height: "100%",
                          // minWidth: "200px",
                          // maxWidth: "300px",
                          minHeight: "150px",
                          // maxHeight: "300px",
                          margin: "10%",
                          // padding: "100px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          ":hover": {
                            backgroundColor: theme.hover,
                            cursor: "pointer",
                          },
                        }}
                        // hover
                        // onClick={() => {
                        //   // openCreateTemplateModal(template.id, template.name, template.description, template.background_pic);
                        // }}
                      >
                        {/* <p
                          variant="h1"
                          component="h2"
                          className="text paragraph"
                        >
                          {template.name
                            ? template.name
                            : "بی‌نام"}
                        </p>
                        <p
                          variant="h1"
                          component="h2"
                          className="text paragraph"
                        >
                          {template.description
                            ? template.description
                            : "بدون توضیحات"}
                        </p> */}
                        <CreateTemplateModal
                          template_id={template.id}
                          template_name={template.name}
                          template_description={template.description}
                          template_background_pic={template.background_pic}
                        />
                      </Paper>
                    </div>
                  </Grid>
                </Grid>
                <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
              </>
            );
          })}
        </>
      ),
    },
    home: {
      title: "خانه",
      icon: <HomeTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        // <a className="option" href="#"><HomeTwoToneIcon /> </a>
        <>
          {/* <p variant="h1" component="h2" className="text paragraph">
            <StarPurple500TwoToneIcon sx={{ ml: 1.5 }} /> برجسته ها
          </p>
          <Grid></Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} /> */}
          <p variant="h1" component="h2" className="text paragraph">
            <AvTimerTwoToneIcon sx={{ ml: 1.5 }} /> اخیرا دیده شده
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              // paddingTop: "5%",
              // marginTop: "10%",
              marginBottom: "10%",
              // backgroundColor: "#f5f5f5",
            }}
          >
            {recentBoards.map((board) => {
              return (
                <Grid item xs={2} sm={2} md={2} key={board["id"]} sx={{}}>
                  <div>
                    <Paper
                      sx={{
                        padding: "2%",
                        textAlign: "center",
                        // color: theme.primary,
                        backgroundColor: theme.primary, // 5090D3
                        borderRadius: "10px",
                        // width: "100%",
                        // height: "100%",
                        // minWidth: "200px",
                        // maxWidth: "300px",
                        minHeight: "150px",
                        // maxHeight: "300px",
                        margin: "10%",
                        // padding: "100px",
                        // display: "flex",
                        // justifyContent: "center",
                        // alignItems: "center",
                        // flexDirection: "column",
                        ":hover": {
                          backgroundColor: theme.hover,
                          cursor: "pointer",
                        },
                      }}
                      // hover
                      onClick={() => {
                        // history.push(`/board/${board_id}`);
                        navigateToBoard(board["id"]);
                      }}
                    >
                      <p variant="h1" component="h2" className="text paragraph">
                        {board["name"] ? board["name"] : "بی‌نام"}
                      </p>
                      <p variant="h1" component="h2" className="text paragraph">
                        {board["description"]
                          ? board["description"]
                          : "بدون توضیحات"}
                      </p>
                    </Paper>
                  </div>
                </Grid>
              );
            })}
          </Grid>
          <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <DeveloperBoardTwoToneIcon sx={{ ml: 1.5 }} /> ساخت بورد جدید
          </p>
          <Grid
            container
            columns={{ xs: 2, sm: 4, md: 8 }}
            // spacing={{ xs: 1, sm: 2, md: 3 }}
            sx={{
              // paddingTop: "5%",
              // marginTop: "10%",
              marginBottom: "10%",
              // backgroundColor: "#f5f5f5",
            }}
          >
            <Grid item xs={2} sm={2} md={2} sx={{}}>
              <Paper
                sx={{
                  // padding: "10%",
                  textAlign: "center",
                  // color: theme.primary,
                  backgroundColor: theme.primary, // 5090D3
                  borderRadius: "10px",
                  // width: "100%",
                  // height: "100%",
                  // minWidth: "200px",
                  // maxWidth: "300px",
                  minHeight: "150px",
                  // maxHeight: "300px",
                  margin: "10%",
                  // padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // flexDirection: "column",
                  ":hover": {
                    backgroundColor: theme.hover,
                    cursor: "pointer",
                  },
                }}
                // hover
                // onClick={() => {
                //     navigateToBoard(board_id);
                //     open create modal board
                // }}
              >
                {/* <p variant="h1" component="h2" className="add--text">
                        ساخت بورد جدید
                      </p> */}
                <CreateBoard flag={flag} setFlag={setFlag} />
              </Paper>
            </Grid>
          </Grid>
          {/* <Divider sx={{ bgcolor: theme.primary, marginTop: "5%" }} />
          <p variant="h1" component="h2" className="text paragraph">
            <MessageTwoToneIcon sx={{ ml: 1.5 }} /> پیام ها
          </p> */}
        </>
      ),
    },
    workspaces: {
      title: "فضا های کاری",
      icon: <WorkspacesTwoToneIcon sx={{ ml: 1.5 }} />,
      content: (
        // <a className="option" href="#"><WorkspacesTwoToneIcon /> </a>
        <>
          <p className="text paragraph">
            {" "}
            <WorkspacesTwoToneIcon sx={{ ml: 1.5 }} /> فضای کار ها{" "}
          </p>
          <BasicModal text="+" />
          {/* <p> <BasicModal  text="+"/></p> */}
          {workspaces.map((workspace) => (
            <a
              className="option"
              href="#"
              key={workspace.id}
              onClick={() => navigateToWorkspace(workspace.id)}
            >
              {workspace.name}
            </a>
          ))}
          {/* <a className="option" href="#">فضای کار 1</a> */}
        </>
      ),
    },
  };

  const [activeTab, setActiveTab] = useState("boards");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const matches = useMediaQuery("(min-width:450px)");
  const [value, setValue] = React.useState("boards");
  const handleChange = (event, newValue) => {
    setValue(newValue);
    toggle(newValue);
  };

  // const state = useSelector((state) => state);
  // ////console.log("store", state);
  // const dispatch = useDispatch();
  // dispatch(actionObject or calling the action creator); (when an action is dispatched, all the reducers become active.)
  // onClick={() => {
  // dispatch(deleteItem());
  //   }}

  if (matches) {
    return (
      <div
        style={{
          overflow: "auto",
        }}
      >
        <Helmet>
          <title>داشبورد</title>
        </Helmet>
        <Grid
          container
          spacing={{ xs: 0, md: 0 }}
          columns={{ xs: 3, sm: 8, md: 12 }}
        >
          <Grid item xs={1} sm={2} md={2}>
            <div className="text sidebar">
              {/* https://www.pluralsight.com/guides/handling-tabs-using-page-urls-and-react-router-doms */}
              {Object.entries(computer_tabs).map((tab) => (
                <a
                  className={activeTab === tab[0] ? "option active" : "option"}
                  href="#"
                  onClick={() => {
                    toggle(tab[0]);
                  }}
                >
                  {tab[1].icon} {tab[1].title}
                </a>
              ))}
              {/* https://www.npmjs.com/package/react-device-detect */}

              <Divider sx={{ bgcolor: "white", marginTop: "5%" }} />
              <p className="text paragraph">
                {" "}
                <WorkspacesTwoToneIcon sx={{ ml: 1.5 }} /> فضای کار ها{" "}
              </p>
              <BasicModal text="+" />
              {workspaces.map((workspace) => (
                <a
                  className="option "
                  href="#"
                  key={workspace.id}
                  onClick={() => navigateToWorkspace(workspace.id)}
                >
                  {workspace.name}{" "}
                </a>
              ))}
            </div>
          </Grid>
          <Grid item xs={2} sm={6} md={10}>
            {Object.entries(computer_tabs).map((tab) => (
              <>{activeTab === tab[0] && tab[1].content}</>
            ))}
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      // https://mui.com/material-ui/react-bottom-navigation/
      <Fragment
        sx={{
          overflow: "auto",
        }}
      >
        <Helmet>
          <title>داشبورد</title>
        </Helmet>
        <div>
          {Object.entries(mobile_tabs).map((tab) => (
            <>{activeTab === tab[0] && tab[1].content}</>
          ))}
        </div>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            fontFamily: "Vazir",
          }}
          style={{ fontFamily: "Vazir" }}
          elevation={3}
        >
          <BottomNavigation
            sx={{ width: "100%", fontFamily: "Vazir" }}
            value={value}
            onChange={handleChange}
            style={{ fontFamily: "Vazir" }}
          >
            <BottomNavigationAction
              sx={{ fontFamily: "Vazir" }}
              label="بورد ها"
              value="boards"
              icon={<DashboardTwoToneIcon />}
              style={{
                fontFamily: "Vazir",
                label: {
                  fontFamily: "Vazir",
                },
              }}
            />
            <BottomNavigationAction
              label="خانه"
              value="home"
              icon={<HomeTwoToneIcon />}
            />
            <BottomNavigationAction
              label="تمپلیت ها"
              value="templates"
              icon={<ContentPasteTwoToneIcon />}
            />
            <BottomNavigationAction
              label="فضای کار ها"
              value="workspaces"
              icon={<WorkspacesTwoToneIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Fragment>
    );
  }
};
