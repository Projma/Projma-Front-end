import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import EditLabel from "./EditLabel";

test("it shows a textbox for label name and input color for label color and a button for editing", async () => {
  const editLabel = {
    id: 1,
    title: "test title",
    color: "#881c99",
  };
  render(
    <EditLabel
      setShowEdit={() => {}}
      item={editLabel}
      editThisItem={() => {}}
    />
  );
  const label_name = screen.getByRole("textbox");
  expect(label_name).toBeInTheDocument();
  const color_input = document.querySelector("input[type=color]");
  expect(color_input).toBeInTheDocument();
  const edit_btn = document.querySelector("#edit_label_button");
  expect(edit_btn).toBeInTheDocument();
});

test("it shows the information of editing label correctly", async () => {
  const editLabel = {
    id: 1,
    title: "test title",
    color: "#881c99",
  };
  const editThisItem = vi.fn();
  render(
    <EditLabel
      setShowEdit={() => {}}
      item={editLabel}
      editThisItem={editThisItem}
    />
  );
  const label_name = screen.getByRole("textbox");
  const label_color = document.querySelector("input[type=color]");
  expect(label_name).toHaveValue(editLabel.title);
  expect(label_color).toHaveAttribute("value", editLabel.color);
});

test("it calls setAllLabels and set_task_labels functions after modifying label properties", async () => {
  const editLabel = {
    id: 1,
    title: "test title",
    color: "#881c99",
  };
  const editThisItem = vi.fn();
  render(
    <EditLabel
      setShowEdit={() => {}}
      item={editLabel}
      editThisItem={editThisItem}
    />
  );
  const label_name = screen.getByRole("textbox");
  const label_color = document.querySelector("input[type=color]");
  const edit_label_button = document.querySelector("#edit_label_button");
  user.click(label_name);
  fireEvent.change(label_name, { target: { value: "new title" } });
  user.click(edit_label_button);
  expect(editThisItem).toHaveBeenCalled();
  expect(editThisItem).toHaveBeenCalledWith("new title", "#881c99", 1);
});
