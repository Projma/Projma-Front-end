import * as React from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import tc from "../../Theme/theme";

const Loading = () => {
  return (
    <Backdrop
        sx={{ color: tc.primary, zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
};

export default Loading;
