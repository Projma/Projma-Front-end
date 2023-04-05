import React from "react";
import { render, screen, fireEvent, getByRole } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignIn from "./Signin";

test("have input for inputs", () => {
  render(<SignIn />);
  const usernameInput = screen.getByLabelText(/نام کاربری/i);
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  expect(usernameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("test number of textfield", () => {
  render(<SignIn />);
  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(1);
});

test("have submit button", () => {
  render(<SignIn />);
  const submitButton = screen.getByRole("submit-btn");
  expect(submitButton).toBeInTheDocument();
});

test("have link to signup", () => {
  const { getByText } = render(<SignIn />);
  const linkElement = getByText(/فراموشی رمز عبور/i);
  const linkElement2 = getByText(/اکانت ندارید؟ ثبت‌نام کنید/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement2).toBeInTheDocument();
  expect(linkElement.tagName).toBe("A");
  expect(linkElement2.tagName).toBe("A");
});
