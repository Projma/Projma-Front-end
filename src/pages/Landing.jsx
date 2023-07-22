import React from "react";
import "../styles/Landing.scss";
import useTheme from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const { theme, getColor } = useTheme();
  const navigate = useNavigate();
  return (
    <div className="landing" style={{ color: getColor(theme.minorBg) }}>
      <div className="landing-hero">
        <div className="landing-hero-container">
          <h1 className="landing-hero-header">
            <div className="landing-hero-header-main">
              پروجما تمام وظایف، هم تیمی ها و ابزارهای شما را با هم جمع می کند
            </div>
            <div className="landing-hero-header-sub">
              همه چیز را در یک مکان نگه دارید - حتی اگر تیمی ندارید.
            </div>
          </h1>
          <button className="landing-hero-button" style={{color: getColor(theme.primary)}} onClick={() => navigate("/signup")}>پروژه خود را مدیریت کنید</button>
        </div>
        <div className="landing-hero-image">
          <img
            src={`/src/static/images/landing/${theme.name}_list.png`}
            alt="projma-tasklist"
            className="landing-hero-image-list"
          />
          <img
            src={`/src/static/images/landing/${theme.name}_sidebar.png`}
            alt="projma-sidebar"
            className="landing-hero-image-sidebar"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
