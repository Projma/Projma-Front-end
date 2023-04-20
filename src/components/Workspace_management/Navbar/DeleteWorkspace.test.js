import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import DeleteWorkspace from "./DeleteWorkspace";

test("it has a button for opening dialog and two buttons for yes or no answer", async () => {
  const mock = jest.fn();
  const workspace_id = 10;
  render(
    <DeleteWorkspace workspace_id={workspace_id} removeWorkspace={mock} />
  );
  const delete_button = screen.getByRole("delete_button");
  user.click(delete_button);
  const yes_button = screen.getByText("بله");
  const no_button = screen.getByText("خیر");
  expect(delete_button).toBeInTheDocument();
  expect(yes_button).toBeInTheDocument();
  expect(no_button).toBeInTheDocument();
});

test("it calls removeWorkspace function after yes button is clicked with correct arguments", async () => {
  const mock = jest.fn();
  const workspace_id = 10;
  render(
    <DeleteWorkspace workspace_id={workspace_id} removeWorkspace={mock} />
  );
  const delete_button = screen.getByRole("delete_button");
  user.click(delete_button);
  user.click(screen.getByText("بله"));
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(expect.any(Object), workspace_id);
});

test("it does not call removeWorkspace function after no button is clicked", async () => {
  const mock = jest.fn();
  const workspace_id = 10;
  render(
    <DeleteWorkspace workspace_id={workspace_id} removeWorkspace={mock} />
  );
  const delete_button = screen.getByRole("delete_button");
  user.click(delete_button);
  user.click(screen.getByText("خیر"));
  expect(mock).toBeCalledTimes(0);
});
