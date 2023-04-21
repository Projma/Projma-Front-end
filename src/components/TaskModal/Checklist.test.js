import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import CheckList from "./Checklist";

test("it shows a file choosing box", async () => {
  render(<CheckList params={{}} setAllChecklists={() => {}} />);
  const open_checklist = screen.getByRole("open_checklist");
  user.click(open_checklist);
  const file_input = screen.getByRole("textbox");
  expect(file_input).toBeInTheDocument();
});
