import * as React from "react";
import "./CardLabel.scss";
import useTheme from "../../../../../../../hooks/useTheme";

const CardLabel = ({ label }) => {
  const {theme , getColor} = useTheme();
  return (
    <>
      {label !== undefined && (
        <div className="card-item_label" >
          {label.map((l) => (
            <div
              className="card-item_label-container"
              style={{
                backgroundColor: l.color + "88",
                color: getColor(l.color)
              }}
            >
                <div
                  className="card-item_label-color-ball"
                  style={{ backgroundColor: l.color }}
                ></div>
                <p className="card-item_label-name" style={{color: getColor(l.color)}}>{l.title}</p>
              </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardLabel;
