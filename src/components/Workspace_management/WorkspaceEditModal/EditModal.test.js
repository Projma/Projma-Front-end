import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import EditModal from "./EditModal";

test("it shows two textbox inputs for workspace name and description and one select input for workspace type and a button for saving", async () => {
  render(
    <EditModal
      params={{ id: 5 }}
      showToast={() => {}}
      workspace={{}}
      setWorkspace={() => {}}
    />
  );
  const editIcon = screen.getByTestId("EditIcon");
  user.click(editIcon);
  // screen.logTestingPlaygroundURL();
  const inputs = screen.getAllByRole("textbox");
  const select_ws_type = screen.getByRole("select_ws_type");
  const button = screen.getByRole("save_button");
  expect(inputs).toHaveLength(2);
  expect(select_ws_type).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});
