import React from "react";
import "./Discuss.scss";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { convertNumberToPersian, convertNumberToEnglish } from "../../../utilities/helpers.js";

const Discuss = () => {
    return (
        <div>

            <Container maxWidth="lg" sx={{ marginTop: "2rem" }}>
                <Grid container xs={12} md={12} lg={12} >
                    <Grid item xs={12} md={12} lg={12} 
                    // sx={{
                    //     display: "flex",
                    //     justifyContent: "center",
                    //     alignItems: "center",
                    // }}
                    >
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
                                {/* <img src={page_not_found} className="top-img" /> */}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

        </div>
    );
};

export default Discuss;