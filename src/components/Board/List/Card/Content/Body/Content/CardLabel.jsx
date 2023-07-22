import * as React from "react";
import "./CardLabel.scss";
import useTheme from "../../../../../../../hooks/useTheme";

function getBestTextColor(parentBackgroundColor, childBackgroundColor) {
  const parentHex = parentBackgroundColor.replace("#", "");
  const parentR = parseInt(parentHex.substring(0, 2), 16);
  const parentG = parseInt(parentHex.substring(2, 4), 16);
  const parentB = parseInt(parentHex.substring(4, 6), 16);

  const childHex = childBackgroundColor.substring(0, 7).replace("#", "");
  const childAlpha = parseInt(childBackgroundColor.substring(7), 16) / 255;
  const childR = parseInt(childHex.substring(0, 2), 16);
  const childG = parseInt(childHex.substring(2, 4), 16);
  const childB = parseInt(childHex.substring(4, 6), 16);

  const r = Math.round((1 - childAlpha) * parentR + childAlpha * childR);
  const g = Math.round((1 - childAlpha) * parentG + childAlpha * childG);
  const b = Math.round((1 - childAlpha) * parentB + childAlpha * childB);

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? "#2b2f33" : "#eee";
}

const CardLabel = ({ label }) => {
  const { theme, getColor } = useTheme();
  return (
    <>
      {label !== undefined && (
        <div className="card-item_label">
          {label.map((l) => (
            <div
              className="card-item_label-container"
              style={{
                backgroundColor: l.color + "88",
                color: getBestTextColor(theme.minorBg, l.color + "88"),
              }}
            >
              <div
                className="card-item_label-color-ball"
                style={{ backgroundColor: l.color }}
              ></div>
              <p
                className="card-item_label-name"
                style={{
                  color: getBestTextColor(theme.minorBg, l.color + "88"),
                }}
              >
                {l.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default CardLabel;
