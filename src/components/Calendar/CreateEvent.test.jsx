import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import CreateEvent from "./CreateEvent";

vi.mock("../Shared/DateTimePicker", () => () => (
  <div data-testid="mocked-child-component" />
));

test("it shows an input for title, an input for color, three checkboxes for selecting event repeat_duration and three checkboxes for selecting event type and an input for description, also a button for creating", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  expect(screen.getByLabelText("عنوان رویداد")).toBeInTheDocument();
  expect(document.querySelectorAll("input[type=checkbox]")).toHaveLength(6);
  expect(screen.getByLabelText("نوع رویداد")).toBeInTheDocument();
  expect(document.querySelector("input[type=number]")).toBeInTheDocument();
  expect(document.querySelector("input[type=color]")).toBeInTheDocument();
  expect(screen.getByLabelText("توضیحات")).toBeInTheDocument();
  expect(screen.getByRole("save_button")).toBeInTheDocument();
});

test("it makes the previous checkbox for repeat duration unchecked and the new one checked", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  const daily = document.querySelector("#daily");
  user.click(daily);
  expect(daily).toBeChecked();
  const weekly = document.querySelector("#weekly");
  user.click(weekly);
  expect(weekly).toBeChecked();
  expect(daily).not.toBeChecked();
});

test("it makes checkboxes for repeat duration unchecked when some number is put into repeat duration custom input", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  const daily = document.querySelector("#daily");
  user.click(daily);
  expect(daily).toBeChecked();
  const custom_repeat = document.querySelector("input[type=number]");
  user.click(custom_repeat);
  fireEvent.change(custom_repeat, { target: { value: 6 } });
  expect(daily).not.toBeChecked();
});

test("it puts the related number of predefined repeat durations in the custom repeat duration input", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  const daily = document.querySelector("#daily");
  const weekly = document.querySelector("#weekly");
  const monthly = document.querySelector("#monthly");
  user.click(daily);
  expect(daily).toBeChecked();
  const custom_repeat = document.querySelector("input[type=number]");
  expect(custom_repeat).toHaveValue(1);
  user.click(weekly);
  expect(custom_repeat).toHaveValue(7);
  user.click(monthly);
  expect(custom_repeat).toHaveValue(30);
});

test("it makes the previous checkbox for event type unchecked and the new one checked", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  const meeting = document.querySelector("#meeting");
  user.click(meeting);
  expect(meeting).toBeChecked();
  const holidays = document.querySelector("#holidays");
  user.click(holidays);
  expect(holidays).toBeChecked();
  expect(meeting).not.toBeChecked();
});

test("it makes checkboxes for event type unchecked when some custom type is specified", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  const task = document.querySelector("#task");
  user.click(task);
  expect(task).toBeChecked();
  const custom_type = screen.getByLabelText("نوع رویداد");
  user.click(custom_type);
  user.keyboard("custom");
  expect(task).not.toBeChecked();
});

test("it clears the custom type input when some predefined type is checked", async () => {
  render(
    <CreateEvent calendarId={1} handleClose={() => {}} showToast={() => {}} />
  );
  const task = document.querySelector("#task");
  const custom_type = screen.getByLabelText("نوع رویداد");
  user.click(custom_type);
  user.keyboard("custom");
  user.click(task);
  expect(custom_type).toHaveValue("");
});
