import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

test("it shows a logo containing the first letter of workspace name in upper case", async () => {
  const workspace = {
    id: 10,
    name: "test workspace",
  };
  const setWorkspace = vi.fn();
  render(
    <MemoryRouter>
      <Navbar params={{}} workspace={workspace} setWorkspace={setWorkspace} />
    </MemoryRouter>
  );
  const heading = screen.getByRole("heading", {
    text: workspace.name.charAt(0).toUpperCase(),
  });
  expect(heading).toBeInTheDocument();
});

test("it shows a div containing the workspace name", async () => {
  const workspace = {
    id: 10,
    name: "test workspace",
  };
  const setWorkspace = vi.fn();
  render(
    <MemoryRouter>
      <Navbar params={{}} workspace={workspace} setWorkspace={setWorkspace} />
    </MemoryRouter>
  );
  const w_name = screen.getByText(workspace.name);
  expect(w_name).toBeInTheDocument();
});
