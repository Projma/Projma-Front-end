import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "./StyledTextField";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ForgetPassword = () => {
  document.body.style.backgroundColor = "#0A1929";
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          maxWidth: 500,
          maxHeight: 300,
          marginTop: 30,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          border: "1px solid none",
          borderRadius: 3,
          // backgroundColor: "#001E3C",
          opacity: 1,
          backgroundImage: "linear-gradient(to right bottom, #001E3C 0%, #0059B2 130%)",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{
            margin: 0,
            mt: 3,
            mb: 3,
            mr: 3,
            ml: 3,
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5" color="#fff" sx={{ mb: 1 }}>
            فراموشی رمز عبور
          </Typography>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="آدرس ایمیل"
                placeholder="آدرس ایمیل خود را وارد کنید"
                name="email"
                autoComplete="email"
                autoFocus
                sx={{
                  input: {
                    color: "#fff",
                  },
                }}
              />
            </ThemeProvider>
          </CacheProvider>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2,  backgroundColor: "#66B2FF" }}
          >
            تغییر رمز عبور
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
