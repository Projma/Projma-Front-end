import { Helmet } from "react-helmet";
import "../styles/BoardInvitation.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import apiInstance from "../utilities/axiosConfig";

const BoardInvitation = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [error, setError] = useState("");
    const [errorRes, setErrorRes] = useState("");
    const [result, setResult] = useState("");
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    useEffect(() => {
        var workspace_id = 1;
        // find workspace id for this board
        apiInstance
            .get("/workspaces/dashboard/myboards/")
            .then((response) => {
                ////console.log(response.data);

                // array of
                // {
                //     "id": 5,
                //     "name": "فرزان رحمانی",
                //     "description": "تست",
                //     "background_pic": null,
                //     "workspace": 4,
                //     "admins": [
                //         11
                //     ],
                //     "created_at": "2022-12-01T09:10:30.165930Z",
                //     "updated_at": "2022-12-01",
                //     "members": [
                //         5,
                //         11
                //     ],
                //     "tasklists": [
                //         2
                //     ],
                //     "labels": []
                // }
                // setBoards(response.data);

                // find workspace id for this board
                response.data.forEach((board) => {
                    if (board.id == params.id) {
                        workspace_id = board.workspace;
                    }
                }
                )
            })


        apiInstance
            .post(`board/join-to-board/${params.token}/`)
            .then(() => {
                setResult(success);
                delay(4000).then(() => navigate(`/workspace/${workspace_id}/kanban/${params.id}/board`));
            }).catch((error) => {
                if (error.response) {
                    if (error.response.data == "User is already a member of this board") {
                        navigate(`/workspace/${workspace_id}/kanban/${params.id}/board`);
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


        </div>
    );
};

export default BoardInvitation;