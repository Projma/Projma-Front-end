import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { filledInputClasses } from "@mui/material";
import useTheme from "../../hooks/useTheme";

const primary = () => {
  const { theme } = useTheme();
  return theme.primary;
};

const text = () => {
  const { theme, getColor } = useTheme();
  return getColor(theme.minorBg);
};

const getStyles = () => ({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: primary(),
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: primary(),
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: primary(),
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: primary(),
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: primary(),
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: text(),
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: text(),
    fontSize: "1.4rem",
  },
  [`& .${inputLabelClasses.filled}`]: {
    color: text(),
    fontSize: "1.4rem",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: text(),
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: primary(),
  },
  [`& .${inputLabelClasses.filled}.${inputLabelClasses.focused}`]: {
    color: text(),
    fontSize: "1.2rem",
  },
  [`& .${filledInputClasses.root}.${filledInputClasses.focused} .${filledInputClasses.input}`]:
    {
      color: text(),
      fontSize: "1rem",
    },
  [`& .${filledInputClasses.root} .${filledInputClasses.input}`]: {
    color: text(),
    fontSize: "1.2rem",
  },
});

const StyledTextField = styled(TextField)(getStyles);

export default StyledTextField;