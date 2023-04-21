import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import DeleteDialog from "./DeleteDialog";

test("it calls removeMember function after clicking yes button", async () => {
  const go_to_profile = jest.fn();
  const removeMember = jest.fn();
  const user_id = 1;
  render(<DeleteDialog user_id={user_id} removeMember={removeMember} />);
  const open_remove_dialog = document.querySelector("#open_remove_dialog");
  user.click(open_remove_dialog);
  const yes_button = screen.getByText("بله");
  user.click(yes_button);
  expect(removeMember).toHaveBeenCalled();
  expect(removeMember).toHaveBeenCalledWith(expect.any(Object), user_id);
});
