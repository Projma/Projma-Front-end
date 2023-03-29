import { render, screen } from "@testing-library/react";
import SignUp from "../Signup";

it("renders learn react link", () => {
  render(<SignUp />);
  const linkElement = screen.getByPlaceholderText(/نام/i);
  expect(linkElement).toBeInTheDocument();
});
