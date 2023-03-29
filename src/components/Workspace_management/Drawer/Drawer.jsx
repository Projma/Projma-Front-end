import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import BoardIcon from "@mui/icons-material/Assignment";
import { makeStyles } from "@mui/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DehazeIcon from "@mui/icons-material/Dehaze";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Members from "../Members/Members";
import "./Drawer.css";
import { useEffect } from "react";
import anonymous from "../../../static/images/workspace_management/members/anonymous.png";
import { baseUrl } from "../../../utilities/constants";
import apiInstance from "../../../utilities/axiosConfig";
import { useState } from "react";

const drawerWidth = 250;

const useStyles = makeStyles({
  close_drawer: {
    "&:hover": {
      backgroundColor: "#B0ACB1",
    },
  },
  list_item: {
    "&:hover": {
      backgroundColor: "#223040",
    },
    fontFamily: "Vazir",
  },
  list_item_icon: {
    color: "#fff",
    borderRadius: "50%",
  },
});
function ResponsiveDrawer(props) {
  const [members, setMembers] = useState([]);
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const right_arrow = (
    <div id="right-arrow-div">
      <KeyboardArrowRightIcon
        className={classes.close_drawer}
        sx={{ fontSize: "30px" }}
        onClick={handleDrawerToggle}
      />
    </div>
  );
  const sidebarButton = [
    { nameFa: "بورد‌ها", nameEn: "Boards" },
    { nameFa: "اعضا", nameEn: "members" },
  ];
  const drawer = (
    <div className="drawer" style={{ overflow: "auto" }}>
      {matches ? "" : right_arrow}
      <Divider />
      <List>
        {sidebarButton.map((obj, index) => (
          <ListItem
            button
            href="#"
            key={obj.nameFa}
            disablePadding
            className={classes.list_item}
          >
            <Link
              to={obj.nameEn}
              className={classes.list_item}
              style={{
                textDecoration: "none",
                color: "#000",
                display: "block",
                width: "100%",
              }}
            >
              <ListItemButton sx={{}}>
                <ListItemIcon>
                  {index === 0 ? (
                    <BoardIcon className={classes.list_item_icon} />
                  ) : index === 1 ? (
                    <PeopleIcon className={classes.list_item_icon} />
                  ) : (
                    <SettingsIcon className={classes.list_item_icon} />
                  )}
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#fff", fontFamily: "Vazir" }}
                    >
                      {obj.nameFa}
                    </Typography>
                  }
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "1.3rem",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ backgroundColor: "#9499a8" }} />
      <List>
        {members.map((member, index) => (
          <ListItem
            button
            href="#"
            key={member.name}
            disablePadding
            className={classes.list_item}
          >
            <Link
              to={"/profileview/" + member.userName}
              className={classes.list_item}
              style={{
                textDecoration: "none",
                color: "#000",
                display: "block",
                width: "100%",
              }}
            >
              <ListItemButton sx={{}}>
                <ListItemIcon>
                  <img
                    src={member.image}
                    style={{
                      border: "1px solid #ddd",
                      "border-radius": "4px",
                      padding: "5px",
                      width: "4rem",
                      height: "4rem",
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography
                      type="body2"
                      style={{ color: "#fff", fontFamily: "Vazir" }}
                    >
                      {member.name}
                    </Typography>
                  }
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    fontSize: "1.3rem",
                  }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    apiInstance
      .get(`workspaces/workspaceowner/${props.params.id}/workspace-members/`)
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
    <div>
      <KeyboardDoubleArrowLeftIcon
        onClick={handleDrawerToggle}
        sx={{
          fontSize: "3rem",
          color: "#B0ACB1",
          borderRadius: "50%",
          marginTop: "10px",
          marginRight: "10px",
        }}
      />
      <div className="main-container" style={{ width: props.width }}>
        <Box
          sx={{
            display: "flex",
            width: props.width,
          }}
        >
          <CssBaseline />
          <Box
            component="nav"
            sx={{
              width: { sm: drawerWidth },
              width: "100%",
              flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              anchor="right"
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  // backgroundColor: "#1c334e",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              anchor="right"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default ResponsiveDrawer;
