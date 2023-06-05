import React from "react";
import { Box } from "@mui/system";
import "./Footer.scss";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid"; // Grid version 1
import useTheme from "../../../hooks/useTheme";
const Footer = () => {
  const {theme, getColor} = useTheme();
  return (
    <div style={{
      position: "relative",
      bottom: "0",
    }}>
      <Box
        sx={{
          color: getColor(theme.primary),
          backgroundColor: theme.primary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          // marginBottom: "2%",
        }}
      >
        <p className="margin--top--bottom">All Rights Reserved © Projma.ir</p>
      </Box>
    </div>
  );
};

export default Footer;
