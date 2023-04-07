import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import SignUp from "./Signup";

test("inputs", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const firstNameInput = screen.getAllByLabelText(/نام/i);
  const lastNameInput = screen.getByLabelText(/نام خانوادگی/i);
  const emailInput = screen.getByLabelText(/ایمیل/i);
  const userNameInput = screen.getByLabelText(/نام کاربری/i);
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  expect(firstNameInput[0]).toHaveAttribute("type", "text");
  expect(firstNameInput[0]).toHaveAttribute("id", "firstName");
  expect(lastNameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(userNameInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});

test("test number of textfield", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const spanElement = screen.getByLabelText(/رمز عبور/i);
  const inputs = screen.getAllByRole("textbox");
  expect(spanElement).toBeInTheDocument();
  expect(inputs).toHaveLength(4);
  expect(spanElement.tagName).toBe("INPUT");
});

test("should allow users to signup", () => {
  render(
    <Router>
      <SignUp />
    </Router>
  );
  const firstNameInput = screen.getAllByLabelText(/نام/i);
  const lastNameInput = screen.getByLabelText(/نام خانوادگی/i);
  const emailInput = screen.getByLabelText(/ایمیل/i);
  const userNameInput = screen.getByLabelText(/نام کاربری/i);
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  const submitButton = screen.getByRole("submit-btn");

  fireEvent.change(firstNameInput[0], { target: { value: "John" } });
  fireEvent.change(lastNameInput, { target: { value: "Doe" } });
  fireEvent.change(userNameInput, { target: { value: "johndoe" } });
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  user.click(submitButton);
});

test("password must be at least 8 characters", () => {
  const { getByText } = render(
    <Router>
      <SignUp />
    </Router>
  );
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  const submitButton = screen.getByRole("submit-btn");
  fireEvent.change(passwordInput, { target: { value: "pass" } });
  user.click(submitButton);
  expect(getByText(/رمز عبور باید بالای 8 کاراکتر باشد/i)).toBeInTheDocument();
});

test("password must be have number and letter", () => {
  const { getByText } = render(
    <Router>
      <SignUp />
    </Router>
  );
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  const submitButton = screen.getByRole("submit-btn");
  fireEvent.change(passwordInput, { target: { value: "navidebrahimi" } });
  user.click(submitButton);
  expect(
    getByText(/رمز عبور باید شامل کاراکتر و عدد باشد/i)
  ).toBeInTheDocument();
});

test("password must be have number and letter and !@#$%^&*", () => {
  const { getByText } = render(
    <Router>
      <SignUp />
    </Router>
  );
  const passwordInput = screen.getByLabelText(/رمز عبور/i);
  const submitButton = screen.getByRole("submit-btn");
  fireEvent.change(passwordInput, { target: { value: "navidebrahimi123" } });
  user.click(submitButton);
  expect(
    getByText(/رمز عبور باید شامل حداقل یکی از کاراکتر های/i)
  ).toBeInTheDocument();
});

test("email must be valid", () => {
  const { getByText } = render(
    <Router>
      <SignUp />
    </Router>
  );
  const emailInput = screen.getByLabelText(/ایمیل/i);
  const submitButton = screen.getByRole("submit-btn");
  fireEvent.change(emailInput, { target: { value: "john.doe" } });
  user.click(submitButton);
  expect(getByText(/ایمیل وارد شده صحیح نمی باشد/i)).toBeInTheDocument();
});

test("have link to login page", () => {
  const { getByText } = render(
    <Router>
      <SignUp />
    </Router>
  );
  const linkElement = getByText(/اکانت دارید؟ وارد شوید/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement.tagName).toBe("A");
});
