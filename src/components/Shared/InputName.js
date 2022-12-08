import * as React from "react";
import PerTextField from "./PerTextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";

const InputName = (props) => {
  const [name, setName] = React.useState(props.name);
  const [underline, setUnderline] = React.useState(true);

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <PerTextField>
      <FormControl variant="standard" fullWidth>
        <Input
          multiline
          id="component-simple"
          value={name}
          defaultValue={name}
          onChange={handleChange}
          onBlur={() => props.onChangeName(name)}
          // onBlur={() => setUnderline(true)}
          color={"info"}
          disableUnderline={true}
          // sx={{ fontSize: "1.6rem", color:props.color}}
        />
      </FormControl>
    </PerTextField>
  );
};

export default InputName;
