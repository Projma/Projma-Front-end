import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

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
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "#fff",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#66B2FF",
  },
});

export default StyledTextField;