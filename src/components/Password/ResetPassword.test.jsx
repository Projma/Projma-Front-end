import { render, screen, fireEvent } from "@testing-library/react";
import ResetPassword,{handleSubmit} from "./ResetPassword";
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

test("show two password inputs", async () => {
  render(<Router><ResetPassword /></Router>);
  const confirmPassword = screen.getByPlaceholderText(
    /رمز عبور خود را دوباره وارد کنید/i
  );
  const password = screen.getByPlaceholderText(/رمز عبور خود را وارد کنید/i);
  expect(confirmPassword).toBeInTheDocument();
  expect(password).toBeInTheDocument();
});

test("test number of textfield", () => {
  render(<Router><ResetPassword /></Router>);
  const inputs = screen.getAllByPlaceholderText(/وارد کنید/i);
  expect(inputs).toHaveLength(2);
});

test("show submit button", () => {
  render(<Router><ResetPassword /></Router>);
  const submitButton = screen.getByRole('button', { name: /تغییر رمز عبور/i });
  expect(submitButton).toBeInTheDocument();
});