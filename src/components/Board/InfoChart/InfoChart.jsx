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
    width: "80%",
    height: "78%",
    // bgcolor: 'background.paper',
    bgcolor: "#CEE0F3", // #5090D3 #1E4976 #265D97
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
    useEffect(() => {
        apiInstance.get(`/workspaces/chart/board-members-assign-tasks/${props.boardId}/`).then((res) => {
            // apiInstance.get(`/workspaces/board/${2}/members/`).then((res) => {
            // //console.log(res.data);
            setChartInfo(res.data);
            // {
            //     "chartlabel": "تعداد کار واگذار شده به هر فرد",
            //     "xlabel": "فرد",
            //     "ylabel": "تعداد",
            //     "xdata": [
            //       [
            //         "superuser",
            //         "تمام کار ها"
            //       ]
            //     ],
            //     "ydata": [
            //       [
            //         0,
            //         0
            //       ]
            //     ]
            //   }
        }).catch((err) => {
            //console.log(err);
        });

        // apiInstance.get(`/workspaces/chart/my-assign-tasks-for-all-boards${user_id}/`).then((res) => {
        //     // apiInstance.get(`/workspaces/board/${2}/members/`).then((res) => {
        //     // //console.log(res.data);
        //     setMembers(res.data);
        // {
        //     "chartlabel": "تعداد فعالیت من برای هر برد",
        //     "xlabel": "برد",
        //     "ylabel": "تعداد",
        //     "xdata": [],
        //     "ydata": []
        //   }
        // }).catch((err) => {
        //     //console.log(err);
        // });

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

    const data3 = {
        options: {
            chart: {
                type: "area",
                height: 300,
                foreColor: "#999",
                stacked: true,
                dropShadow: {
                    enabled: true,
                    enabledSeries: [0],
                    top: -2,
                    left: 2,
                    blur: 5,
                    opacity: 0.06
                }
            },
            colors: ['#00E396', '#0090FF'],
            stroke: {
                curve: "smooth",
                width: 3
            },
            dataLabels: {
                enabled: false
            },
            series: [{
                name: 'Total Views',
                data: generateDayWiseTimeSeries(0, 18)
            }, {
                name: 'Unique Views',
                data: generateDayWiseTimeSeries(1, 18)
            }],
            markers: {
                size: 0,
                strokeColor: "#fff",
                strokeWidth: 3,
                strokeOpacity: 1,
                fillOpacity: 1,
                hover: {
                    size: 6
                }
            },
            xaxis: {
                type: "datetime",
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                labels: {
                    offsetX: 14,
                    offsetY: -5
                },
                tooltip: {
                    enabled: true
                }
            },
            grid: {
                padding: {
                    left: -5,
                    right: 5
                }
            },
            tooltip: {
                x: {
                    format: "dd MMM yyyy"
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'left'
            },
            fill: {
                type: "solid",
                fillOpacity: 0.7
            }
        },
        series: [{
            name: 'Total Views',
            data: generateDayWiseTimeSeries(0, 18)
        }, {
            name: 'Unique Views',
            data: generateDayWiseTimeSeries(1, 18)
        }]
    };

    var data3_options = {
        chart: {
            type: "area",
            height: 300,
            foreColor: "#999",
            stacked: true,
            dropShadow: {
                enabled: true,
                enabledSeries: [0],
                top: -2,
                left: 2,
                blur: 5,
                opacity: 0.06
            }
        },
        colors: ['#00E396', '#0090FF'],
        stroke: {
            curve: "smooth",
            width: 3
        },
        dataLabels: {
            enabled: false
        },
        series: [{
            name: 'Total Views',
            data: generateDayWiseTimeSeries(0, 18)
        }, {
            name: 'Unique Views',
            data: generateDayWiseTimeSeries(1, 18)
        }],
        markers: {
            size: 0,
            strokeColor: "#fff",
            strokeWidth: 3,
            strokeOpacity: 1,
            fillOpacity: 1,
            hover: {
                size: 6
            }
        },
        xaxis: {
            type: "datetime",
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            }
        },
        yaxis: {
            labels: {
                offsetX: 14,
                offsetY: -5
            },
            tooltip: {
                enabled: true
            }
        },
        grid: {
            padding: {
                left: -5,
                right: 5
            }
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy"
            },
        },
        legend: {
            position: 'top',
            horizontalAlign: 'left'
        },
        fill: {
            type: "solid",
            fillOpacity: 0.7
        }
    };


    return (
        <>
            <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
            <script src="https://cdn.jsdelivr.net/npm/react-apexcharts"></script>
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
                                // justifyContent: "space-between",
                                alignItems: "center",
                                // marginBottom: "0%",
                                // marginTop: "2%",
                                marginRight: "2%",
                                // marginLeft: "2%",
                                // backgroundColor: "white",
                            }}
                        >
                            <div className="chart" dir="ltr">
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
                            </div>
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
                            }}
                        >
                            <div className="chart donut" dir="ltr">
                                <div className="timeline-chart">
                                    <Chart options={data2.options} series={data2.series} type="donut" width="380" />
                                </div>
                            </div>

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
                            }}

                        >
                            <div className="chart" dir="ltr">
                                <div className="timeline-chart">
                                    <Chart
                                        options={data3.options}
                                        series={data3.series}
                                        type="area"
                                        width="500"
                                    />
                                </div>
                            </div>
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
