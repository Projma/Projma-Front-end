// InitialIcon.js
import React from "react";

const InitialIcon = ({ initials }) => {
  return (
    <div
      data-testid="initial-icon"
      className="flex-row"
      style={{
        backgroundColor: initials.color + "55",
        alignItems: "center",
        justifyContent: "start",
        width: 90,
        height: 30,
        borderRadius: 30,
      }}
    >
      <div
        style={{
          backgroundColor: initials.color,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 30,
          marginRight: "8%",
          width: 17,
          height: 17,
          marginLeft: 7,
        }}
      ></div>
      <div
        style={{
          display: "flex",
          color: "white",
          fontSize: 13,
          width: "50",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "auto",
          paddingTop: 2,
          paddingRight: -10,
        }}
      >
        {initials.title}
      </div>
    </div>
  );
};

export default InitialIcon;
