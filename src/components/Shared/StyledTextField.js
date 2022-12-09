import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import { filledInputClasses } from "@mui/material";

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#66B2FF",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#66B2FF",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#66B2FF",
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: "#66B2FF",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "#66B2FF",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "#fff",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "#fff",
    fontSize: "1.4rem",
  },
  [`& .${inputLabelClasses.filled}`]: {
    color: "#fff",
    fontSize: "1.4rem",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "#fff",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#66B2FF",
  },
  [`& .${inputLabelClasses.filled}.${inputLabelClasses.focused}`]: {
    color: "#fff",
    fontSize: "1.5rem",
  },
  [`& .${filledInputClasses.root}.${filledInputClasses.focused} .${filledInputClasses.input}`]:
    {
      color: "#fff",
      fontSize: "1.6rem",
    },
  [`& .${filledInputClasses.root} .${filledInputClasses.input}`]:
    {
      color: "#fff",
      fontSize: "1.2rem",
    },
});

export default StyledTextField;
