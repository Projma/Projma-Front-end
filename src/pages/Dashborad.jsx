import React from "react";
// import Header from "../components/Dashboard/...";
import "../styles/Dashboard.scss";
import Grid from "@mui/material/Grid"; // Grid version 1
import Container from "@mui/material/Container";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import Header from "../components/Dashboard/Header/Header";
// import Footer from "../components/Landing/Footer/Footer";
import ResponsiveDrawer from "../components/Dashboard/ResponsiveDrawer/ResponsiveDrawer";
import BasicModal from "../components/Dashboard/Modal/BasicModal";
import Link from "@mui/material";
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import ContentPasteTwoToneIcon from '@mui/icons-material/ContentPasteTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import AvTimerTwoToneIcon from '@mui/icons-material/AvTimerTwoTone';
import WorkspacesTwoToneIcon from '@mui/icons-material/WorkspacesTwoTone';
import HomeRepairServiceTwoToneIcon from '@mui/icons-material/HomeRepairServiceTwoTone';
import Diversity2TwoToneIcon from '@mui/icons-material/Diversity2TwoTone';
import ViewDayTwoToneIcon from '@mui/icons-material/ViewDayTwoTone';
import MessageTwoToneIcon from '@mui/icons-material/MessageTwoTone';
import StarPurple500TwoToneIcon from '@mui/icons-material/StarPurple500TwoTone';
import DeveloperBoardTwoToneIcon from '@mui/icons-material/DeveloperBoardTwoTone';
import { useState } from "react";

// useMediaQuery
// import Typography from "@mui/material";
// rafce
export const Dashborad = () => {

    const tabs = {
        "boards": {
            title: "بورد ها",
            icon: <DashboardTwoToneIcon sx={{ml: 1.5}}/>,
            content: (
                <>
                    <p variant="h1" component="h2" className="text">
                        <AvTimerTwoToneIcon sx={{ml: 1.5}}/> اخیرا دیده شده
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        <Diversity2TwoToneIcon sx={{
                            // paddingLeft: "1%",
                            // minWidth: "35px",
                            ml: 1.5
                        }}/> فضا های کاری شما
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        <HomeRepairServiceTwoToneIcon sx={{ml: 1.5}}/> فضا های مهمان
                    </p>
                </>
            )
        },
        "templates": {
            title: "تمپلیت ها",
            icon: <ContentPasteTwoToneIcon sx={{ml: 1.5}}/>,
            content: (
                // <a className="option" href="#"><ContentPasteTwoToneIcon /> </a>
                <>
                    <p><ViewDayTwoToneIcon sx={{ml: 1.5}}/>تمپلیت های گوناگون </p>
                    <ul>
                        <li>مدیریت</li>
                        <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                        <li>تیمی</li>
                        <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                        <li>صنعتی</li>
                        <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                        <li>مالی</li>
                    </ul>
                </>
            )
        },
        "home": {
            title: "خانه",
            icon: <HomeTwoToneIcon sx={{ml: 1.5}}/>,
            content: (
                // <a className="option" href="#"><HomeTwoToneIcon /> </a>
                <>
                    <p variant="h1" component="h2" className="text">
                        <StarPurple500TwoToneIcon sx={{ml: 1.5}}/> برجسته ها
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        <DeveloperBoardTwoToneIcon sx={{ml: 1.5}}/> ساخت بورد جدید
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        <MessageTwoToneIcon sx={{ml: 1.5}}/> پیام ها
                    </p>
                </>
            )
        }
    }

    const [activeTab, setActiveTab] = useState('boards');

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Header />
            <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 3, sm: 8, md: 12 }}>
                <Grid item xs={1} sm={2} md={2}>
                    {/* <ResponsiveDrawer /> */}
                    <div className="text sidebar" >

                        {/* https://www.pluralsight.com/guides/handling-tabs-using-page-urls-and-react-router-doms */}
                        {
                            Object.entries(tabs).map((tab) => (
                                <a className={activeTab === tab[0] ? "option active" : "option"} href="#" onClick={() => {
                                    toggle(tab[0]);
                                }}
                                >{tab[1].icon} {tab[1].title}</a>
                                // br
                            ))
                        }
                        {/* https://www.npmjs.com/package/react-device-detect */}

                        <Divider sx={{ bgcolor: "white", marginTop: "5%" }} />
                        {/* <a className="option" href="#">فضای کار ها</a> */}
                        <p className="text" > <WorkspacesTwoToneIcon sx={{ml: 1.5}}/> فضای کار ها </p>

                        {/* <a id="create-workspace" className="option" href="#"> + </a> */}
                        {/* <a id="create-workspace" className="option" href="#"> <BasicModal /> </a> */}
                        <BasicModal />
                        {/* <p> <BasicModal /></p> */}
                        
                        <a className="option" href="#">فضای کار 1</a>
                        <a className="option" href="#">فضای کار 2</a>
                    </div>

                </Grid>
                <Grid item xs={2} sm={6} md={10}>
                    {/* <p variant="h1" component="h2" className="text">
                        <AvTimerTwoToneIcon /> اخیرا دیده شده
                    </p> */}
                    {/* <Grid></Grid> */}
                    {/* <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        <Diversity2TwoToneIcon /> فضا های کاری شما
                    </p> */}
                    {/* Grid */}
                    {/* <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        <HomeRepairServiceTwoToneIcon /> فضا های مهمان
                    </p> */}

                    {
                        Object.entries(tabs).map((tab) => (
                            <>
                                {activeTab === tab[0] && tab[1].content}

                            </>
                        ))
                    }
                </Grid>
            </Grid>
        </div>
    )
}
