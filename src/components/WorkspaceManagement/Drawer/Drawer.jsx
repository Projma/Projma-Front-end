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
import tc from "../../../Theme/theme";

const Drawer = () => {
  const { collapseSidebar, collapsed } = useProSidebar();

  const menuStyle = {
    ["." + menuClasses.button]: {
      color: tc.text,
      backgroundColor: tc.minorBg,
      borderRadius: "0.5rem",
      "&:hover": {
        backgroundColor: tc.hover,
      },
    },
    ["." + menuClasses.label]: {
      fontSize: "1.4rem",
    },
    ["." + menuClasses.menuItemRoot]: {
      marginBottom: "0.5rem",
      borderRadius: "0.5rem",
      backgroundColor: tc.minorBg,
    },
    ["." + menuClasses.subMenuContent]: {
      color: "#fff",
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
        backgroundColor={tc.minorBg}
        // collapsed
        defaultCollapsed
        transitionDuration={800}
        rootStyles={{
          border: "none",
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
                icon={collapsed ? <MenuOutlined /> : undefined}
                style={{
                  color: tc.text,
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
                onClick={() => handleClick("board")}
              >
                بورد
              </MenuItem>
              <MenuItem
                icon={<PeopleOutlineOutlined />}
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

export default Drawer;
