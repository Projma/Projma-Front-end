import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import FilterTask from "./FilterTask";
import useTheme from "../../../../hooks/useTheme";
import { Filter } from "@material-ui/icons";

vi.mock("../../../../hooks/useTheme", () => ({
  __esModule: true,
  default: () => ({
    theme: {
      name: "sun",
      mainBg: "#e5e5e5",
      minorBg: "#fff",
      secondary: "#f8981c",
      tertiary: "#f47922",
      hover: "#f4792280",
      primary: "#fdb713",
    },
    getColor: (bgColor) => "#000000",
  }),
}));

test("it opens the modal after clicking filter button", () => {
  const boardId = 1;
  const setLists = vi.fn();
  render(
    <Router>
      <FilterTask boardId={boardId} setLists={setLists} />
    </Router>
  );
  const filter_button = screen.getByRole("button", {
    name: /فیلتر تسک/i,
  });
  user.click(filter_button);
  const filter_confirm = screen.getByRole("button", {
    name: /بازنشانی/i,
  });
  expect(filter_confirm).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
});

test("it opens the modal after clicking filter button", () => {
  const boardId = 1;
  const setLists = vi.fn();
  render(
    <Router>
      <FilterTask boardId={boardId} setLists={setLists} />
    </Router>
  );
  const filter_button = screen.getByRole("button", {
    name: /فیلتر تسک/i,
  });
  user.click(filter_button);
  const filter_confirm = screen.getByRole("button", {
    name: /بازنشانی/i,
  });
  expect(filter_confirm).toBeInTheDocument();
  // screen.logTestingPlaygroundURL();
});
