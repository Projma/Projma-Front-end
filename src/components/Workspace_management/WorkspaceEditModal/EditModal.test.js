import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import EditModal from "./EditModal";

test("it shows two inputs and a button", () => {
  // render the component
  render(
    <EditModal
      params={{ id: 5 }}
      showToast={() => {}}
      workspace={{}}
      setWorkspace={() => {}}
    />
  );
  // Manipulate the component or find an element in it
  // const inputs = screen.getAllByRole("textbox");
  // const button = screen.getByRole("button");
  // Assertion - make sure the component is doing
  // what we expect it to do
  // expect(inputs).toHaveLength(3);
  // expect(button).toBeInTheDocument();
});
