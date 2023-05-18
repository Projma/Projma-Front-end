import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import "./Drawer.scss";

const useStyles = makeStyles({
  close_drawer: {
    "&:hover": {
      backgroundColor: "#B0ACB1",
    },
  },
  list_item: {
    "&:hover": {
      backgroundColor: "#223040",
    },
    fontFamily: "Vazir",
  },
  list_item_icon: {
    color: "#fff",
    borderRadius: "50%",
  },
});

const ShowMembersInDrawer = ({ members }) => {
  const classes = useStyles();
  return (
    <List>
      {members.map((member, index) => (
        <ListItem
          button
          href="#"
          key={member.name}
          disablePadding
          className={classes.list_item}
        >
          <Link
            to={"/profileview/" + member.userName}
            className={classes.list_item}
            style={{
              textDecoration: "none",
              color: "#000",
              display: "block",
              width: "100%",
            }}
          >
            <ListItemButton sx={{}}>
              <ListItemIcon>
                <img
                  src={member.image}
                  style={{
                    border: "1px solid #ddd",
                    "border-radius": "4px",
                    padding: "5px",
                    width: "4rem",
                    height: "4rem",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography
                    type="body2"
                    style={{ color: "#fff", fontFamily: "Vazir" }}
                  >
                    {member.name}
                  </Typography>
                }
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "1.3rem",
                }}
              />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default ShowMembersInDrawer;
