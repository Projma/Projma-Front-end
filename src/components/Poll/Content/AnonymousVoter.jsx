import {Typography} from "@mui/material";
import React from "react";
import useTheme from '../../../hooks/useTheme';

const AnonymousVoter = () => {
  const {theme, getColor} = useTheme();

  return ( <>
    <Typography fontSize="1.1rem" style={{color: getColor(theme.minorBg)}}>رای گیری ناشناس</Typography>
  </> );
}
 
export default AnonymousVoter;