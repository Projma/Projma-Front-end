// import React from 'react';
import * as React from "react";
import { Button } from "@mui/material";
import SendTwoToneIcon from "@mui/icons-material/SendTwoTone";
import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";
import ClearTwoToneIcon from "@mui/icons-material/ClearTwoTone";
// chart icon
import { AddchartTwoTone } from "@mui/icons-material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import StyledTextField from "../../Dashboard/StyledTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiInstance from "../../../utilities/axiosConfig";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { deepOrange, green } from "@mui/material/colors";
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./InfoChart.scss";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Loading from "../../Shared/Loading";
import {
    convertNumberToEnglish,
    convertNumberToPersian,
} from "../../../utilities/helpers.js";
// import React, { Component } from "react";
import Chart from "react-apexcharts";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    width: "70%",
    height: "78%",
    // bgcolor: 'background.paper',
    bgcolor: "#265D97", // #5090D3 #1E4976
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
    overflow: "auto",
    padding: "1%",
};

const InfoChart = (props) => {
    const [open, setOpen] = React.useState(false);
    const [isPost, setIsPost] = useState(false);
    const params = useParams();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    useEffect(() => {
        // apiInstance.get(`/workspaces/board/${params.id}/members/`).then((res) => {
        //     // apiInstance.get(`/workspaces/board/${2}/members/`).then((res) => {
        //     // //console.log(res.data);
        //     setMembers(res.data);
    }, []);

    const data = {
        options: {
            chart: {
                id: "basic-bar"
            },
            xaxis: {
                categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
            }
        },
        series: [
            {
                name: "series-1",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    };

    const data2 = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
    }


    return (
        <>
            {isPost ? <Loading /> : null}
            <Button
                variant="contained"
                // button-key="buttonAttribute"
                sx={{
                    // height: 54,
                    // width: 150,
                    // fontSize: "90%",
                    // width: "30%",
                    // height: "100%",
                    ml: "0.5rem",
                    mr: "1.3rem",
                    fontFamily: "Vazir",
                }}
                onClick={handleOpen}
            >
                <AddchartTwoTone sx={{
                    ml: 1.5,
                    color: "tomato"
                }} />
                اطلاعات نموداری
            </Button>
            <Modal
                aria-labelledby="spring-modal-title"
                // aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Button onClick={handleClose}>
                            {" "}
                            <ClearTwoToneIcon
                                sx={{
                                    color: "tomato",
                                    // margin: "1%"
                                    marginBottom: "9%",
                                    // ":dir": "ltr"
                                    // marginRight: "3800%",
                                }}
                            />{" "}
                        </Button>
                        <Typography
                            id="spring-modal-title"
                            variant="h5"
                            component="h2"
                            sx={{ color: "white", marginBottom: "2%", marginRight: "2%" }}
                        >
                            اطلاعات نموداری
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                // justifyContent: "space-between",
                                alignItems: "center",
                                // marginBottom: "0%",
                                // marginTop: "2%",
                                marginRight: "2%",
                                // marginLeft: "2%",
                            }}
                        >
                            <div className="app">
                                <div className="row">
                                    <div className="mixed-chart">
                                        <Chart
                                            options={data.options}
                                            series={data.series}
                                            type="bar"
                                            // type="line"
                                            width="500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="donut">
                                <Chart options={data2.options} series={data2.series} type="donut" width="380" />
                            </div>

                            <div id="chart">
                                <div id="timeline-chart"></div>
                            </div>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default InfoChart;

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
            width: 56,
            height: 56,
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
    // return {
    //     children: `${name.split(" ")[0][0].toUpperCase()}${name
    //         .split(" ")[1][0]
    //         .toUpperCase()}`,
    // };
}
