import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import apiInstance from "../utilities/axiosConfig";

const InvitePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [error, setError] = useState("");
  const [errorRes, setErrorRes] = useState("");
  const [result, setResult] = useState("");
  const [progress, setProgress] = useState(0);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  useEffect(() => {
    ////console.log(params.token);
    try {
      apiInstance
        .get(`workspaces/join-to-workspace/${params.token}/`)
        .then((res) => {
          ////console.log("there");
          ////console.log(res.data);
          setResult(success);
          delay(4000).then(() => navigate("/dashboard"));
        });
    } catch (error) {
      ////console.log("here");
      if (error.response) {
        ////console.log(error.response.data);
        ////console.log(error.response.status);
        ////console.log(error.response.headers);
        setError(error.response.data);
        setErrorRes(error.response.status);
        setResult(failure);
      }
    }
  }, []);
  const success = (
    <div className="invite_page-success invite_page-main-div">
      <h1 style={{ fontSize: "5rem" }}>😄</h1>
      <h1 style={{ color: "#fff", marginBottom: "1rem" }}>
        با موفقیت به فضای کار اضافه شدید!
      </h1>
      <p style={{ marginBottom: "1rem" }}>در حال انتقال به صفحه داشبورد</p>
      <Box sx={{ width: "100%", color: "#fff" }}>
        <LinearProgress color="success" />
      </Box>
    </div>
  );
  const failure = (
    <div className="invite_page-failure invite_page-main-div">
      <h1 style={{ fontSize: "5rem" }}>😔</h1>
      <h1 style={{ color: "#fff", marginBottom: "1rem" }}>
        متاسفانه به فضای کار اضافه نشدید!
      </h1>
      <h2 style={{ color: "#000", marginBottom: "1rem" }}> متن خطا:</h2>
      <h3 style={{ color: "#fff", fontFamily: "sans-serif" }}>{error}</h3>
    </div>
  );
  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      {result}
    </div>
  );
};

export default InvitePage;
