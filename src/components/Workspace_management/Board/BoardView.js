import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import "./BoardView.css";
import { Navigate, useNavigate } from "react-router-dom";
import apiInstance from "../../../utilities/axiosConfig";
import { useParams } from "react-router-dom";

const BoardView = (props) => {
  let navigate = useNavigate();
  let params = useParams();
  const [hover, setHover] = useState(false);
  const [isStarred, setIsStarred] = useState();
  React.useEffect(() => {
    setIsStarred(props.is);
    return () => {
      setIsStarred(false);
    };
  }, [props.is]);
  const clickHandler = (e) => {
    e.stopPropagation();
    props.onLoading();
    apiInstance
      .post(`workspaces/board/${props.id}/toggle-myboard-star/`)
      .then(() => {
        const flag = !isStarred;
        const id = props.id;
        setIsStarred(flag);
        const data = { id: id, is: flag };
        props.onStarred(data);
      });
  };

  return (
    <div
      className="workspace--board-view"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/workspace/${params.id}/kanban/${props.id}/board`);
      }}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)),url(${props.pic})`,
      }}
    >
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
          onClick={(e) => clickHandler(e)}
        >
          <StarIcon
            className="workspace--board-icon"
            sx={{ "& :hover": { fill: "#fff !important" } }}
            style={{ fontSize: "1.6rem", fill: "yellow" }}
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
                sx={{ "& :hover": { color: "yellow" }, "&": { color: "#fff" } }}
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
