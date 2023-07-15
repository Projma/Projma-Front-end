import "./StarredDialog.scss";
import { useEffect, useState } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { baseUrl } from "../../../utilities/constants";
import StarsIcon from '@mui/icons-material/Stars';
import { useLocation } from 'react-router-dom';

const StarredDialog = () => {
  const [starred, setStarred] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getStarredBoard = async () => {
      let allWs;
      await apiInstance
        .get("workspaces/dashboard/myworkspaces/")
        .then((res) => {
          allWs = res.data.map((w) => {
            return {
              boards: w["boards"],
              id: w["id"],
            };
          });
        });
      function findWsId(boardId) {
        const object = allWs.find((obj) => obj.boards.includes(boardId));
        return object ? object.id : null;
      }
      await apiInstance
        .get("workspaces/dashboard/mystarred-boards/")
        .then((res) => {
          const star = res.data.map((s) => {
            return {
              name: s["name"],
              description: s["description"],
              id: s["id"],
              pic: s["background_pic"]===null ? null : baseUrl.slice(0, -1) + s["background_pic"],
              wsId: findWsId(s["id"]),
            };
          });
          setStarred(star);
        });
    };

    getStarredBoard();
  }, [location]);

  const navigate = useNavigate();
  const handleClick = (boardId, wsId) => {
    navigate(`/workspace/${wsId}/kanban/${boardId}/board`);
  };

  return (
    <div className="starred-dialog">
      {starred.length > 0 && (
        <>
          {starred.map((s) => (
            <div
              className="strred-board"
              onClick={() => handleClick(s.id, s.wsId)}
            >
              {s.pic === null ? <StarsIcon style={{fill: "gold"}}/> : <img className="starred-pic" src={s.pic} alt={s.name} />}
              <div className="starred-info">
                <div className="starred name">{s.name}</div>
                <div className="starred-description">{s.description}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default StarredDialog;
