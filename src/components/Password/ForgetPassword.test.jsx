import { render, screen, fireEvent } from "@testing-library/react";
import ForgetPassword from "./ForgetPassword";
import { BrowserRouter as Router } from "react-router-dom";

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

test("show email input", async () => {
  render(<Router><ForgetPassword /></Router>);
  const email = screen.getByPlaceholderText(
    /آدرس ایمیل خود را وارد کنید/i
  );
  expect(email).toBeInTheDocument();
});

test("test number of textfield", () => {
  render(<Router><ForgetPassword /></Router>);
  const inputs = screen.getAllByPlaceholderText(
    /آدرس ایمیل خود را وارد کنید/i
  );
  expect(inputs).toHaveLength(1);
});

test("show submit button", () => {
  render(<Router><ForgetPassword /></Router>);
  const submitButton = screen.getByRole('button', { name: /ارسال ایمیل/i });
  expect(submitButton).toBeInTheDocument();
});