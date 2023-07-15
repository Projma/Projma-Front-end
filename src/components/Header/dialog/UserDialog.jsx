import { baseUrl } from "../../../utilities/constants";
import { Avatar } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import useTheme from "../../../hooks/useTheme";
import "./UserDialog.scss";
import { useNavigate } from "react-router-dom";

const UserDialog = ({ user }) => {
  const { theme, getColor } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="user-dialog">
      {user !== undefined && user.user !== undefined && (
        <div className="user-account">
          <div className="user-header">حساب کاربری</div>
          <div className="user-container">
            <Avatar src={baseUrl.slice(0, -1) + user.profile_pic} />
            <div className="user-info">
              <div className="user-name">
                {user.user.first_name + " " + user.user.last_name}
              </div>
              <div className="user-email">{user.user.email}</div>
            </div>
          </div>
          <div className="user-option-container" onClick={() => navigate("/profile")}>
            <div className="user-option-title" style={{ color: getColor(theme.secondary) }}>مدیریت حساب</div>
            <ManageAccountsIcon style={{ fill: getColor(theme.secondary) }} />
          </div>
        </div>
      )}
      <div className="user-option">
        <div className="user-header">پروجما</div>
        <div className="user-option-container" onClick={() => navigate("/dashboard")}>
          <div className="user-option-title" style={{ color: getColor(theme.secondary) }}>داشبورد</div>
          <DashboardIcon style={{ fill: getColor(theme.secondary) }} />
        </div>
        <div className="user-option-container" onClick={() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          navigate("/");
        }}>
          <div className="user-option-title" style={{ color: getColor(theme.secondary) }}>خروج</div>
          <LogoutIcon style={{ fill: getColor(theme.secondary) }} />
        </div>
      </div>
    </div>
  );
};

export default UserDialog;
