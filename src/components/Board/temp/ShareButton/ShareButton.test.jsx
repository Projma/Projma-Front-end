import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShareButton from "./ShareButton";
import useTheme from "../../../../hooks/useTheme";

vi.mock("../../../../hooks/useTheme", () => ({
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

describe("ShareButton", () => {
  test("renders ShareButton component", () => {
    render(<ShareButton />);

    // Assert that the ShareButton component is rendered
    const shareButton = screen.getByRole("button", { name: "اشتراک" });
    expect(shareButton).toBeInTheDocument();
  });

  test("opens modal on button click", () => {
    render(<ShareButton />);

    // Click the ShareButton
    const shareButton = screen.getByRole("button", { name: "اشتراک" });
    fireEvent.click(shareButton);

    // Assert that the modal is open
    const modalTitle = screen.getByText("بورد را به اشتراک بگذارید");
    expect(modalTitle).toBeInTheDocument();
  });

  // Add more tests for other functionalities of the ShareButton component
});
