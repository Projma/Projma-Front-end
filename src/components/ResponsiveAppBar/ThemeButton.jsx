import useTheme from "../../hooks/useTheme";
import "./ThemeButton.scss";
import { useEffect, useState } from "react";
import {
  SailingOutlined,
  NightlightRoundOutlined,
  WbSunnyOutlined,
  CloudOutlined,
} from "@mui/icons-material";
import WbTwilightOutlinedIcon from "@mui/icons-material/WbTwilightOutlined";
import { Box } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";

const findIcon = (name) => {
  if (name === "sky") {
    return <CloudOutlined />;
  } else if (name === "sun") {
    return <WbTwilightOutlinedIcon />;
  } else if (name === "dark") {
    return <NightlightRoundOutlined />;
  } else if (name === "light") {
    return <WbSunnyOutlined />;
  } else if (name === "ocean") {
    return <SailingOutlined />;
  }
};

const ThemeButton = () => {
  const { changeTheme, THEME, theme, getColor } = useTheme();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <Box sx={{ flexGrow: 0, fontFamily: "Vazir" }}>
      <Avatar
        onClick={handleOpenUserMenu}
        alt="عکس پروفایل"
        sx={{ width: 46, height: 46, backgroundColor: theme.secondary, color: getColor(theme.secondary)}}
        variant="circular"
        
      >
        {findIcon(theme.name)}
      </Avatar>
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
        {THEME.filter((th) => th.name !== theme.name).map((th) => {
          return (
            <MenuItem
              key={th}
              onClick={() => changeTheme(th.name)}
              sx={{
                backgroundColor: theme.mainBg,
                color: getColor(theme.mainBg),
                width: "fit-content",
                height: "fit-content",
                ":hover": {
                  color: getColor(theme.tertiary),
                  backgroundColor: theme.tertiary,
                },
                marginBottom: "0.5rem"
              }}
            >   
                {findIcon(th.name)}
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default ThemeButton;

// <div className="theme-container">
//   <div className="theme-bg-button">
//     {THEME.map(t => (<button className="theme-button" onClick={() => changeTheme(t.name)}>{t.name}</button>))}
//   </div>
// </div>
