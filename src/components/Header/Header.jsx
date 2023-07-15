import { useState, useEffect } from "react";
import ProjmaName from "../Asset/ProjmaName";
import ProjmaLogo from "../Asset/ProjmaLogo";
import useTheme from "../../hooks/useTheme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "../Asset/Dialog";
import Modal from "../Asset/Modal";
import "./Header.scss";
import WorkspaceDialog from "./dialog/WorkspaceDialog";
import { useNavigate } from "react-router-dom";
import StarredDialog from "./dialog/StarredDialog";
import RecentDialog from "./dialog/RecentDialog";
import { Avatar } from "@mui/material";
import apiInstance from "../../utilities/axiosConfig";
import { baseUrl } from "../../utilities/constants";
import UserDialog from "./dialog/UserDialog";
import ContrastIcon from '@mui/icons-material/Contrast';
import { useLocation } from 'react-router-dom';
import ThemeDialog from "./dialog/ThemeDialog";

const Header = () => {
  const { theme, getColor } = useTheme();
  const [openWorkspace, setOpenWorkspace] = useState(false);
  const [openStarred, setOpenStarred] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [openAvatar, setOpenAvatar] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [user, setUser] = useState({});
  
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    const getUserProfile = async () => {
      apiInstance.get("accounts/profile/myprofile/").then((res) => {
        setUser(res.data);
      });
    };

    getUserProfile();
  }, [location]);

  return (
    <nav className="header">
      <div className="header-right" style={{ color: getColor(theme.minorBg) }}>
        <div
          className="header-workspace"
          onClick={() => setOpenWorkspace(!openWorkspace)}
        >
          <div className="header-option"> فضای کار</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenWorkspace(false)} open={openWorkspace}>
            <WorkspaceDialog />
          </Dialog>
        </div>
        <div
          className="header-starred"
          onClick={() => setOpenStarred(!openStarred)}
        >
          <div className="header-option">ستاره دار</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenStarred(false)} open={openStarred}>
            <StarredDialog />
          </Dialog>
        </div>
        <div
          className="header-recent"
          onClick={() => setOpenRecent(!openRecent)}
        >
          <div className="header-option">آخرین ها</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenRecent(false)} open={openRecent}>
            <RecentDialog />
          </Dialog>
        </div>
        <div
          className="header-template"
          onClick={() => setOpenTemplate(!openTemplate)}
        >
          <div className="header-option">قالب</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenTemplate(false)} open={openTemplate}>
            i dont give a fuck
          </Dialog>
        </div>
      </div>
      <div className="header-center">
        <div className="header-projma" onClick={() => handleClick()}>
          <div className="header-projma-text">
            <ProjmaName />
          </div>
          <div className="header-projma-logo">
            <ProjmaLogo />
          </div>
        </div>
      </div>
      <div className="header-left">
        <div className="header-theme" onClick={() => setOpenTheme(true)}>
          <ContrastIcon style={{ fill: getColor(theme.minorBg) }} />
          <Dialog onClose={() => setOpenTheme(false)} open={openTheme}>
          </Dialog>
        </div>
        <div className="header-create"></div>
        <div className="header-avatar" onClick={() => setOpenAvatar(true)}>
          <Avatar src={baseUrl.slice(0,-1) + user.profile_pic} sizes="30" />
          <Dialog onClose={() => setOpenAvatar(false)} open={openAvatar}>
            <ThemeDialog/>
            {/* <UserDialog user={user}/> */}
          </Dialog>
        </div>
      </div>
    </nav>
  );
};

export default Header;
