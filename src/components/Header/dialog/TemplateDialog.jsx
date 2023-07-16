import "./TemplateDialog.scss";
import { useEffect, useState } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import { useNavigate } from "react-router-dom";
import useTheme from "../../../hooks/useTheme";
import { baseUrl } from "../../../utilities/constants";
import InventoryIcon from '@mui/icons-material/Inventory';
import { useLocation } from 'react-router-dom';

const TemplateDialog = () => {
  const [template, setTemplate] = useState([]);
  const location = useLocation();
  const {theme, getColor} = useTheme();

  useEffect(() => {
    const getTemplateBoard = async () => {
      apiInstance.get("template/").then((res) => {
        const temp = res.data.map((t) => {
          return {
            name: t["name"],
            description: t["description"],
            id: t["id"],
            pic: t["background_pic"]===null ? null :  t["background_pic"],
          };
        });
        setTemplate(temp);
      });
    };

    getTemplateBoard();
  }, [location]);

  const navigate = useNavigate();
  const handleClick = (boardId, wsId) => {
    navigate(`/workspace/${wsId}/kanban/${boardId}/board`);
  };

  return (
    <div className="template-dialog">
      {template.length > 0 && (
        <>
          {template.map((s) => (
            <div
              className="strred-board"
              onClick={() => handleClick(s.id, s.wsId)}
            >
              {s.pic !== null ? <InventoryIcon style={{fill: theme.primary}}/> : <img className="template-pic" src={s.pic} alt={s.name} />}
              <div className="template-info" style={{ color: getColor(theme.secondary) }}>
                <div className="template-name">{s.name}</div>
                <div className="template-description">{s.description}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default TemplateDialog;
