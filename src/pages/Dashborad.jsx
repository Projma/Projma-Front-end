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
import Link from "@mui/material";
// import Typography from "@mui/material";
// rafce
export const Dashborad = () => {
    return (
        <div>
            <Header />
            <Grid container spacing={{ xs: 0, md: 0 }} columns={{ xs: 4, sm: 7, md: 12 }}>
                <Grid item xs={2} sm={1} md={2}>
                    {/* <ResponsiveDrawer /> */}
                    <div className="text sidebar" >
                        <a className="option active" href="#">بورد ها</a>
                        <br />
                        <a className="option" href="#">تمپلیت ها</a>
                        <br />
                        <a className="option" href="#">خانه</a>
                        <br />
                        <Divider sx={{ bgcolor: "white", marginTop: "5%" }} />
                        {/* <a className="option" href="#">فضای کار ها</a> */}
                        <p className="text"> فضای کار ها </p> 
                        {/* <p className="create-workspace"> + </p> */}
                        <a id="create-workspace" className="option" href="#"> + </a>
                        <a className="option" href="#">فضای کار 1</a>
                        <a className="option" href="#">فضای کار 2</a>
                    </div>

                </Grid>
                <Grid item xs={2} sm={6} md={10}>
                    <p variant="h1" component="h2" className="text">
                        اخیرا دیده شده
                    </p>
                    {/* <Grid></Grid> */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        فضا های کاری شما
                    </p>
                    {/* Grid */}
                    <Divider sx={{ bgcolor: "#007fff", marginTop: "5%" }} />
                    <p variant="h1" component="h2" className="text">
                        فضا های مهمان
                    </p>
                </Grid>
            </Grid>
        </div>
    )
}
