import useTheme from "../../../hooks/useTheme";

const RetroCard = ({children}) => {
  const { theme, getColor } = useTheme();
  return ( 
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: theme.secondary,
        borderRadius: "1rem",
        display: "flex",
        flexFlow: "column",
        padding: "1rem 1rem",
        // alignItems: "flex-start",
        fontSize: "2rem",
        justifyContent: "flex-start",
        gap: "1.5rem",
        color: getColor(theme.secondary),
      }}
    >
      {children}
    </div>
   );
}
 
export default RetroCard;