import * as React from "react";
import "./CardLabel.scss";

const CardLabel = ({ label }) => {
  return (
    <>
      {label !== undefined && (
        <div className="card-item_label">
          {label.map((l) => (
            <div
              className="card-item_label-container"
              style={{
                backgroundColor:
                  l.color === "#ffffff" ||
                  l.color === "#000000" ||
                  l.color === "#fff" ||
                  l.color === "#000"
                    ? "#66666644"
                    : l.color + "66",
              }}
            >
                <div
                  className="card-item_label-color-ball"
                  style={{ backgroundColor: l.color }}
                ></div>
                <p className="card-item_label-name">{l.title}</p>
              </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardLabel;
