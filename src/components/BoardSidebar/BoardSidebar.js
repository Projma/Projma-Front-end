import { useEffect, useState } from "react";
import {
  CalendarMonthOutlined,
  DashboardOutlined,
  MenuOutlined,
  ViewKanbanOutlined,
  TaskAltOutlined,
  GroupWorkOutlined
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
    <div style={{ display: "flex", minHeight: "100%" }}>
      <Sidebar
        rtl
        // image={cover}
        backgroundColor={"#0a1929"}
        collapsed
        transitionDuration={800}
        rootStyles={{
          border: "none",
        }}
      >
        <Menu
          iconShape="square"
          rootStyles={{
            ["." + menuClasses.button]: {
              "&:hover": {
                backgroundColor: "var(--hover-color)",
              },
            },
          }}
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
        <Menu
          rootStyles={{
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
          }}
        >
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
            icon={<TaskAltOutlined/>}
            onClick={() => handleClick(boardId, "poll")}
          >
            رای گیری
          </MenuItem>
          <MenuItem
            icon={<GroupWorkOutlined/>}
            onClick={() => handleClick(boardId, "retro")}
          >
            رترو
          </MenuItem>

          {wsBoard !== [] && (
            <SubMenu label="بورد های فضای کاری" icon={<DashboardOutlined />}>
              {wsBoard.map((b) => (
                <MenuItem
                  onClick={() => handleClick(b.id, "board")}
                  rootStyles={{
                    ["." + menuClasses.button]: {
                      padding: "0 !important",
                      textAlign: "center",
                    },
                    ["." + menuClasses.menuItemRoot]: {},
                    backgroundColor: "#0a1929",
                    backgroundImage: `url(${b.cover})`,
                    // width: "auto",
                    // height: "auto",
                    objectFit: "cover",
                    border: "0.2rem solid var(--minor-item-color)",
                  }}
                >
                  {b.name}
                </MenuItem>
              ))}
            </SubMenu>
          )}
        </Menu>
      </Sidebar>
    </div>
  );
};

export default BoardSidebar;
