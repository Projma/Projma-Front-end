import { useEffect, useState } from "react";
import "./BoardSideBar.css";
import {
  CalendarMonthOutlined,
  DashboardOutlined,
  MenuOutlined,
  ViewKanbanOutlined,
  TaskAltOutlined,
  GroupWorkOutlined,
  FlareOutlined,
  Diversity2,
  ThumbsUpDown,
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
  MenuItemStyles,
} from "react-pro-sidebar";
import apiInstance from "../../utilities/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import useBoard from "../../hooks/useBoard";

const BoardSidebar = () => {
  const [wsBoard, setWsBoard] = useState([]);
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();
  const { boardCover, boardId, workspaceId, calendar } = useBoard();
  const menuStyle = {
    ["." + menuClasses.button]: {
      color: "#fff",
      backgroundColor: "#0a1929",
      borderRadius: "0.5rem",
      "&:hover": {
        backgroundColor: "var(--hover-color)",
      },
    },
    ["." + menuClasses.label]: {
      fontSize: "1.4rem",
    },
    ["." + menuClasses.menuItemRoot]: {
      marginBottom: "0.5rem",
      borderRadius: "0.5rem",
      backgroundColor: "#0a1929",
    },
    ["." + menuClasses.subMenuContent]: {
      color: "#fff",
      margin: "0.5rem 1rem",
      backgroundColor: "#00000000",
      boxShadow: "none",
      // "&:hover": {
      //   backgroundColor: "var(--hover-color)",
      // },
    },
  };
  // const [isCollapsed, setIsCollapsed] = useState(false);
  // const cover = boardCover === "" ? undefined : boardCover;
  const navigate = useNavigate();
  const handleClick = (id, path) => {
    navigate(`/workspace/${workspaceId}/kanban/${id}/${path}`);
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
        backgroundColor={"#0a1929"}
        // collapsed
        defaultCollapsed 
        transitionDuration={800}
        rootStyles={{
          border: "none",
        }}
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
                icon={collapsed ? <MenuOutlined /> : undefined}
                style={{
                  color: "#fff",
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
                    <Typography>داشبورد</Typography>
                    <MenuOutlined />
                  </div>
                )}
              </MenuItem>
            </Menu>
            <Menu rootStyles={menuStyle}>
              <MenuItem
                icon={<ViewKanbanOutlined />}
                onClick={() => handleClick(boardId, "board")}
              >
                بورد
              </MenuItem>
              <MenuItem
                icon={<CalendarMonthOutlined />}
                onClick={() => handleClick(boardId, "calendar")}
              >
                تقویم
              </MenuItem>
              <MenuItem
                icon={<TaskAltOutlined />}
                onClick={() => handleClick(boardId, "poll")}
              >
                رای گیری
              </MenuItem>

              <SubMenu
                label="رترو"
                icon={<GroupWorkOutlined />}
                // onClick={() => handleClick(boardId, "retro")}
              >
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/reflect")}
                  icon={<FlareOutlined />}
                >
                  بازتاب
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/group")}
                  icon={<Diversity2 />}
                >
                  گروه
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/vote")}
                  icon={<ThumbsUpDownOutlined />}
                >
                  رای
                </MenuItem>
                <MenuItem
                  onClick={() => handleClick(boardId, "retro/discuss")}
                  icon={<ChatOutlined />}
                >
                  بحث
                </MenuItem>
              </SubMenu>

              {wsBoard !== [] && (
                <SubMenu
                  label="بورد های فضای کاری"
                  icon={<DashboardOutlined />}
                >
                  {wsBoard.map((b) => (
                    <MenuItem
                      onClick={() => handleClick(b.id, "board")}
                      rootStyles={{
                        ["." + menuClasses.button]: {
                          padding: "0 !important",
                          textAlign: "center",
                          backgroundColor: "#0a1929",
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
                  navigate(`/workspace/${workspaceId}/dashboard/Boards`)
                }
                icon={<HomeOutlined />}
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
