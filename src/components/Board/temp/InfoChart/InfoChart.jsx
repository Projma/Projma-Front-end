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
import StyledTextField from "../../../Dashboard/StyledTextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import apiInstance from "../../../../utilities/axiosConfig";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
// import Tooltip as muiTooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { deepOrange, green } from "@mui/material/colors";
import LinkSharpIcon from "@mui/icons-material/LinkSharp";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./InfoChart.scss";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Loading from "../../../Shared/Loading";
import {
    convertNumberToEnglish,
    convertNumberToPersian,
} from "../../../../utilities/helpers.js";
// import React, { Component } from "react";
import Chart from "react-apexcharts";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: 400,
    width: "80%",
    height: "78%",
    // bgcolor: 'background.paper',
    bgcolor: "#CEE0F3", // #5090D3 #1E4976 #265D97 CEE0F3
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
    const [chartInfo, setChartInfo] = useState({});
    const [chart1_xaxis_label, setChart1_xaxis_label] = useState('');
    const [chart1_yaxis_label, setChart1_yaxis_label] = useState('');
    const [chart2_xaxis_label, setChart2_xaxis_label] = useState('');
    const [chart2_yaxis_label, setChart2_yaxis_label] = useState('');
    const [yaxis, setYaxis] = useState([]);
    const [data_chart1, setData_chart1] = useState([]);
    const [data2, setData2] = useState({});


    useEffect(() => {
        apiInstance.get(`/board/chart/${props.boardId}/board-members-activity/`).then((res) => {
            var chartLabel = res.data.chartlabel; // فعالیت اعضا
            var xLabel = res.data.xlabel; // فرد
            var yLabel = res.data.ylabel; // فعالیت
            var xData = res.data.xdata; // ['ali', 'mmd']
            var yData = res.data.ydata;
            var estimates = yData[0]["estimates"] // [0, 2.5]
            var dons = yData[1]["dons"] // [0, 2.5]
            var out_of_estimates = yData[2]["out_of_estimates"] // [0, 2.5]
            // console.log("****")
            // console.log(chartLabel)
            // console.log(xLabel)
            // console.log(yLabel)
            // console.log(xData)
            // console.log(yData)
            setChart1_xaxis_label(xLabel)
            setChart1_yaxis_label(yLabel)

            var tmp = []
            for (let index = 0; index < xData.length; index++) {
                const person = xData[index];
                const ets_time = estimates[index];
                const d_time = dons[index];
                const out_of_ets_t = out_of_estimates[index];
                var element = {
                    name: person,
                    "زمان تخمین زده شده": ets_time,
                    "زمان انجام شده": d_time,
                    "خارج از زمان تخمین": out_of_ets_t
                }
                tmp.push(element)
            }
            // console.log("****");
            // console.log(tmp);
            setData_chart1(tmp)
            // setChartInfo(res.data);


        }).catch((err) => {
            console.log(err);
        });

    }, []);

    useEffect(() => {
        apiInstance.get(`/board/chart/${props.boardId}/board-tasklists-activity/`).then((res) => {
            var chartLabel = res.data.chartlabel; // نتایج فعالیت ها
            var xLabel = res.data.xlabel; // لیست فعالیت ها
            var yLabel = res.data.ylabel; // فعالیت
            var xData = res.data.xdata; // [tasklist1, tasklist2]
            var yData = res.data.ydata;
            var estimates = yData[0]["estimates"] // [0, 2.5]
            var dons = yData[1]["dons"] // [0, 2.5]
            var out_of_estimates = yData[2]["out_of_estimates"] // [0, 2.5]
            // console.log("######")
            // console.log(chartLabel)
            // console.log(xLabel)
            // console.log(yLabel)
            // console.log(xData)
            // console.log(yData)
            // console.log(estimates)
            // console.log(dons)

            // setChartInfo(res.data);

            // var xaxix = [];
            // var yaxix = [];
            // res.data.xdata.map((item) => {
            //     xaxix.push(item[0] ? item[0] : "بدون نام کاربری");
            // });
            // setXaxis(xaxix);
            // res.data.ydata.map((item) => {
            //     yaxix.push(item[0]);
            // });


        }).catch((err) => {
            console.log("#####")
            console.log(err);
        });

    }, []);


    // useEffect(() => {
    //     apiInstance.get(`/board/chart/${1}/board-members-activity/`).then((res) => {
    //         chartLabel = res.data.chartlable;
    //         xLabel = res.data.xlabel;
    //         yLabel = res.data.ylabel;
    //         xData = res.data.xdata;
    //         yData = res.data.ydata;

    //         // setChartInfo(res.data);

    //         // var xaxix = [];
    //         // var yaxix = [];
    //         // res.data.xdata.map((item) => {
    //         //     xaxix.push(item[0] ? item[0] : "بدون نام کاربری");
    //         // });
    //         // setXaxis(xaxix);
    //         // res.data.ydata.map((item) => {
    //         //     yaxix.push(item[0]);
    //         // });
    //         // setYaxis(yaxix);
    //         // setData2({
    //         //     options: {},
    //         //     series: yaxix,
    //         //     // labels: ['A', 'B', 'C', 'D', 'E']
    //         //     labels: xaxix
    //         // });


    //         // setData({
    //         //     options: {
    //         //         chart: {
    //         //             id: "basic-bar",
    //         //         },
    //         //         xaxis: {
    //         //             // categories: xaxis,
    //         //             categories: xaxix,
    //         //         },
    //         //         style: {
    //         //             fontFamily: "Vazir",
    //         //         },
    //         //     },
    //         //     series: [
    //         //         {
    //         //             // name: "series-1",
    //         //             name: chartInfo.ylabel,
    //         //             // data: [30, 40, 45, 50, 49, 60, 70, 91]
    //         //             // data: chartInfo.ydata
    //         //             // data: yaxis
    //         //             // data: [
    //         //             //     1,
    //         //             //     0,
    //         //             //     1,
    //         //             //     2,
    //         //             //     3
    //         //             //   ]
    //         //             data: yaxix
    //         //         }
    //         //     ]
    //         // })


    //     }).catch((err) => {
    //         console.log(err);
    //     });

    // }, []);


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
                    // color: "black",
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
                            sx={{ color: "black", marginBottom: "2%", marginRight: "2%" }}
                        >
                            اطلاعات نموداری
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                                alignItems: "center",
                                // marginBottom: "0%",
                                // marginTop: "2%",
                                marginRight: "2%",
                                // marginLeft: "2%",
                                // backgroundColor: "white",
                                color: "black",
                            }}
                        >
                            {/* <div className="chart" dir="ltr">
                                <div className="timeline-chart">
                                    <Chart
                                        options={data.options}
                                        series={data.series}
                                        type="bar"
                                        // type="line"
                                        width="500"
                                    // width="100%"
                                    />
                                </div>
                            </div> */}
                            <BarChart
                                width={900}
                                height={500}
                                // bgColor={"black"}
                                data={data_chart1}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                // label={"renderLabel"}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#000000"
                                    // fill="#000000"
                                />
                                <XAxis dataKey="name" label={chart1_xaxis_label} dy={13} />
                                <YAxis label={chart1_yaxis_label} />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="زمان تخمین زده شده" fill="#8884d8" />
                                <Bar dataKey="زمان انجام شده" fill="#82ca9d" />
                                <Bar dataKey="خارج از زمان تخمین" fill="#ffc658" />
                            </BarChart>
                        </Box>
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
                                // backgroundColor: "white",
                                color: "black",
                            }}
                        >
                            {/* <div className="chart donut" dir="ltr">
                                <div className="timeline-chart">
                                    <Chart options={data2.options} series={data2.series} type="donut" width="380" />
                                </div>
                            </div> */}

                        </Box>
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
                                // backgroundColor: "white",
                                // right to left
                                // ":dir": "ltr"
                                color: "black",
                            }}

                        >
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};

export default InfoChart;

function generateDayWiseTimeSeries(s, count) {
    var values = [
        [
            4, 3, 10, 9, 29, 19, 25, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5
        ],
        [
            2, 3, 8, 7, 22, 16, 23, 7, 11, 5, 12, 5, 10, 4, 15, 2, 6, 2
        ]
    ];
    var i = 0;
    var series = [];
    var x = new Date("11 Nov 2012").getTime();
    while (i < count) {
        series.push([x, values[s][i]]);
        x += 86400000;
        i++;
    }
    return series;
}
