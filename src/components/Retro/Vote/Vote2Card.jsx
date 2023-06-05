import useTheme from "../../../hooks/useTheme";

const RetroCard2 = ({ children }) => {
  const { theme } = useTheme();
  return (
    <div
      style={{
        width: "60%",
        height: "100%",
        backgroundColor: theme.primary,
        borderRadius: "1rem",
        display: "flex",
        flexFlow: "column",
        padding: "1rem 1rem",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "1.5rem",
        color: theme.text,
      }}
    >
      {children}
    </div>
  );
};

export default RetroCard2;
