import "./CreateTemplate.scss";
import { useState, useEffect } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import useTheme from "../../../hooks/useTheme";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Createtemplate = ({ onClose, templateId, templateName }) => {
  const [workspace, setWorkspace] = useState([]);
  const [wsId, setWsId] = useState(null);
  const { theme, getColor } = useTheme();
  const navigate = useNavigate();
  const navigateToBoard = (boardId) => {
    navigate(`/workspace/${wsId}/kanban/${boardId}/board`);
  };
  const createtemplate = async () => {
    apiInstance
      .get(
        `/workspaces/templates/${templateId}/create-template-from-template/${wsId}/`
      )
      .then((res) => {
        toast.success("تمپلیت با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });

        delay(2500).then(() => navigateToBoard(res.data.id));
        onClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("خطا در ساخت تمپلیت", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        onClose();
      });
  };

  useEffect(() => {
    const getWorkspace = async () => {
      apiInstance.get("workspaces/dashboard/myworkspaces/").then((res) => {
        let ws = res.data.map((w) => {
          return {
            name: w["name"],
            description: w["description"],
            id: w["id"],
          };
        });

        setWorkspace(ws);
      });
    };

    getWorkspace();

    setWsId("");
  }, [onClose]);

  return (
    <div className="create-template-modal">
      <div className="create-template-header">ساخت تمپلیت {templateName}</div>
      <div className="create-template-workspace">
        <div className="create-template-workspaces-title">فضای کار</div>
        <div className="create-template-workspaces-container">
          {workspace.map((w) => (
            <div
              className="create-template-option"
              onClick={() => {
                if (wsId === w.id) setWsId(null);
                else setWsId(w.id);
              }}
              style={
                wsId === w.id
                  ? { border: `0.2rem solid ${theme.primary}` }
                  : null
              }
            >
              {w.name}
            </div>
          ))}
        </div>
      </div>
      <div className="create-template-button">
        <Button variant="contained" onClick={() => createtemplate()}>
          ساخت
        </Button>
        <Button variant="outlined" onClick={() => onClose()}>
          لغو
        </Button>
      </div>
    </div>
  );
};

export default Createtemplate;
