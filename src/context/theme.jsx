import React, { createContext, useState, useCallback, useRef } from "react";
import apiInstance from "../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";
import { baseUrl } from "../utilities/constants";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const THEME = [
    {
      name: "light",
      mainBg: "#e7ebf0",
      minorBg: "#ffffff",
      bg: "linear-gradient(to right top, #ffffff, #fafafb, #f4f5f7, #eef0f4, #e7ebf0)",
      secondary: "#d1d5db",
      tertiary: "#5090d3",
      hover: "#5090d380",
      primary: "#00599c",
    },
    {
      name: "dark",
      mainBg: "#202020",
      minorBg: "#161616",
      bg: "linear-gradient(to right top, #161616, #171717, #171717, #181818, #181818, #191919, #191919, #1a1a1a, #1b1b1b, #1d1d1d, #1e1e1e, #202020)",
      secondary: "#262626",
      tertiary: "#E6C675",
      hover: "#E6C67580",
      primary: "#d4af37",
    },
    {
      name: "ocean",
      mainBg: "#001e3c",
      minorBg: "#0a1929",
      bg: "linear-gradient(to right top, #0a1929, #081a2e, #051c32, #031d37, #001e3c)",
      secondary: "#132f4c",
      tertiary: "#5090d3",
      hover: "#5090d380",
      primary: "#1976d2",
    },
  ];
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === null
      ? THEME[1]
      : THEME.find((t) => t.name === localStorage.getItem("theme"))
  );

  document.documentElement.style.setProperty("--main-bg", theme.mainBg);
  document.documentElement.style.setProperty("--minor-bg", theme.minorBg);
  document.documentElement.style.setProperty("--secondary", theme.secondary);
  document.documentElement.style.setProperty("--tertiary", theme.tertiary);
  document.documentElement.style.setProperty("--hover", theme.hover);
  document.documentElement.style.setProperty("--primary", theme.primary);

  const changeTheme = (name) => {
    for (let x of THEME) {
      if (x.name === name) {
        document.documentElement.style.setProperty("--main-bg", x.mainBg);
        document.documentElement.style.setProperty("--minor-bg", x.minorBg);
        document.documentElement.style.setProperty("--secondary", x.secondary);
        document.documentElement.style.setProperty("--tertiary", x.tertiary);
        document.documentElement.style.setProperty("--hover", x.hover);
        document.documentElement.style.setProperty("--primary", x.primary);
        setTheme(x);
        localStorage.setItem("theme", x.name);
        break;
      }
    }
  };

  
  function getColor(bgColor) {
    const r = parseInt(bgColor.substr(1,2), 16);
    const g = parseInt(bgColor.substr(3,2), 16);
    const b = parseInt(bgColor.substr(5,2), 16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ?  "#2b2f33" : "#eeeeee";
  }

  const projmaTheme = {
    theme,
    THEME,
    changeTheme,
    getColor,
  };

  return (
    <React.Fragment>
      <ThemeContext.Provider value={projmaTheme}>
        {children}
      </ThemeContext.Provider>
    </React.Fragment>
  );
}

export { ThemeProvider };
export default ThemeContext;
