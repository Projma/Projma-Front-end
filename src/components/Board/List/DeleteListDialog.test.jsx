import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import DeleteListDialog from "./DeleteListDialog";
import useTheme from "../../../hooks/useTheme";

vi.mock("../../../hooks/useTheme", () => ({
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

test("show hazard text", () => {
  const handleClose = vi.fn();
  const handleDeleteList = vi.fn();
  render(
    <DeleteListDialog
      isOpen={true}
      handleClose={handleClose}
      handleDeleteList={handleDeleteList}
    />
  );
  const input = screen.getByText("آیا از حذف کردن لیست مطمئن هستید", {
    exact: false,
  });
  expect(input).toBeInTheDocument();
});

test("show confirm and deny button", () => {
  const handleClose = vi.fn();
  const handleDeleteList = vi.fn();
  render(
    <DeleteListDialog
      isOpen={true}
      handleClose={handleClose}
      handleDeleteList={handleDeleteList}
    />
  );
  const no_button = screen.getByRole("button", {
    name: /انصراف/i,
  });
  const yes_button = screen.getByRole("button", {
    name: /تایید/i,
  });
  expect(no_button).toBeInTheDocument();
  expect(yes_button).toBeInTheDocument();
});

test("it calls handleDeleteList function after clicking confirm buttom", () => {
  const handleClose = vi.fn();
  const handleDeleteList = vi.fn();
  render(
    <DeleteListDialog
      isOpen={true}
      handleClose={handleClose}
      handleDeleteList={handleDeleteList}
    />
  );
  const no_button = screen.getByRole("button", {
    name: /انصراف/i,
  });
  const yes_button = screen.getByRole("button", {
    name: /تایید/i,
  });
  user.click(yes_button);
  expect(handleDeleteList).toHaveBeenCalled();
});

test("it does not call handleDeleteList function after clicking deny buttom", () => {
  const handleClose = vi.fn();
  const handleDeleteList = vi.fn();
  render(
    <DeleteListDialog
      isOpen={true}
      handleClose={handleClose}
      handleDeleteList={handleDeleteList}
    />
  );
  const no_button = screen.getByRole("button", {
    name: /انصراف/i,
  });
  const yes_button = screen.getByRole("button", {
    name: /تایید/i,
  });
  user.click(no_button);
  expect(handleDeleteList).toHaveBeenCalledTimes(0);
});
