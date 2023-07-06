import React from "react";
import { Helmet } from "react-helmet";
import "../styles/NotFound.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Landing/Footer/Footer";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import page_not_found from "../static/images/not found/page_not_found.svg"
import { convertNumberToPersian, convertNumberToEnglish } from "../utilities/helpers";

const NotFound = () => {
    return (
        <div>
            <Helmet>
                <title>پروجما</title>
            </Helmet>
            <Header />

            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
                <Grid container xs={12} md={12} lg={12} >
                    <Grid item xs={12} md={12} lg={12} 
                    // sx={{
                    //     display: "flex",
                    // }}
                    >
                        <img src={page_not_found} className="top-img" />
                        <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{
                        // marginTop: "5%",
                    }}>
                        <Paper
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                height: 240,
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h1>صفحه مورد نظر یافت نشد</h1>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <h1>
                                {convertNumberToPersian("ارور 404")}
                                </h1>
                            </Box>
                            <Divider />
                            <Box sx={{ pt: 1 }}>
                                <p className="my_paragraph">
                                    صفحه مورد نظر شما یافت نشد. لطفا آدرس صفحه را
                                    بررسی کنید.
                                </p>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer
            />
        </div>
    );
};

export default NotFound;