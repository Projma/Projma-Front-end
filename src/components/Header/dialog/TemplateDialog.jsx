import "./TemplateDialog.scss";
import { useEffect, useState } from "react";
import apiInstance from "../../../utilities/axiosConfig";
import useTheme from "../../../hooks/useTheme";
import { baseUrl } from "../../../utilities/constants";
import InventoryIcon from "@mui/icons-material/Inventory";
import Modal from "../../Asset/Modal";
import CreateTemplate from "../modal/CreateTemplate";
import { useLocation } from "react-router-dom";

const TemplateDialog = () => {
  const [template, setTemplate] = useState([]);
  const location = useLocation();
  const { theme, getColor } = useTheme();
  const [open, setOpen] = useState(false);
  const [tName, setTName] = useState(null);
  const [tId, setTId] = useState(null);

  useEffect(() => {
    const getTemplateBoard = async () => {
      apiInstance.get("template/").then((res) => {
        const temp = res.data.map((t) => {
          return {
            name: t["name"],
            description: t["description"],
            id: t["id"],
            pic: t["background_pic"] === null ? null : t["background_pic"],
          };
        });
        setTemplate(temp);
      });
    };

    getTemplateBoard();
  }, [location]);

  return (
    <div className="template-dialog">
      {template.length > 0 && (
        <>
          {template.map((s) => (
            <div
              className="template-board"
              key={s.id}
              onClick={() => {
                setTName(s.name);
                setTId(s.id);
                setOpen(true);
              }}
            >
              {s.pic !== null ? (
                <InventoryIcon style={{ fill: theme.primary }} />
              ) : (
                <img className="template-pic" src={s.pic} alt={s.name} />
              )}
              <div
                className="template-info"
                style={{ color: getColor(theme.secondary) }}
              >
                <div className="template-name">{s.name}</div>
                <div className="template-description">{s.description}</div>
              </div>
            </div>
          ))}
        </>
      )}
              <Modal onClose={() => setOpen(false)} open={open}>
                <CreateTemplate
                  onClose={() => setOpen(false)}
                  templateId={tId}
                  templateName={tName}
                />
              </Modal>
    </div>
  );
};

export default TemplateDialog;
