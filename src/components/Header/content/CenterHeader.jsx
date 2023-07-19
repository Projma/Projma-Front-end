import ProjmaName from "../../Asset/ProjmaName";
import ProjmaLogo from "../../Asset/ProjmaLogo";
import { useNavigate } from "react-router-dom";
import "../Header.scss";

const CenterHeader = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <div className="header-center">
      <div className="header-projma" onClick={() => handleClick()}>
        <div className="header-projma-text">
          <ProjmaName />
        </div>
        <div className="header-projma-logo">
          <ProjmaLogo />
        </div>
      </div>
    </div>
  );
};

export default CenterHeader;
