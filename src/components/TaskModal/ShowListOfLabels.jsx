import React from "react";
import "./Labels.scss";
import EditIcon from "@mui/icons-material/Edit";
import useTheme from "../../hooks/useTheme";

const ShowListOfLabels = ({
  allLabels,
  change_label_checked,
  handleEditPage,
}) => {
  const {theme,getColor} = useTheme();
  return (
    <div>
      <ul className="tm_labels-ul" >
        {allLabels.map((label, idx) => (
          <li className="tm_labels-li">
            <div className="tm_labels-li-div">
              <input
                type="checkbox"
                id={label.id}
                className="tm_labels-li-div-input"
                checked={label.checked}
                onChange={(e) => {
                  change_label_checked(label.id);
                }}
              />
              <span className="tm_labels-li-div-span">
                <div
                  className="tm_labels-li-color-box"
                  style={{ backgroundColor: label.color + "55" }}
                >
                  <div
                    role="color_box"
                    className="tm_labels-labels-symbol"
                    style={{ backgroundColor: label.color }}
                  ></div>
                  <p className="tm_labels-labels-title" style={{ color: getColor(theme.minorBg) }}>{label.title}</p>
                </div>
                <EditIcon
                  className="tm_labels-labels-edit-icon"
                  onClick={() => handleEditPage(allLabels, label.id)}
                />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowListOfLabels;
