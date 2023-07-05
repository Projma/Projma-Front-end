import React from "react";
import { render } from "@testing-library/react";
import InitialIcon from "./InitialIcon";

test("renders InitialIcon component with initials", () => {
  const mockInitials = {
    title: "JD",
    color: "#FF0000",
  };

  const { getByTestId, getByText } = render(
    <InitialIcon initials={mockInitials} />
  );

  const initialIcon = getByTestId("initial-icon");

  expect(initialIcon).toBeInTheDocument();
  expect(initialIcon).toHaveStyle("background-color: #FF000055");

  const initials = getByText("JD");
  expect(initials).toBeInTheDocument();
});
