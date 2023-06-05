import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";

import SignIn from "./Signin";
import useTheme from "../../hooks/useTheme";

vi.mock("../../hooks/useTheme", () => ({
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

test("have input for inputs", () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );
  const usernameInput = screen.getByLabelText(/نام کاربری/i);
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("test number of textfield", () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(1);
});

test("have submit button", () => {
  render(
    <Router>
      <SignIn />
    </Router>
  );
  const submitButton = screen.getByRole("submit-btn");
  expect(submitButton).toBeInTheDocument();
});

test("have link to signup", () => {
  const { getByText } = render(
    <Router>
      <SignIn />
    </Router>
  );
  const linkElement = getByText(/فراموشی رمز عبور/i);
  const linkElement2 = getByText(/اکانت ندارید؟ ثبت‌نام کنید/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement.tagName).toBe("A");
  expect(linkElement2.tagName).toBe("A");
});
