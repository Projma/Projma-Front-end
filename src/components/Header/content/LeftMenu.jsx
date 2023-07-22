import { useState, useEffect } from "react";
import Dialog from "../../Asset/Dialog";
import { Avatar } from "@mui/material";
import { baseUrl } from "../../../utilities/constants";
import UserDialog from "../dialog/UserDialog";
import ContrastIcon from "@mui/icons-material/Contrast";
import ThemeDialog from "../dialog/ThemeDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CreateDialog from "../dialog/CreateDialog";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../../utilities/axiosConfig";
import { useLocation } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import "../Header.scss";

const LeftMenu = () => {
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [user, setUser] = useState({});
  const { theme, getColor } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const getUserProfile = async () => {
      apiInstance.get("accounts/profile/myprofile/").then((res) => {
        setUser(res.data);
      });
    };

    getUserProfile();
  }, [location]);

  return (
    <div className="header-left">
      <div className="header-create" onClick={() => setOpenCreate(true)}>
        <AddCircleOutlineIcon style={{ fill: getColor(theme.minorBg) }} />
        <Dialog onClose={() => setOpenCreate(false)} open={openCreate}>
          <CreateDialog />
        </Dialog>
      </div>
      <div className="header-theme" onClick={() => setOpenTheme(true)}>
        <ContrastIcon style={{ fill: getColor(theme.minorBg) }} />
        <Dialog onClose={() => setOpenTheme(false)} open={openTheme}>
          <ThemeDialog />
        </Dialog>
      </div>
      <div className="header-avatar" onClick={() => setOpenAvatar(true)}>
        <Avatar src={baseUrl.slice(0, -1) + user.profile_pic} sizes="30" />
        <Dialog onClose={() => setOpenAvatar(false)} open={openAvatar}>
          <UserDialog user={user} />
        </Dialog>
      </div>
    </div>
  );
};

export default LeftMenu;
