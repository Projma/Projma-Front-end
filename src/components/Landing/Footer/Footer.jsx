import React from 'react'
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";
import "./Footer.css";
import Divider from '@mui/material/Divider';
const Footer = () => {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: "#91B9E3",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "10%",
                }}
            >
                <Box
                    sx={{
                        // marginRight: "20%",
                        // marginTop: "5%",
                        // marginLeft: "35%",
                        backgroundColor: "#91B9E3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5%",
                        flexBasis: "58%",
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            backgroundcolor: "rgb(255, 153, 0)",
                            // color: "rgb(255, 153, 0)",
                        }}
                    >
                        <h3 className='margin--5'>
                            <b>اجتماعی</b>
                        </h3>
                        <h4 className='margin--5'>
                            تلگرام
                        </h4>
                        <h4 className='margin--5'>
                            اینستاگرام
                        </h4>
                        <h4 className='margin--5'>
                            توییتر
                        </h4>
                        <h4 className='margin--5'>
                            لینکدین
                        </h4>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            // justifyItems: "start",
                            gridTemplateColumns: "1fr",
                            // backgroundColor: "rgb(240, 64, 149)",
                        }}
                    >
                        <h3 className='margin--5'>
                            تماس با ما
                        </h3>
                        <h4 className='margin--5'>
                            تلفن
                        </h4>
                        <h4 className='margin--5'>
                            آدرس
                        </h4>
                        <h4 className='margin--5'>
                            ایمیل
                        </h4>
                    </Box>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "1fr",
                            // backgroundColor: "rgb(0, 210, 210)",
                        }}
                    >
                        <h3 className='margin--5'>
                            درباره ما
                        </h3>
                        <h4 className='margin--5'>
                            خدمات
                        </h4>
                        <h4 className='margin--5'>
                            پشتیبانی
                        </h4>
                        <h4 className='margin--5'>
                            قیمت گذاری
                        </h4>
                    </Box>
                </Box>
                <Box
                    sx={{
                        // width: "35%",
                        flexBasis: "42%",
                        flexGrow: 1,
                        marginLeft: "5%",
                    }}>
                    <p>
                        با پروجما می‌توانید در یک محیط امن و آنلاین پروژه های مختلف خود را
                        به صورت تیمی و پویا مدیریت کنید.
                        همکاری تیمی بیشتر و ارتباطات موثر با استفاده از پروژما
                        امکان‌پذیر می‌شود.
                    </p>
                </Box>
            </Box>
            <Divider />
            <Box sx={{
                color: "#E2EDF8",
                backgroundColor: "#173A5E",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <p className='margin--top--bottom'>
                    All Rights Reserved © Projma.ir
                </p>
            </Box>
        </>
    )
}

export default Footer