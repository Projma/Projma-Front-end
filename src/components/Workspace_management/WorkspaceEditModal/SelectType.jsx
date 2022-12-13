import * as React from "react";
import { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import apiInstance from "../../../utilities/axiosConfig";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({ type, setWorkspaceType, workspace }) {
  console.log(type);
  const [types, setTypes] = React.useState([]);
  const [typeInp, setTypeInp] = React.useState("");
  useEffect(() => {
    console.log("useEffect");
    console.log(type);
    apiInstance.get(`workspaces/workspaces/type/`).then((res) => {
      const typee = Object.entries(res.data).filter((item) => {
        return item[0] === type;
      });
      console.log(typee[0][1]);
      setTypeInp(typee[0][1]);
      setTypes(res.data);
    });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setWorkspaceType(event.target.value);
    console.log(event.target.value);
    const inp = Object.entries(types).filter((item) => {
      return item[0] === event.target.value;
    });
    setTypeInp(inp[0][1]);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          renderValue={(p) => p}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={workspace.type}
          onChange={handleChange}
          sx={{
            border: "1px solid #fff",
            color: "#fff",
          }}
        >
          {Object.entries(types).map((type) => (
            <MenuItem
              value={type[0]}
              sx={{ fontFamily: "Vazir" }}
              key={type[0]}
            >
              {type[1]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
