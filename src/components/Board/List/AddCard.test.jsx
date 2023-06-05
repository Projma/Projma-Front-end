import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import user from "@testing-library/user-event";
import AddCard from "./AddCard";
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

test("show add list button", () => {});

// describe("after click add list", () => {
//   it("show name input text", () => {
//     render(<AddList />);
//     const add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const input = screen.getByPlaceholderText(
//       /اسم لیست را در این بخش بنویسید/i
//     );
//     expect(input).toBeInTheDocument();
//   });
//   it("show add button", () => {
//     render(<AddList />);
//     const add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const button = screen.getByRole("button", { name: /افزودن/i });
//     expect(button).toBeInTheDocument();
//   });
//   it("click on add button", () => {
//     render(<AddList />);
//     let add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const button = screen.getByRole("button", { name: /افزودن/i });
//     user.click(button);
//     add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     expect(add).toBeInTheDocument();
//   });
//   it("show cancel button", () => {
//     render(<AddList />);
//     const add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const button = screen.getByRole("button", { name: /لغو/i });
//     expect(button).toBeInTheDocument();
//   });
//   it("click on cancel button", () => {
//     render(<AddList />);
//     let add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const button = screen.getByRole("button", { name: /لغو/i });
//     user.click(button);
//     add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     expect(add).toBeInTheDocument();
//   });
//   it("enter on textfield", () => {
//     render(<AddList />);
//     let add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const input = screen.getByPlaceholderText(
//       /اسم لیست را در این بخش بنویسید/i
//     );
//     fireEvent.keyDown(input, { key: "Enter", code: "Enter", value: "A" });
//     add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     expect(add).toBeInTheDocument();
//   });
//   it("type in textfield", () => {
//     render(<AddList />);
//     let add = screen.getByRole("button", { name: /ایجاد لیست/i });
//     user.click(add);
//     const input = screen.getByPlaceholderText(
//       /اسم لیست را در این بخش بنویسید/i
//     );
//     fireEvent.change(input, { target: { value: "Hello, world!" } });
//     expect(input.value).toBe("Hello, world!");
//   });
// });
