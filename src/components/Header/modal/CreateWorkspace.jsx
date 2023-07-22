import "./CreateWorkspace.scss";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import { useState, useEffect } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import useTheme from "../../../hooks/useTheme";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";

const CreateWorkspace = ({ onClose }) => {
  const [boardName, setBoardName] = useState("");
  const [boardDescription, setBoardDescription] = useState("");
  const [wsType, setWsType] = useState(null);
  const { theme, getColor } = useTheme();

  const types = [
    {
      value: "education",
      label: "آموزشی",
    },
    {
      value: "marketing",
      label: "بازاریابی",
    },
    {
      value: "small business",
      label: "سرمایه گذاری کوچک",
    },
    {
      value: "operations",
      label: "عملیاتی",
    },
    {
      value: "engineering-it",
      label: "مهندسی و IT",
    },
    {
      value: "finance",
      label: "مالی",
    },
    {
      value: "human resources",
      label: "منابع انسانی",
    },
    {
      value: "other",
      label: "سایر",
    },
  ];

  const createBoard = async () => {
    apiInstance
      .post(`workspaces/dashboard/create-workspace/`, {
        name: boardName,
        description: boardDescription,
        type: wsType,
      })
      .then((res) => {
        toast.success("فضای کاری با موفقیت ساخته شد", {
          position: toast.POSITION.BOTTOM_LEFT,
          rtl: true,
        });
        onClose();
      });
  };

  useEffect(() => {
    setBoardDescription("");
    setBoardName("");
    setWsType("");
  }, [onClose]);

  return (
    <div className="create-workspace-modal">
      <div className="create-workspace-header">ساخت فضای کار</div>
      <div className="create-workspace-form">
        <PerTextField>
          <StyledTextField
            label="نام فضای کار"
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
          <div className="create-workspace-header-minor">نوع فضای کار </div>
          <div className="create-workspace-workspaces">
            {types.map((t) => (
              <div
                className="create-workspace-option"
                onClick={() => {
                  if (wsType === t.value) setWsType(null);
                  else setWsType(t.value);
                }}
                style={
                  wsType === t.value
                    ? { border: `0.2rem solid ${theme.primary}` }
                    : null
                }
              >
                {t.label}
              </div>
            ))}
          </div>
        </PerTextField>
      </div>
      <div className="create-workspace-button">
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

export default CreateWorkspace;
