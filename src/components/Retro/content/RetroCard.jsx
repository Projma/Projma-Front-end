const RetroCard = ({children}) => {
  return ( 
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#265D97",
        borderRadius: "1rem",
        display: "flex",
        flexFlow: "column",
        padding: "1rem 1rem",
        // alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "1.5rem",
        color: "#fff"
      }}
    >
      {children}
    </div>
   );
}
 
export default RetroCard;