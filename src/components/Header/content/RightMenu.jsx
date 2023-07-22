import { useState, useEffect } from "react";
import Dialog from "../../Asset/Dialog";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WorkspaceDialog from "../dialog/WorkspaceDialog";
import StarredDialog from "../dialog/StarredDialog";
import RecentDialog from "../dialog/RecentDialog";
import TemplateDialog from "../dialog/TemplateDialog";
import "../Header.scss";
import useTheme from "../../../hooks/useTheme";

const RightMenu = () => {
  const [openWorkspace, setOpenWorkspace] = useState(false);
  const [openStarred, setOpenStarred] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const { theme, getColor } = useTheme();
  
  return (
    <div className="header-right" style={{ color: getColor(theme.minorBg) }}>
      <div
        className="header-workspace"
        onClick={() => setOpenWorkspace(!openWorkspace)}
      >
        <div className="header-option"> فضای کار</div>
        <div className="header-option-icon">
          <ExpandMoreIcon />
        </div>
        <Dialog onClose={() => setOpenWorkspace(false)} open={openWorkspace}>
          <WorkspaceDialog />
        </Dialog>
      </div>
      <div
        className="header-starred"
        onClick={() => setOpenStarred(!openStarred)}
      >
        <div className="header-option">ستاره دار</div>
        <div className="header-option-icon">
          <ExpandMoreIcon />
        </div>
        <Dialog onClose={() => setOpenStarred(false)} open={openStarred}>
          <StarredDialog />
        </Dialog>
      </div>
      <div className="header-recent" onClick={() => setOpenRecent(!openRecent)}>
        <div className="header-option">آخرین ها</div>
        <div className="header-option-icon">
          <ExpandMoreIcon />
        </div>
        <Dialog onClose={() => setOpenRecent(false)} open={openRecent}>
          <RecentDialog />
        </Dialog>
      </div>
      <div
        className="header-template"
        onClick={() => setOpenTemplate(!openTemplate)}
      >
        <div className="header-option">قالب</div>
        <div className="header-option-icon">
          <ExpandMoreIcon />
        </div>
        <Dialog onClose={() => setOpenTemplate(false)} open={openTemplate}>
          <TemplateDialog />
        </Dialog>
      </div>
    </div>
  );
};

export default RightMenu;
