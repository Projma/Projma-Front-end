import { Helmet } from "react-helmet";
import "../styles/BoardInvitation.scss";
import { useEffect, useState } from "react";
import { useParams , useNavigate } from "react-router-dom";

import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import apiInstance from "../utilities/axiosConfig";
import Header from "../components/Header/Header";
import Footer from "../components/Landing/Footer/Footer";

const BoardInvitation = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [error, setError] = useState("");
    const [errorRes, setErrorRes] = useState("");
    const [result, setResult] = useState("");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        apiInstance
            .post(`workspaces/board/join-to-board/${params.token}/`)
            .then(() => {
                setResult(success);
                delay(4000).then(() => navigate(`/kanban/${params.id}/`));
            }).catch((error) => {
                if (error.response) {
                    if (error.response.data == "User is already a member of this board") {
                        navigate(`/kanban/${params.id}/`);
                    }
                    else {
                        setError(error.response.data);
                        setErrorRes(error.response.status);
                        setResult(failure);
                    }
                }
            });
    }, []);
    const success = (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1 style={{ fontSize: "5rem" }}>😄</h1>
            <h1 style={{ color: "#000", marginBottom: "1rem" }}>
                با موفقیت به بورد اضافه شدید!
            </h1>
            <p style={{ color: "#000", marginBottom: "1rem" }}>در حال انتقال به صفحه بورد</p>
            <Box sx={{ width: "100%", color: "#000" }}>
                <LinearProgress color="success" />
            </Box>
        </div>
    );
    const failure = (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <h1 style={{ fontSize: "5rem" }}>😔</h1>
            <h1 style={{ color: "#000", marginBottom: "1rem" }}>
                متاسفانه به بورد اضافه نشدید!
            </h1>
            <h2 style={{ color: "#000", marginBottom: "1rem" }}>
                لطفا دوباره تلاش کنید
            </h2>
        </div>
    );
    return (
        <div >
            <Helmet>
                <title>دعوت به بورد</title>
            </Helmet>
            <Header />

            <Box
                sx={{
                    backgroundColor: "white",
                    width: "70%",
                    margin: "auto",
                    padding: "10rem",
                    marginTop: "8%",
                    borderRadius: "2rem",
                }}
            >
                {result}
            </Box>


            <Footer />
        </div>
    );
};

export default BoardInvitation;