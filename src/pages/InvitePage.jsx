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
        console.log(res.data);
      });
  }, []);

  return (
    <div
      style={{ backgroundColor: "white", width: "100%", height: "100%" }}
    ></div>
  );
};

export default InvitePage;
