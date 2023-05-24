import * as React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import useTheme from "../../hooks/useTheme";

const Loading = () => {
  const {theme} = useTheme();
  return (
    <Backdrop
        sx={{ color: theme.primary, zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
};

export default Loading;
