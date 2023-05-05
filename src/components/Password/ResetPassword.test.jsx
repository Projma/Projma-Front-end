import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import ResetPassword from "./ResetPassword";

test("show two inputs", async () => {
  render(<ResetPassword />);
  const confirmPassword = screen.getByPlaceholderText(
    /رمز عبور خود را دوباره وارد کنید/i
  );
  const password = screen.getByPlaceholderText(
    /رمز عبور خود را وارد کنید/i
  );
  expect(confirmPassword).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("show submit button", () => {
  render(<ResetPassword />);
  const submitButton = screen.getByRole("button");
  expect(submitButton).toBeInTheDocument();
});
