import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import user from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import ShowMembersInFilter from "./ShowMembersInFilter";
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

test("renders the create board button", () => {
  const board_members = [
    {
      name: "sina",
      id: 1,
      checked: false,
      full_name: "sina alinejad",
    },
    {
      name: "abbas",
      id: 2,
      checked: false,
      full_name: "john thomas",
    },
    {
      name: "navid",
      id: 3,
      checked: false,
      full_name: "lionel messi",
    },
    {
      name: "amir",
      id: 4,
      checked: false,
      full_name: "cris ronaldo",
    },
  ];
  const setBoardMembers = vi.fn();
  const setSelectedMembers = vi.fn();
  const filterTaskAfterCheck = vi.fn();
  const filterTaskAfterUnCheck = vi.fn();
  render(
    <Router>
      <ShowMembersInFilter
        boardMembers={board_members}
        selectedMembers={[]}
        setBoardMembers={setBoardMembers}
        setSelectedMembers={setSelectedMembers}
        filterTaskAfterCheck={filterTaskAfterCheck}
        filterTaskAfterUnCheck={filterTaskAfterUnCheck}
      />
    </Router>
  );
  const inputs = document.querySelectorAll("input[type=checkbox]");
  expect(inputs).toHaveLength(board_members.length);
});

test("renders the create board button", () => {
  const board_members = [
    {
      name: "sina",
      id: 1,
      checked: false,
      full_name: "sina alinejad",
    },
    {
      name: "abbas",
      id: 2,
      checked: false,
      full_name: "john thomas",
    },
    {
      name: "navid",
      id: 3,
      checked: false,
      full_name: "lionel messi",
    },
    {
      name: "amir",
      id: 4,
      checked: false,
      full_name: "cris ronaldo",
    },
  ];
  const setBoardMembers = vi.fn();
  const setSelectedMembers = vi.fn();
  const filterTaskAfterCheck = vi.fn();
  const filterTaskAfterUnCheck = vi.fn();
  render(
    <Router>
      <ShowMembersInFilter
        boardMembers={board_members}
        selectedMembers={[]}
        setBoardMembers={setBoardMembers}
        setSelectedMembers={setSelectedMembers}
        filterTaskAfterCheck={filterTaskAfterCheck}
        filterTaskAfterUnCheck={filterTaskAfterUnCheck}
      />
    </Router>
  );
  const inputs = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < inputs.length; i++) {
    expect(inputs[i].checked).toBe(board_members[i].checked);
  }
});

test("renders the create board button", () => {
  const board_members = [
    {
      name: "sina",
      id: 1,
      checked: false,
      full_name: "sina alinejad",
    },
    {
      name: "abbas",
      id: 2,
      checked: false,
      full_name: "john thomas",
    },
    {
      name: "navid",
      id: 3,
      checked: false,
      full_name: "lionel messi",
    },
    {
      name: "amir",
      id: 4,
      checked: false,
      full_name: "cris ronaldo",
    },
  ];
  const setBoardMembers = vi.fn();
  const setSelectedMembers = vi.fn();
  const filterTaskAfterCheck = vi.fn();
  const filterTaskAfterUnCheck = vi.fn();
  render(
    <Router>
      <ShowMembersInFilter
        boardMembers={board_members}
        selectedMembers={[]}
        setBoardMembers={setBoardMembers}
        setSelectedMembers={setSelectedMembers}
        filterTaskAfterCheck={filterTaskAfterCheck}
        filterTaskAfterUnCheck={filterTaskAfterUnCheck}
      />
    </Router>
  );
  const inputs = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < inputs.length; i++) {
    expect(inputs[i].checked).toBe(board_members[i].checked);
  }
});

test("renders the create board button", () => {
  const board_members = [
    {
      name: "sina",
      id: 1,
      checked: false,
      full_name: "sina alinejad",
    },
    {
      name: "abbas",
      id: 2,
      checked: false,
      full_name: "john thomas",
    },
    {
      name: "navid",
      id: 3,
      checked: false,
      full_name: "lionel messi",
    },
    {
      name: "amir",
      id: 4,
      checked: false,
      full_name: "cris ronaldo",
    },
  ];
  const setBoardMembers = vi.fn();
  const setSelectedMembers = vi.fn();
  const filterTaskAfterCheck = vi.fn();
  const filterTaskAfterUnCheck = vi.fn();
  render(
    <Router>
      <ShowMembersInFilter
        boardMembers={board_members}
        selectedMembers={[]}
        setBoardMembers={setBoardMembers}
        setSelectedMembers={setSelectedMembers}
        filterTaskAfterCheck={filterTaskAfterCheck}
        filterTaskAfterUnCheck={filterTaskAfterUnCheck}
      />
    </Router>
  );
  const inputs = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < board_members.length; i++) {
    expect(screen.getByText(board_members[i].full_name)).toBeInTheDocument();
  }
});
