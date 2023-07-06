import React from "react";
import { useEffect } from "react";
// import WebSocket from "ws";

const RealTest = () => {
  // const socket = new WebSocket("");
  const socket = new WebSocket(
    `ws://localhost:8000/ws/socket-server/board/?token=${localStorage.getItem(
      "access_token"
    )}`
  );
  // socket.onopen = () => {
  //   console.log("WebSocket connection opened");
  // };
  useEffect(() => {
    // write a code for setting groups
    console.log("here");
    console.log(localStorage.getItem("access_token"));
  }, []);
  const handleClick = (e) => {
    console.log("eeeeeeeeeeeeeeeeeeeeee");
    socket.send("Hello World!");
  };
  return (
    <div>
      <button style={{ color: "" }} onClick={handleClick}>
        salamdasflkjadslfjkladsjf
      </button>
    </div>
  );
};

export default RealTest;
