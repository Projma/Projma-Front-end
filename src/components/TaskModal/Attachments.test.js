import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Attachments from "./Attachments";
import exp from "constants";

test("it shows a file choosing box", async () => {
  render(<Attachments params={{}} setAllAttachments={() => {}} />);
  const open_attachment = screen.getByRole("open_attachment");
  user.click(open_attachment);
  const file_input = document.querySelector("input[type=file]");
  expect(file_input).toBeInTheDocument();
});
