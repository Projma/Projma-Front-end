import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";

import SignIn from "./Signin";

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
