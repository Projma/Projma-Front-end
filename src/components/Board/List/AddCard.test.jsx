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

test("show input for card name and button for adding card", () => {
  const handle_add_card = vi.fn();
  const set_card_name = vi.fn();
  render(
    <AddCard
      handleAddCardSubmit={handle_add_card}
      setCardName={set_card_name}
      cardName=""
    />
  );
  const inp = screen.getByRole("textbox", {
    name: /اسم کارت/i,
  });
  const button = screen.getByRole("button", { name: /افزودن/i });
  expect(inp).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("it calls setCardName after clicking the button", () => {
  const handle_add_card = vi.fn();
  const set_card_name = vi.fn();
  render(
    <AddCard
      handleAddCardSubmit={handle_add_card}
      setCardName={set_card_name}
      cardName=""
    />
  );
  const input = screen.getByRole("textbox", {
    name: /اسم کارت/i,
  });
  const button = screen.getByRole("button", { name: /افزودن/i });
  user.click(input);
  user.keyboard("hello, world");
  user.click(button);
  expect(set_card_name).toHaveBeenCalled();
});

test("it calls setCardName n time while n is the number of letters of input name", () => {
  const handle_add_card = vi.fn();
  const set_card_name = vi.fn();
  render(
    <AddCard
      handleAddCardSubmit={handle_add_card}
      setCardName={set_card_name}
      cardName=""
    />
  );
  const input = screen.getByRole("textbox", {
    name: /اسم کارت/i,
  });
  const button = screen.getByRole("button", { name: /افزودن/i });
  user.click(input);
  user.keyboard("hello, world");
  user.click(button);
  expect(set_card_name).toHaveBeenCalledTimes(12);
});

// test("it calls handle_add_card after inputing name completely and pushing add button", () => {
//   const handle_add_card = vi.fn();
//   const set_card_name = vi.fn();
//   render(
//     <AddCard
//       handleAddCardSubmit={handle_add_card}
//       setCardName={set_card_name}
//       cardName=""
//     />
//   );
//   const input = screen.getByRole("textbox", {
//     name: /اسم کارت/i,
//   });
//   const button = screen.getByRole("button", { name: /افزودن/i });
//   user.click(input);
//   user.keyboard("hello, world");
//   user.click(button);
//   expect(handle_add_card).toHaveBeenCalled();
// });
