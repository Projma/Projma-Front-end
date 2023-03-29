import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import apiInstance from "../../../utilities/axiosConfig";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BasicSelect({
  editModalWorkspace,
  setEditModalWorkspace,
}) {
  const [types, setTypes] = React.useState([]);
  useEffect(() => {
    apiInstance.get(`workspaces/workspaces/type/`).then((res) => {
      setTypes(res.data);
    });
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    setEditModalWorkspace({ ...editModalWorkspace, type: event.target.value });
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <Select
          renderValue={(p) => types[p]}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={editModalWorkspace?.type}
          onChange={handleChange}
          sx={{
            border: "1px solid #66B2FF",
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
