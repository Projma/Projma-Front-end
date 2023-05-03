const RetroList = ({ children }) => {
  return (
    <div
      style={{
        width: "32rem",
        height: "100%",
        backgroundColor: "#0A1929",
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