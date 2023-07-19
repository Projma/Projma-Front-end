import { useState, useEffect } from "react";
import useTheme from "../../hooks/useTheme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./Header.scss";
import RightMenu from "./content/RightMenu";
import LeftMenu from "./content/LeftMenu";
import { useSelector, useDispatch } from "react-redux";
import CenterHeader from "./content/CenterHeader";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const Header = () => {
  const state = useSelector((state) => state);
  const [open, setOpen] = useState(false);
  const { theme, getColor } = useTheme();
  const navigate = useNavigate();
  const handleContainerClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {}, [state.isAuthenticated]);

  return (
    <>
      {state.isAuthenticated === true ? (
        <nav className="header">
          <CenterHeader />
          <RightMenu />
          <LeftMenu />
          <div className="header-menu" onClick={() => setOpen(!open)}>
            <MenuOutlinedIcon style={{ fill: getColor(theme.minorBg) }} />
            {open === true && (
              <div
                className="header-menu-container"
                onClick={handleContainerClick}
              >
                <LeftMenu />
                <RightMenu />
              </div>
            )}
          </div>
        </nav>
      ) : (
        <nav className="header-minor">
          <CenterHeader />
          <div className="header-minor-button">
            <Button variant="contained" onClick={() => navigate("/signin")}>
              وارد شوید
            </Button>
            <Button variant="text" onClick={() =>  navigate("/signup")}>
              ثبت نام کنید
            </Button>
          </div>
        </nav>
      )}
    </>
  );
};

export default Header;
