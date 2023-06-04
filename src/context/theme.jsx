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
      minorBg: "#fff",
      secondary: "#d1d5db",
      tertiary: "#DFF6FF",
      hover: "#DFF6FF80",
      primary: "#00599c",
    },
    {
      name: "dark",
      mainBg: "#171717",
      minorBg: "#27272a",
      secondary: "#0c0a09",
      tertiary: "#eee",
      hover: "#eeeeee80",
      primary: "#3f3f46",
    },
    {
      name: "sky",
      mainBg: "#9BA4B5",
      minorBg: "#F1F6F9",
      secondary: "#394867",
      tertiary: "#526D82",
      hover: "#526D8280",
      primary: "#212A3E",
    },
    {
      name: "sun",
      mainBg: "#e5e5e5",
      minorBg: "#fff",
      secondary: "#f8981c",
      tertiary: "#f47922",
      hover: "#f4792280",
      primary: "#fdb713",
    },
  ];

  const [theme, setTheme] = useState(localStorage.getItem('theme') === null ?THEME[2] : THEME.find(t => t.name === localStorage.getItem('theme')));

  const changeTheme = (name) => {
    for(let x of THEME) {
      if(x.name === name) {
        document.documentElement.style.setProperty('--main-bg', x.mainBg);
        document.documentElement.style.setProperty('--minor-bg', x.minorBg);
        document.documentElement.style.setProperty('--secondary', x.secondary);
        document.documentElement.style.setProperty('--tertiary', x.tertiary);
        document.documentElement.style.setProperty('--hover', x.hover);
        document.documentElement.style.setProperty('--primary', x.primary);
        setTheme(x);
        localStorage.setItem('theme', x.name);
        break;
      }
    }
  };

  function getRGB(c) {
    return parseInt(c, 16) || c
  }
  
  function getsRGB(c) {
    return getRGB(c) / 255 <= 0.03928
      ? getRGB(c) / 255 / 12.92
      : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
  }
  
  function getLuminance(hexColor) {
    return (
      0.2126 * getsRGB(hexColor.substr(1, 2)) +
      0.7152 * getsRGB(hexColor.substr(3, 2)) +
      0.0722 * getsRGB(hexColor.substr(-2))
    )
  }
  
  function getContrast(f, b) {
    const L1 = getLuminance(f)
    const L2 = getLuminance(b)
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
  }
  
  function getColor(bgColor) {
    const whiteContrast = getContrast(bgColor, '#eee')
    const blackContrast = getContrast(bgColor, '#2b2f33')
    console.clear();
    console.log(bgColor);
    console.log(whiteContrast > blackContrast ? '#eee' : '#2b2f33');
    return whiteContrast > blackContrast ? '#eee' : '#2b2f33'
  }

  const projmaTheme = {
    theme,
    THEME,
    changeTheme,
    getColor
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
