import useTheme from "../../../hooks/useTheme";
import "./ThemeDialog.scss";

const ThemeDialog = () => {
  const { theme, getColor, THEME, changeTheme } = useTheme();

  return (
    <div className="theme-dialog">
      {THEME.map((t) => (
        <div className="theme-container" onClick={() => changeTheme(t.name)}>
          <div
            className="theme-page-layout"
            style={{ backgroundColor: t.primary }}
          >
            <div
              className="theme-navbar"
              style={{
                backgroundColor: t.minorBg,
                borderBottom: `0.1rem solid ${t.primary}`,
              }}
            >
            </div>
            <div className="theme-page">
              <div
                className="theme-sidebar"
                style={{
                  backgroundColor: t.secondary,
                  borderLeft: `0.1rem solid ${t.primary}`,
                }}
              ></div>
              <div
                className="theme-section"
                style={{ backgroundColor: t.mainBg }}
              >
                <div
                  className="theme-list1"
                  style={{ backgroundColor: t.secondary }}
                ></div>
                <div
                  className="theme-list2"
                  style={{ backgroundColor: t.secondary }}
                ></div>
                <div
                  className="theme-list3"
                  style={{ backgroundColor: t.secondary }}
                ></div>
                <div
                  className="theme-list4"
                  style={{ backgroundColor: t.secondary }}
                ></div>
              </div>
            </div>
          </div>
          <div
            className="theme-title"
            style={{ color: getColor(theme.secondary) }}
          >
            {t.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ThemeDialog;
