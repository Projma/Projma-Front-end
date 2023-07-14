import { useState } from "react";
import ProjmaName from "../Asset/ProjmaName";
import ProjmaLogo from "../Asset/ProjmaLogo";
import useTheme from "../../hooks/useTheme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Dialog from "../Asset/Dialog";
import Modal from "../Asset/Modal";
import "./Header.scss";

const Header = () => {
  const { theme, getColor } = useTheme();
  const [openWorkspace, setOpenWorkspace] = useState(false);
  const [openStarred, setOpenStarred] = useState(false);
  const [openRecent, setOpenRecent] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  return (
    <nav className="header">
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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            tenetur ipsam molestiae nemo et commodi voluptas voluptate eos,
            fugiat eligendi placeat, maiores cupiditate magni sapiente
            distinctio facilis laudantium in consequuntur!
          </Dialog>
        </div>
        <div className="header-starred" onClick={() => setOpenStarred(!openStarred)}>
          <div className="header-option">ستاره دار</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenStarred(false)} open={openStarred}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            tenetur ipsam molestiae nemo et commodi voluptas voluptate eos,
            fugiat eligendi placeat, maiores cupiditate magni sapiente
            distinctio facilis laudantium in consequuntur!
          </Dialog>
        </div>
        <div className="header-recent" onClick={() => setOpenRecent(!openRecent)}>
          <div className="header-option">آخرین ها</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenRecent(false)} open={openRecent}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            tenetur ipsam molestiae nemo et commodi voluptas voluptate eos,
            fugiat eligendi placeat, maiores cupiditate magni sapiente
            distinctio facilis laudantium in consequuntur!
          </Dialog>
        </div>
        <div className="header-template" onClick={() => setOpenTemplate(!openTemplate)}>
          <div className="header-option">قالب</div>
          <div className="header-option-icon">
            <ExpandMoreIcon />
          </div>
          <Dialog onClose={() => setOpenTemplate(false)} open={openTemplate}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis,
            tenetur ipsam molestiae nemo et commodi voluptas voluptate eos,
            fugiat eligendi placeat, maiores cupiditate magni sapiente
            distinctio facilis laudantium in consequuntur!
          </Dialog>
        </div>
      </div>
      <div className="header-center">
        <div className="header-projma">
          <div className="header-projma-text">
            <ProjmaName />
          </div>
          <div className="header-projma-logo">
            <ProjmaLogo />
          </div>
        </div>
      </div>
      <div className="header-left">sdfsdf</div>
    </nav>
  );
};

export default Header;
