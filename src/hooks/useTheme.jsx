import { useContext } from "react";
import ThemeContext from "../context/theme";

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;
