import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import "./BoardView.css";

const BoardView = (props) => {
  const [hover, setHover] = useState(false);
  const [isStarred, setIsStarred] = useState(props.is);
  const clickHandler = () => {
    const flag = !isStarred;
    const id = props.id;
    setIsStarred(flag);
    console.log(flag);
    const data = {id:id, is:flag};
    props.onStarred(data);
  };

  return (
    <div className="workspace--board-view">
      <button
        className="workspace--view"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p className="workspace--board-title">{props.name}</p>
      </button>
      {isStarred ? (
        <button
              className="workspace--icon-button"
              onClick={clickHandler}
            >
              <StarIcon
                className="workspace--board-icon"
                sx={{ "& :hover": { fill: "#fff" } }}
                style={{ fontSize: "1.6rem",
                fill: "yellow"  }}
              />
        </button>
      ) : (
        <div>
          {hover && (
            <button
              className="workspace--icon-button"
              onClick={clickHandler}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <StarIcon
                className="workspace--board-icon"
                sx={{ "& :hover": { color: "yellow" } }}
                style={{ fontSize: "1.6rem" }}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardView;
