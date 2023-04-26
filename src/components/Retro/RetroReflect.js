import { Typography } from "@mui/material";
import RetroList from "./content/RetroList";
import "./RetroReflect.css";
import { Circle } from "@mui/icons-material";
const RetroReflect = () => {
  return (
    <div className="RetroReflect-container">
      <div className="RetroReflect-list">
        <div className="RetroReflect-green">
          <RetroList>
            <div className="RetroReflect-list-title">
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "green",
                }}
              ></div>
              <Typography>چه چیز هایی کار میکند؟</Typography>
            </div>
          </RetroList>
        </div>
        <div className="RetroReflect-red">
          <RetroList>
            <div className="RetroReflect-list-title">
              <div
                style={{
                  width: "1rem",
                  height: "1rem",
                  borderRadius: "50%",
                  backgroundColor: "red",
                }}
              ></div>
              <Typography>در کجا ها به مشکل خوردید؟</Typography>
            </div>
          </RetroList>
        </div>
      </div>
    </div>
  );
};

export default RetroReflect;
