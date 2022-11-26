import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiInstance from "../utilities/axiosConfig";

const InvitePage = () => {
  const params = useParams();
  useEffect(() => {
    console.log(params.token);
    apiInstance
      .get(`workspaces/workspaces/join-to-workspace/${params.token}/`)
      .then((res) => {
        if (res.status === 200) {
          setResult(success);
        } else {
          // setError(res.data);
          setResult(failure);
          console.log("in else");
        }
        if (res.status === 400) {
          console.log("here");
        }
        console.log(res);
        console.log(res.data);
      });
  }, []);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const success = (
    <div>
      <h1 style={{ color: "#fff" }}>Success</h1>
    </div>
  );
  const failure = (
    <div>
      <h1 style={{ color: "#fff" }}>Failure</h1>
    </div>
  );
  return (
    <div style={{ backgroundColor: "white", width: "100%", height: "100%" }}>
      {result}
    </div>
  );
};

export default InvitePage;
