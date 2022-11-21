import TextField from "@mui/material/TextField";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "#66B2FF",
    fontSize: "14px",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#66B2FF",
      fontSize: "14px",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "#66B2FF",
      fontSize: "14px",
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: "#fff",
    fontSize: "14px",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "#fff",
    fontSize: "14px",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "#fff",
      fontSize: "14px",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "#fff",
    fontSize: "14px",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "#fff",
    fontSize: "14px",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "#66B2FF",
    fontSize: "14px",
  },
});

export default StyledTextField;