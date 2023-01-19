import * as React from 'react';
import PerTextField from '../../Shared/PerTextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { convertNumberToPersian } from '../../../utilities/helpers.js';

const themeEnable = createTheme({
  components: {
    // Name of the component
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: '1.8rem',
          color: '#fff',
          borderBottom: '0.2rem solid var(--mui-blue)',
          // borderRadius: '0.5rem',
          // "&.Mui-focused": {
          //   // backgroundColor: "#121212",
          //   // color: "#000",
          // },
        },
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

const themeDisable = createTheme({
  components: {
    // Name of the component
    MuiInput: {
      styleOverrides: {
        root: {
          fontSize: '1.8rem',
          color: '#fff',
          borderBottom: '0.2rem solid var(--main-item-color)',
          // borderRadius: '0.5rem',
          // cursor: "pointer"
          // "&.Mui-focused": {
          //   // backgroundColor: "#121212",
          //   // color: "#000",
          // },
        },
        // The props to change the default for.
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
});

const CardTitle = (props) => {
  // const [enable, setEnable] = useState(props.enable);
  const [name, setName] = React.useState(props.title);
  // const [blur, setblur] = React.useState(false);
  const [underline, setUnderline] = React.useState(true);
  useEffect(() => {setName(props.title)},[props])
  const handleChange = (event) => {
    setName(convertNumberToPersian(event.target.value));
  };

  const blurHandler = (props) => {
    if (name !== props.title) {
      // props.onChangeName(name);
    }
    console.log('blur');
    // props.onBlurHandler();
    // setEnable(false);
  };

  return (
    <PerTextField>
      <FormControl variant="standard" fullWidth>
        <ThemeProvider theme={props.enable ? themeEnable : themeDisable}>
          <Input
            multiline
            id="component-simple"
            fullWidth
            autoFocus={true}
            value={name}
            defaultValue={name}
            disabled={!props.enable}
            onChange={handleChange}
            onBlur={blurHandler}
            onClick={() => {
            }}
            // onBlur={() => setUnderline(true)}
            disableUnderline={true}
            sx={{
              '& .MuiInputBase-input.Mui-disabled': {
                WebkitTextFillColor: '#fff',
              }
            }}
            // border: "0.2rem solid var(--mui-blue)",
          />
        </ThemeProvider>
      </FormControl>
    </PerTextField>
  );
};

export default CardTitle;
