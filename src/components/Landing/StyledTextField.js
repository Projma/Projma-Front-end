import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#000",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#ff4000	",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#000",
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: "#66B2FF",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "#66B2FF",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "#000",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "#000",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "#000",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#000",
  },
});

export default StyledTextField;
