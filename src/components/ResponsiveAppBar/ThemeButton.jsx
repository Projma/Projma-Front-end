import useTheme from "../../hooks/useTheme";
import "./ThemeButton.scss";

const ThemeButton = () => {
  const { changeTheme,THEME } = useTheme();
  return (
    <div className="theme-container">
      <div className="theme-bg-button">
        {THEME.map(t => (<button className="theme-button" onClick={() => changeTheme(t.name)}>{t.name}</button>))}
      </div>
    </div>
  );
};

export default ThemeButton;
