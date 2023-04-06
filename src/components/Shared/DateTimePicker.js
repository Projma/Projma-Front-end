import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTimePickerValue({ value, setValue }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          label="Uncontrolled picker"
          defaultValue={value}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
        />
        {/* <DateTimePicker
          label="Controlled picker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            console.log(newValue.$y);
          }}
          sx={{
            color: "#fff",
            border: "1px solid #fff",
          }}
          InputProps={{ style: { color: "#fff" } }}
        /> */}
      </DemoContainer>
    </LocalizationProvider>
  );
}
