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
import "./AddPoll.scss";
import React, { useState } from "react";
import PollOptions from "./PollOptions";
import AddIcon from "@mui/icons-material/Add";
import apiInstance from "../../../utilities/axiosConfig";
import useBoard from "../../../hooks/useBoard";
import useTheme from "../../../hooks/useTheme";

const AddPoll = ({closeAddPoll}) => {
  const {boardId} = useBoard();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { option: "", id: crypto.randomUUID() },
  ]);
  const [state, setState] = useState({
    anonymous: true,
    multiVote: false,
  });
  const {theme, getColor} = useTheme();
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

  const handleClick = async() => {
    await apiInstance.post("board/poll/",{
      "board": boardId,
      "question": question,
      "is_open": true,
      "is_multianswer": state["multiVote"],
      "is_known": !state["anonymous"],
    }).then((res) => {
      const pollId = res.data.id;
      options.forEach(x => {
        if(x.option !== "")
          apiInstance.post("board/poll-answers/",{
            "text": x.option,
            "poll": pollId
          });
      });
      closeAddPoll();
    });
  };

  return (
    <div className="poll_addpoll-container" >
      <div className="poll_addpoll-question poll_default">
        <Typography style={{color: getColor(theme.minorBg)}}>عنوان نظرسنجی</Typography>
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
      <div className="poll_addpoll-options poll_default">
        <Typography style={{color: getColor(theme.minorBg)}}>گزینه ها</Typography>
        <div className="poll_addpoll-options-container">
          <Stack spacing={1}>{renderOptions()}</Stack>
        </div>
      </div>
      <div className="poll_addpoll-setting poll_default">
        <Typography style={{color: getColor(theme.minorBg)}}>تنظیمات</Typography>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <FormControlLabel
              sx={{
                ".MuiFormControlLabel-label": {
                  fontSize: "1rem",
                  color: getColor(theme.minorBg)
                },
                "&.MuiFormControlLabel-root": {
                  marginRight: 0,
                  color: getColor(theme.minorBg)
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
                  color: getColor(theme.minorBg)
                },
                "&.MuiFormControlLabel-root": {
                  marginRight: 0,
                  color: getColor(theme.minorBg)
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
      <div className="poll_addpoll-button">
        <Button type="button" variant="contained" onClick={handleClick}>
          ایجاد
        </Button>
        <Button type="button" variant="outlined" onClick={closeAddPoll}>
          لغو
        </Button>
      </div>
    </div>
  );
};

export default AddPoll;
