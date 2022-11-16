import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./BasicModal.scss";
import scrum_board from "../../../static/images/dashboard/scrum_board.svg";
import Grid from "@mui/material/Grid"; // Grid version 1
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "../StyledTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { redirect } from "react-router-dom";
import { AddBox } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";
import conversation from "../../../static/images/landing/conversation.svg";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    width: "70%",
    height: "78%",
    // bgcolor: 'background.paper',
    bgcolor: '#265D97', // #5090D3 #1E4976
    border: '2px solid #000',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
    fontFamily: "Vazir",
    // overflow: 'hidden', scroll
    overflow: 'auto',
};

const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
});


export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    let width = window.innerWidth;
    let isMatch = width > 900 ? true : false;
    // const config = isMatch
    //     ? {
    //         background: "#076585" /* fallback for old browsers */,
    //         background: "-webkit-linear-gradient(to left, #076585, #fff)",
    //         background: "linear-gradient(to left, #076585, #fff)",
    //     }
    //     : {
    //         background: "#076585" /* fallback for old browsers */,
    //         background: "-webkit-linear-gradient(to top, #076585, #fff)",
    //         background: "linear-gradient(to top, #076585, #fff)",
    //     };
    // const matches = useMediaQuery("(max-width:900px)");


    return (
        <div style={{
            // hover: {
            //     color: '#E2EDF8',
            //     backgroundColor: '#007fff',
            //     borderRadius: '5px',
            // },
        }}>
            <Button onClick={handleOpen} sx={{
                color: '#00bfff',
                ":hover": {
                    color: '#E2EDF8',
                    backgroundColor: '#007fff',
                    borderRadius: '5px',
                },
                marginTop: '8%',
                padding: '5%',

                fontFamily: 'Vazir',
                textDecoration: 'none',
                display: 'block',
                transition: '0.3s',
                display: 'flex',
                alignItems: 'center',
            }}>+</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container columns={{ xs: 3, sm: 3, md: 6 }} >
                        <Grid item xs={3} sm={3} md={3}>

                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{
                                fontFamily: 'Vazir',
                                color: 'black', // #0A1929
                            }}>
                                بیا فضای کاری مونو بسازیم
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily: 'Vazir', color: '#E2EDF8' }}>
                                بهره وری خود را با آسان کردن دسترسی همه به بوردها در یک مکان افزایش دهید.
                            </Typography>

                            <Box
                                sx={{
                                    // padding: "10%",
                                }}
                            >
                                <CacheProvider value={cacheRtl}>
                                    <ThemeProvider theme={theme}>
                                        <StyledTextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="نام فضای‌کار"
                                            placeholder="نام فضای‌کار خود را وارد کنید."
                                            helperText="این نام شرکت، تیم یا سازمان شما است."
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            sx={{ width: "60%", display: "block" }}
                                            InputLabelProps={{ style: { fontFamily: "Vazir" } }}
                                            InputProps={{ style: { fontFamily: "Vazir" } }}
                                            FormHelperTextProps={{ style: { fontFamily: "Vazir", color: "black" } }}
                                        />
                                    </ThemeProvider>
                                </CacheProvider>
                                <Button
                                    variant="contained"
                                    // button-key="buttonAttribute"
                                    // onClick={this.isClicked}
                                    sx={{
                                        // height: 54,
                                        // width: 150,
                                        fontSize: "90%",
                                        width: "30%",
                                        height: "100%",
                                        fontFamily: "Vazir",
                                        backgroundColor: "#0A1929", // #132F4C
                                    }}
                                >
                                    {" "}
                                    ادامه
                                </Button>
                            </Box>
                            {/* نوع فضای کاری خود را انتخاب کنید */}
                            {/* توصیف فضای کاری خود را وارد کنید (دلخواه) */}
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            justifyItems : 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                            // paddingTop: isMatch ? '11%' : '0%',
                            paddingTop: "11%",
                        }}>
                            <img src={scrum_board} className="responsive--height top-img" />
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}