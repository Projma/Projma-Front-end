import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import user from "@testing-library/user-event";
import Labels from "./Labels";

test("it shows two inputs and a button", () => {
  // render the component
  render(
    <Labels
      params={{ board_id: 4 }}
      task_labels={[]}
      set_task_labels={() => {}}
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
