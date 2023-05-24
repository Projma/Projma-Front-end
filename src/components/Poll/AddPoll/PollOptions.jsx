import { useState } from "react";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";

const PollOptions = ({ id, op, onChangeOp}) => {
  const [option, setOption] = useState(op);
  return (
    <div>
      <PerTextField>
        <StyledTextField
          margin="normal"
          variant="filled"
          required
          fullWidth
          // autoFocus={op === "" ? true : false}
          multiline
          placeholder="اضافه کردن گزینه ..."
          defaultValue={option}
          value={option}
          onChange={(e) => {
            onChangeOp(id, e.target.value);
            setOption(e.target.value);
          }}
          // onBlur={() => onChangeOp(id, option)}
          InputProps={{
            disableUnderline: true,
            style: {
              fontFamily: "Vazir",
              // backgroundColor: "$secondary"
            },
          }}
          InputLabelProps={{
            style: {
              fontFamily: "Vazir",
              // fontSize: "1.6rem",
            },
          }}
          hiddenLabel
          sx={{
            border: "none",
            borderRadius: "0.5rem",
            // borderRadius: "0.5rem",
            "& input::placeholder": {
              fontSize: "1rem",
            },
            margin: 0,
          }}
        />
      </PerTextField>
    </div>
  );
};

export default PollOptions;
