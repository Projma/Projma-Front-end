import { useEffect, useState } from "react";
import "./WorkspaceDialog.scss";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { useLocation } from 'react-router-dom';

const WorkspaceDialog = () => {
  const [owner, setOwner] = useState([]);
  const [guest, setGuest] = useState([]);
  const { theme, getColor } = useTheme();
  const location = useLocation();
  useEffect(() => {
    const getWorkspace = async () => {
      let ws = [];
      await apiInstance
        .get("workspaces/dashboard/myowning-workspaces/")
        .then((res) => {
          ws = res.data.map((w) => {
            return {
              name: w["name"],
              description: w["description"],
              id: w["id"],
            };
          });
          setOwner(ws);
        });
      await apiInstance
        .get("workspaces/dashboard/myworkspaces/")
        .then((res) => {
          let g = res.data.map((w) => {
            return {
              name: w["name"],
              description: w["description"],
              id: w["id"],
            };
          });

          g = g.filter((obj) => {
            return !ws.find((w) => {
              return obj.id === w.id;
            });
          });

          setGuest(g);
        });
    };

    getWorkspace();
  }, [location]);

  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/workspace/${id}/dashboard/board`);
  };

  return (
    <div className="ws-dialog">
      {owner.length > 0 && (
        <div className="ws-owner">
          <div className="ws-header-title">فضاهای کاری شما</div>
          <div className="ws-workspace">
            {owner.map((w) => (
              <div className="ws-container" onClick={() => handleClick(w.id)} style={{ color: getColor(theme.secondary) }}>
                <div className="ws-name">{w.name}</div>
                <div className="ws-description">{w.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {guest.length > 0 && (
        <div className="ws-guest">
          <div className="ws-header-title">فضاهای کاری مهمان</div>
          <div className="ws-workspace">
            {guest.map((w) => (
              <div className="ws-container" onClick={() => handleClick(w.id)} style={{ color: getColor(theme.secondary) }}>
                <div className="ws-name">{w.name}</div>
                <div className="ws-description">{w.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceDialog;
