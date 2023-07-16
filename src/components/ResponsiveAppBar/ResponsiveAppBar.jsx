import * as React from "react";
import AppBar from "@mui/material/AppBar";
import { Box } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import "./ResponsiveAppBar.scss";
import avatar_photo from "../../static/images/profile/blank.png";
import projmaPic from "../../../public/projma.png";
import { useNavigate } from "react-router-dom";
import BasicMenu from "./BasicMenu/BasicMenu";
import { useState, useEffect } from "react";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";
import useTheme from "../../hooks/useTheme";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import ThemeButton from "./ThemeButton";
// https://mui.com/#app-bar-with-responsive-menu

function ResponsiveAppBar() {
  const baseURL = baseUrl.substring(0, baseUrl.length - 1);
  let [workspaces, setWorkspaces] = useState([]);
  let [starredBoards, setStarredBoards] = useState([]);
  const { theme, getColor } = useTheme();
  useEffect(() => {
    apiInstance
      .get("/workspaces/dashboard/myworkspaces/")
      .then((response) => {
        setWorkspaces(response.data);
        console.log(response.data);
      })
      .catch((error) => {});

    apiInstance
      .get("/workspaces/dashboard/mystarred-boards/")
      .then((response) => {
        setStarredBoards(response.data);
      })
      .catch((error) => {});
  }, []);

  const pages = ["ستاره دارها", "فضای کارها", "ایجاد"]; // 'اخیرا دیده شده‌ها',
  let workspaces_id_to_name = workspaces.reduce((acc, workspace) => {
    acc[workspace.id] = workspace.name;
    return acc;
  }, {}); // {1: "workspace1", 2: "workspace2", ...}

  let pages_map_to_items = [];
  for (const id in workspaces_id_to_name) {
    if (Object.hasOwnProperty.call(workspaces_id_to_name, id)) {
      const name = workspaces_id_to_name[id];
      pages_map_to_items.push(
        // onclick={handlecolse}
        <MenuItem
          href={`/workspace/${id}`}
          key={id}
          sx={{ backgroundColor: theme.minorBg, color: theme.text }}
        >
          {name}
        </MenuItem>
      );
    }
  }
  const state = useSelector((state) => state);
  console.log(state);
  const dispatch = useDispatch();
  let settings = [
    "صفحه اصلی",
    "ورود",
    "پروفایل",
    "داشبورد",
    "تغییر رمز عبور",
    "خروج",
  ]; // حساب کاربری
  if (state.isAuthenticated === false) {
    // dispatch(setToken(localStorage.getItem("token")));
    settings = ["صفحه اصلی", "ورود", "ثبت نام"];
  } else {
    settings = ["صفحه اصلی", "پروفایل", "داشبورد", "تغییر رمز عبور", "خروج"];
  }
  let settings_map_to_functions = {
    "صفحه اصلی": "/",
    ورود: "/signin/",
    "ثبت نام": "/signup/",
    پروفایل: "/profile/",
    داشبورد: "/dashboard/",
    "تغییر رمز عبور": "/changepassword/",
    خروج: "/logout/",
  };

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const navigateToPage = (page) => {
    if (page === "/logout/") {
      dispatch(logout());
      navigate("/");
    } else {
      navigate(page);
    }
    handleCloseUserMenu();
  };

  return (
    <AppBar
      position="static"
      sx={{
        fontFamily: "Vazir",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Vazir",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: theme.name === "ocean" ? "#eee" : getColor(theme.primary),
            }}
          >
            پروجما
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", fontFamily: "Vazir" },
              backgroundColor: theme.primary,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: getColor(theme.minorBg) }} />
            </IconButton>
            <Menu
              style={{ fontFamily: "Vazir" }}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                fontFamily: "Vazir",
                backgroundColor: `${theme.minorBg} !important`,
                color:
                  theme.name === "ocean" ? "#eee" : getColor(theme.primary),
              }}
            >
              {state.isAuthenticated === true &&
                pages.map((page) => (
                  <BasicMenu
                    name={page}
                    workspaces={workspaces_id_to_name}
                    starred_boards={starredBoards}
                  />
                ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Vazir",
              fontWeight: 700,
              letterSpacing: ".3rem",
              textDecoration: "none",
              color: theme.name === "ocean" ? "#eee" : getColor(theme.primary),
            }}
          >
            پروجما
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {state.isAuthenticated === true &&
              pages.map((page) => (
                <BasicMenu
                  name={page}
                  workspaces={workspaces_id_to_name}
                  starred_boards={starredBoards}
                />
              ))}
          </Box>
          <ThemeButton />

          <Box sx={{ flexGrow: 0, fontFamily: "Vazir", marginRight: "2rem" }}>
            <Tooltip
              // title="باز کردن تنظیمات"
              title={"باز کردن تنظیمات"}
            >
              {/* <Avatar alt="عکس پروفایل" src={state.user.profile_pic ? state.user.profile_pic : avatar_photo} /> */}
              {state.user.user === undefined ? (
                <Avatar
                  onClick={handleOpenUserMenu}
                  alt="عکس پروفایل"
                  sx={{
                    width: 50, height: 50,
                    color: getColor(theme.mainBg),
                  }}
                  variant="circular"
                  // src={
                  //   state.user.profile_pic === null
                  //     ? avatar_photo
                  //     : baseURL + state.user.profile_pic
                  // }
                  src={projmaPic}
                />
              ) : (
                <Avatar
                  onClick={handleOpenUserMenu}
                  alt="عکس پروفایل"
                  sx={{
                    backgroundColor: theme.minorBg,
                    width: 50, height: 50,
                    color: getColor(theme.minorBg),
                  }}
                  variant="circular"
                  src={baseURL + state.user.profile_pic}
                >
                  {(state.user.user.first_name[0] + state.user.user.last_name[0]).toUpperCase()}
                </Avatar>
              )}
            </Tooltip>
            <Menu
              sx={{ mt: "4.5rem" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                return (
                  <MenuItem
                    key={setting}
                    onClick={() =>
                      navigateToPage(settings_map_to_functions[setting])
                    }
                    sx={{
                      backgroundColor: theme.mainBg,
                      color: getColor(theme.mainBg),
                      width: "100%",
                      height: "100%",
                      ":hover": {
                        color: getColor(theme.tertiary),
                        backgroundColor: theme.tertiary,
                        borderRadius: "5px",
                      },
                    }}
                  >
                    <Typography
                      textAlign="center"
                      style={{
                        color: getColor(theme.mainBg),
                        fontFamily: "Vazir",
                        fontSize: "76%",
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
