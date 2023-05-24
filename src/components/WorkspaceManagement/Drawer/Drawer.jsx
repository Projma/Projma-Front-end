import { useEffect, useState } from "react";
import "./Drawer.scss";
import {
  CalendarMonthOutlined,
  MenuOutlined,
  ViewKanbanOutlined,
  PeopleOutlineOutlined,
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
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";

const Drawer = () => {
  const { collapseSidebar, collapsed } = useProSidebar();
  const {theme} = useTheme();
  const menuStyle = {
    ["." + menuClasses.button]: {
      color: theme.text,
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
      color: theme.text,
      margin: "0.5rem 1rem",
      backgroundColor: "#00000000",
      boxShadow: "none",
      // "&:hover": {
      //   backgroundColor: "$hover",
      // },
    },
  };

  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`/workspace/${params.id}/dashboard/${path}`);
  };
  
  let params = useParams();

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${params.id}/workspace-members/`)
      .then((res) => {
        const members = res.data.map((obj) => ({
          id: obj.user.id,
          name: obj.user.first_name + " " + obj.user.last_name,
          userName: obj.user.username,
          email: obj.user.email,
          image: obj.profile_pic
            ? baseUrl + obj.profile_pic?.slice(1)
            : anonymous,
        }));
        setMembers(members);
      });
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100%", maxHeight: "100%" }}>
      <Sidebar
        rtl
        backgroundColor={theme.secondary}
        // collapsed
        defaultCollapsed
        transitionDuration={800}
        rootStyles={{
          borderLeft: "none !important",
        }}
      >
        <div className="drawer-container">
          <div className="drawer-header">
            <Menu
              iconShape="square"
              rootStyles={menuStyle}
              style={{
                marginBottom: "1rem",
              }}
            >
              <MenuItem
                onClick={() => collapseSidebar(!collapsed)}
                icon={collapsed ? <MenuOutlined sx={{ color: theme.text}}/> : undefined}
                style={{
                  color: theme.text,
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
                    <MenuOutlined sx={{ color: theme.text}}/>
                  </div>
                )}
              </MenuItem>
            </Menu>
            <Menu rootStyles={menuStyle}>
              <MenuItem
                icon={<ViewKanbanOutlined sx={{ color: theme.text}}/>}
                onClick={() => handleClick("board")}
              >
                بورد
              </MenuItem>
              <MenuItem
                icon={<PeopleOutlineOutlined sx={{ color: theme.text}}/>}
                onClick={() => handleClick("team")}
              >
                اعضای تیم
              </MenuItem>
            </Menu>
          </div>
          <div className="drawer-footer">
            <Menu rootStyles={menuStyle}>
              <MenuItem
                onClick={() =>
                  navigate(`/dashboard`)
                }
                icon={<HomeOutlined sx={{ color: theme.text}}/>}
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

export default Drawer;
