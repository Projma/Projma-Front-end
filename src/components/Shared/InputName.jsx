import * as React from "react";
import PerTextField from "./PerTextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  convertNumberToPersian,
  convertNumberToEnglish,
} from "../../utilities/helpers";
import useTheme from "../../hooks/useTheme";

const InputName = (props) => {
  const { theme, getColor } = useTheme();

  const muiTheme = createTheme({
    components: {
      // Name of the component
      MuiInput: {
        styleOverrides: {
          root: {
            fontSize: "2rem",
            color: getColor(theme.secondary),
            border: "0.2rem solid $mior-bg",
            borderRadius: "0.5rem",
            "&.Mui-focused": {
              // backgroundColor: "#121212",
              // color: "#000",
              border: "0.2rem solid $primary",
            },
          },
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
      },
    },
  });
  const [name, setName] = React.useState(convertNumberToPersian(props.name));
  // const [blur, setblur] = React.useState(false);
  const [underline, setUnderline] = React.useState(true);

  const handleChange = (event) => {
    setName(convertNumberToPersian(event.target.value));
  };

  const blurHandler = () => {
    if (name !== props.name) {
      props.onChangeName(convertNumberToPersian(name), props.gid);
    }
  };

  return (
    <PerTextField>
      <FormControl variant="standard" fullWidth>
        <ThemeProvider theme={muiTheme}>
          <Input
            multiline
            id="component-simple"
            value={convertNumberToPersian(name)}
            defaultValue={convertNumberToPersian}
            onChange={handleChange}
            onBlur={blurHandler}
            onFocus={() => {}}
            // onBlur={() => setUnderline(true)}
            disableUnderline={true}
          />
        </ThemeProvider>
      </FormControl>
    </PerTextField>
  );
};

export default InputName;
