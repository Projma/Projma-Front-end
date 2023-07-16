import React, { createContext, useState, useCallback, useRef } from "react";
import apiInstance from "../utilities/axiosConfig";
import Loading from "../components/Shared/Loading";
import { baseUrl } from "../utilities/constants";

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const THEME = [
    {
      name: "ocean",
      mainBg: "#001e3c",
      minorBg: "#0a1929",
      secondary: "#132f4c",
      tertiary: "#5090d3",
      hover: "#5090d380",
      primary: "#1976d2",
    },
    {
      name: "light",
      mainBg: "#e7ebf0",
      minorBg: "#ffffff",
      secondary: "#d1d5db",
      tertiary: "#5090d3",
      hover: "#5090d380",
      primary: "#00599c",
    },
    {
      name: "dark",
      mainBg: "#3e3e42",
      minorBg: "#2d2d30",
      secondary: "#1e1e1e",
      tertiary: "#eeeeee",
      hover: "#eeeeee80",
      primary: "#0c0a09",
    },
    // {
    //   name: "sky",
    //   mainBg: "#F1F6F9",
    //   minorBg: "#d1d5db",
    //   secondary: "#394867",
    //   tertiary: "#526D82",
    //   hover: "#526D8280",
    //   primary: "#212A3E",
    // },
    // {
    //   name: "sun",
    //   mainBg: "#e5e5e5",
    //   minorBg: "#ffffff",
    //   secondary: "#f8981c",
    //   tertiary: "#f47922",
    //   hover: "#f4792280",
    //   primary: "#fdb713",
    // },
  ];

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === null
      ? THEME[2]
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
