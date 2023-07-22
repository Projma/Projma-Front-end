import { useEffect, useState } from "react";
import "./BoardSideBar.scss";
import {
  CalendarMonthOutlined,
  DashboardOutlined,
  MenuOutlined,
  ViewKanbanOutlined,
  TaskAltOutlined,
  GroupWorkOutlined,
  FlareOutlined,
  Diversity2,
  ThumbsUpDownOutlined,
  ChatOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
  menuClasses,
} from "react-pro-sidebar";
import apiInstance from "../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import useBoard from "../../hooks/useBoard";
import useTheme from "../../hooks/useTheme";
import { v4 } from "uuid";

const BoardSidebar = () => {
  const [wsBoard, setWsBoard] = useState([]);
  const { collapseSidebar, collapsed } = useProSidebar();
  const { theme, getColor } = useTheme();
  const { boardId, workspaceId } = useBoard();
  const menuStyle = {
    ["." + menuClasses.button]: {
      color: getColor(theme.secondary),
      backgroundColor: theme.secondary,
      borderRadius: "0.5rem",
      "&:hover": {
        backgroundColor: theme.hover,
      },
    },
    ["." + menuClasses.label]: {
      fontSize: "1.4rem",
    },
    ["." + menuClasses.menuItemRoot]: {
      marginBottom: "0.5rem",
      borderRadius: "0.5rem",
      backgroundColor: theme.secondary,
    },
    ["." + menuClasses.subMenuContent]: {
      color: getColor("#00000000"),
      margin: "0.5rem 1rem",
      backgroundColor: "#00000000",
      boxShadow: "none",
      // "&:hover": {
      //   backgroundColor: "$hover",
      // },
    },
  };
  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const cover = boardCover === "" ? undefined : boardCover;
  const navigate = useNavigate();
  const handleClick = (id, path) => {
    navigate(`/workspace/${workspaceId}/kanban/${id}/${path}`);
  };

  const createRetroSession = (id) => {
    // navigate(`/workspace/${workspaceId}/kanban/${id}/${path}`);
    apiInstance
      .get(`/board/boardsmemberapi/${id}/get-open-retro/`)
      .then((response) => {
        var retro_id = response.data.retro;
        // alert(retro_id)
        if (retro_id == -1) {
          apiInstance
            .post(`/retro/`, {
              board: id,
              vote_limitation: 50,
            })
            .catch((error) => {
              console.log(error);
            })
            .then((response) => {
              retro_id = response.data.id;
              localStorage.setItem("retro_id", retro_id);
            });
        } else {
          retro_id = response.data.retro;
          localStorage.setItem("retro_id", retro_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const getWorkspaceBoard = async () => {
      await apiInstance
        .get(`workspaces/workspaceowner/${workspaceId}/workspace-boards/`)
        .then((res) => {
          const boards = res.data.map((obj) => ({
            id: obj.id,
            name: obj.name,
            cover: `http://127.0.0.1:8000` + obj.background_pic,
          }));
          setWsBoard(boards);
        });
    };
    getWorkspaceBoard();
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100%", maxHeight: "100%" }}>
      <Sidebar
        rtl
        backgroundColor={theme.secondary}
        // collapsed
        defaultCollapsed
        transitionDuration={800}
        style={{ borderLeft: "none" }}
        width="23rem"
        breakPoint="md"
      >
        <div className="boardsidebar-container">
          <div className="boardsidebar-header">
            <Menu
              iconShape="square"
              rootStyles={menuStyle}
              style={{
                marginBottom: "1rem",
              }}
            >
              <MenuItem
                onClick={() => collapseSidebar(!collapsed)}
                icon={
                  collapsed ? (
                    <MenuOutlined sx={{ color: getColor(theme.secondary) }} />
                  ) : undefined
                }
                style={{
                  color: getColor(theme.secondary),
                }}
              >
                {!collapsed && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography color={getColor(theme.secondary) }>داشبورد</Typography>
                    <MenuOutlined sx={{ color: getColor(theme.secondary) }} />
                  </div>
                )}
              </MenuItem>
            </Menu>
            <Menu rootStyles={menuStyle}>
              <MenuItem
                icon={
                  <ViewKanbanOutlined
                    sx={{ color: getColor(theme.secondary) }}
                  />
                }
                onClick={() => handleClick(boardId, "board")}
              >
                بورد
              </MenuItem>
              <MenuItem
                icon={
                  <CalendarMonthOutlined
                    sx={{ color: getColor(theme.secondary) }}
                  />
                }
                onClick={() => handleClick(boardId, "calendar")}
              >
                تقویم
              </MenuItem>
              <MenuItem
                icon={
                  <TaskAltOutlined sx={{ color: getColor(theme.secondary) }} />
                }
                onClick={() => handleClick(boardId, "poll")}
              >
                رای گیری
              </MenuItem>

              <SubMenu
                label="رترو"
                icon={
                  <GroupWorkOutlined
                    sx={{ color: getColor(theme.secondary) }}
                  />
                }
                // onClick={() => handleClick(boardId, "retro")}
                onClick={() => createRetroSession(boardId)}
              >
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/reflect")}
                  icon={
                    <FlareOutlined sx={{ color: getColor(theme.secondary) }} />
                  }
                >
                  بازتاب
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/group")}
                  icon={
                    <Diversity2 sx={{ color: getColor(theme.secondary) }} />
                  }
                >
                  گروه
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/vote")}
                  icon={
                    <ThumbsUpDownOutlined
                      sx={{ color: getColor(theme.secondary) }}
                    />
                  }
                >
                  رای
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/discuss")}
                  icon={
                    <ChatOutlined sx={{ color: getColor(theme.secondary) }} />
                  }
                >
                  بحث
                </MenuItem>
              </SubMenu>

              {wsBoard !== [] && (
                <SubMenu
                  label="بورد های فضای کاری"
                  icon={
                    <DashboardOutlined
                      sx={{ color: getColor(theme.secondary) }}
                    />
                  }
                >
                  {wsBoard.map((b) => (
                    <MenuItem
                      // key={crypto.randomUUID()}
                      key={v4()}
                      onClick={() => handleClick(b.id, "board")}
                      rootStyles={{
                        ["." + menuClasses.button]: {
                          padding: "0 !important",
                          textAlign: "center",
                          backgroundColor: theme.minorBg,
                          backgroundImage: `linear-gradient(rgba(0,0,0,0.75),rgba(0,0,0,0.75)),url(${b.cover})`,
                          backgroundSize: "100% 100%",
                          backgroundPosition: "center",
                          backgroundRepeat: "no-repeat",
                          width: "100%",
                          height: "100%",
                        },
                        height: "100%",
                      }}
                    >
                      {b.name}
                    </MenuItem>
                  ))}
                </SubMenu>
              )}
            </Menu>
          </div>
          <div className="boardsidebar-footer">
            <Menu rootStyles={menuStyle}>
              <MenuItem
                onClick={() =>
                  navigate(`/workspace/${workspaceId}/dashboard/board`)
                }
                icon={
                  <HomeOutlined sx={{ color: getColor(theme.secondary) }} />
                }
              >
                فضای کاری
              </MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default BoardSidebar;
