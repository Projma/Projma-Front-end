import * as React from "react";
import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import useTheme from "../../hooks/useTheme";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const PerTextField = (props) => {
  const { theme, getColor } = useTheme();
  const STF = styled(TextField)({
    "& label": {
      color: getColor(theme.minorBg)
    },
    "&:hover label": {
      fontWeight: 500
    },
    "& label.Mui-focused": {
      color: getColor(theme.minorBg)
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.primary
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.primary,
        borderWidth: 2
      },
      "&:hover fieldset": {
        borderColor: theme.primary,
        borderWidth: 3
      },
      "&.Mui-focused fieldset": {
        borderWidth: 2,
        borderColor: theme.primary
      },
      "& input::placeholder": {  
        color: getColor(theme.minorBg),  
        opacity: 0.6, 
      },
      color: getColor(theme.minorBg)
    },
    "& .MuiFilledInput-root": {
      "& fieldset": {
        borderColor: theme.primary,
        borderWidth: 2
      },
      "&:hover fieldset": {
        borderColor: theme.primary,
        borderWidth: 3
      },
      "&.Mui-focused fieldset": {
        borderWidth: 2,
        borderColor: theme.primary
      },
      "& input::placeholder": {  
        color: getColor(theme.minorBg),  
        opacity: 0.6, 
      },
      color: getColor(theme.secondary),
      backgroundColor: theme.secondary,
        }
  });
  return (
    <CacheProvider value={cacheRtl}>
        <STF {...props} />
    </CacheProvider>
  );
};

export default PerTextField;
