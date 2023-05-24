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
      text: "#eee",
    },
    {
      name: "light",
      mainBg: "#e5e5e5",
      minorBg: "#fff",
      secondary: "#d1d5db",
      tertiary: "#DFF6FF",
      hover: "#DFF6FF80",
      primary: "#00599c",
      text: "#383e43",
    },
    {
      name: "dark",
      mainBg: "#171717",
      minorBg: "#27272a",
      secondary: "#0c0a09",
      tertiary: "##eee",
      hover: "#eeeeee80",
      primary: "#3f3f46",
      text: "#eee",
    },
    {
      name: "sky",
      mainBg: "#9BA4B5",
      minorBg: "#F1F6F9",
      secondary: "#394867",
      tertiary: "#526D82",
      hover: "#526D8280",
      primary: "#212A3E",
      text: "#999",
    },
  ];

  const [theme, setTheme] = useState(localStorage.getItem('theme') === null ?THEME[2] : THEME.find(t => t.name === localStorage.getItem('theme')));

  const changeTheme = (name) => {
    for(let x of THEME) {
      if(x.name === name) {
        setTheme(x);
        localStorage.setItem('theme', x.name);
        break;
      }
    }
  };

  const projmaTheme = {
    theme,
    THEME,
    changeTheme
  };

  return (
    <React.Fragment >
      <ThemeContext.Provider value={projmaTheme}>
        {children}
      </ThemeContext.Provider>
    </React.Fragment>
  );
}

export { ThemeProvider };
export default ThemeContext;
