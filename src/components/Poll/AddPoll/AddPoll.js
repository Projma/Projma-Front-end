import {
  Button,
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import PerTextField from "../../Shared/PerTextField";
import StyledTextField from "../../Shared/StyledTextField";
import "./AddPoll.css";
import { useState } from "react";
import PollOptions from "./PollOptions";

const AddPoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { option: "", id: crypto.randomUUID() },
  ]);
  const [state, setState] = useState({
    anonymous: false,
    multiVote: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const onChangeOp = (id, op) => {
    let ops = options.map((x) => {
      if (id === x.id) x.option = op;
      return x;
    });
    ops = ops.filter((x) => x.option !== "");
    console.log(ops);
    if (ops.length < 10) ops.push({ option: "", id: crypto.randomUUID() });
    setOptions(ops);
    // setOptions([...options, ""]);
    console.log(ops);
  };
  const renderOptions = () => {
    // console.log("render", options);
    return options.map((x) => (
      <div>
        <PollOptions
          id={x.id}
          op={x.option}
          key={x.id}
          onChangeOp={onChangeOp}
        />
      </div>
    ));
  };
  return (
    <div className="poll_addpoll-container poll_default">
      <div className="poll_addpoll-question poll_default">
        <Typography>عنوان نظرسنجی</Typography>
        <PerTextField>
          <StyledTextField
            margin="normal"
            variant="filled"
            required
            fullWidth
            placeholder="سوال خود را در این بخش بنویسید"
            autoFocus={question === ""}
            multiline
            defaultValue={question}
            onChange={(e) => setQuestion(e.target.value)}
            InputProps={{
              disableUnderline: true,
              style: {
                fontFamily: "Vazir",
                // backgroundColor: "var(--main-item-color)"
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
      <div className="poll_addpoll-options poll_default">
        <Typography>گزینه ها</Typography>
        <Stack spacing={1}>{renderOptions()}</Stack>
      </div>
      <div className="poll_addpoll-setting poll_default">
        <Typography>تنظیمات</Typography>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              sx={{
                ".MuiFormControlLabel-label": {
                  fontSize: "1rem",
                },
                "&.MuiFormControlLabel-root": {
                  marginRight: "0",
                },
              }}
              control={
                <Switch
                  checked={state.anonymous}
                  onChange={handleChange}
                  name="anonymous"
                />
              }
              label="رای گیری ناشناس"
            />
            <FormControlLabel
              sx={{
                ".MuiFormControlLabel-label": {
                  fontSize: "1rem",
                },
                "&.MuiFormControlLabel-root": {
                  marginRight: 0,
                },
              }}
              control={
                <Switch
                  checked={state.multiVote}
                  onChange={handleChange}
                  name="multiVote"
                />
              }
              label="انتخاب چندگانه"
            />
          </FormGroup>
        </FormControl>
      </div>
    </div>
  );
};

export default AddPoll;