import useTheme from "../../../hooks/useTheme";

const RetroList = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        width: "32rem",
        height: "100%",
        backgroundColor: theme.minorBg,
        borderRadius: "1rem",
        display: "flex",
        flexFlow: "column",
        padding: "1rem 1rem",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "1.5rem"
      }}
    >
      {children}
    </div>
  );
};

export default RetroList;
