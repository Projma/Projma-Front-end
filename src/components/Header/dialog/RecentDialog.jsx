import "./RecentDialog.scss";
import { useEffect, useState } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { baseUrl } from "../../../utilities/constants";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useLocation } from 'react-router-dom';


const RecentDialog = () => {
  const [recent, setRecent] = useState([]);
  const {theme, getColor} = useTheme();
  const location = useLocation();

  useEffect(() => {
    const getRecentBoard = async () => {
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
        .get("workspaces/dashboard/myrecent-boards/")
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
          setRecent(star);
        });
    };

    getRecentBoard();
  }, [location]);

  const navigate = useNavigate();
  const handleClick = (boardId, wsId) => {
    navigate(`/workspace/${wsId}/kanban/${boardId}/board`);
  };

  return (
    <div className="recent-dialog">
      {recent.length > 0 && (
        <>
          {recent.map((s) => (
            <div
              className="strred-board"
              onClick={() => handleClick(s.id, s.wsId)}
            >
              {s.pic === null ? <AccessTimeIcon style={{fill: theme.primary}}/> : <img className="recent-pic" src={s.pic} alt={s.name} />}
              <div className="recent-info">
                <div className="recent name">{s.name}</div>
                <div className="recent-description">{s.description}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RecentDialog;
