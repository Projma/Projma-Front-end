import "./CreateBoard.scss";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import { useState, useEffect } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import useTheme from "../../../hooks/useTheme";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const CreateBoard = ({ onClose }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [workspace, setWorkspace] = useState([]);
  const [wsId, setWsId] = useState(null);
  const { theme, getColor } = useTheme();
  const navigate = useNavigate();
  const createBoard = async () => {
    apiInstance
      .post(`/workspaces/workspaceowner/${wsId}/create-board/`, {
        name: boardName,
        description: boardDescription,
      })
      .then((res) => {
        toast.success("بورد با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        navigate(`/workspace/${wsId}/kanban/${res.data.id}/board`);
      }).finally(() => onClose());
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

    setBoardDescription("");
    setBoardName("");
    setWsId("");
  }, [onClose]);

  return (
    <div className="create-board-modal">
      <div className="create-board-header">ساخت بورد</div>
      <div className="create-board-form">
        <PerTextField>
          <StyledTextField
            label="نام بورد"
            required
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            fullWidth
          />
          <StyledTextField
            label="شرح"
            type="text"
            value={boardDescription}
            onChange={(e) => setBoardDescription(e.target.value)}
            fullWidth
          />
          <div className="create-board-header-minor">فضای کار</div>
          <div className="create-board-workspaces">
            {workspace.map((w) => (
              <div
                className="create-board-option"
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
        </PerTextField>
      </div>
      <div className="create-board-button">
        <Button variant="contained" onClick={() => createBoard()}>
          ساخت
        </Button>
        <Button variant="outlined" onClick={() => onClose()}>
          لغو
        </Button>
      </div>
    </div>
  );
};

export default CreateBoard;
