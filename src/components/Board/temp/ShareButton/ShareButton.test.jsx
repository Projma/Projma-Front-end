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

  test("closes modal on clear button click", () => {
    render(<ShareButton />);

    // Click the ShareButton to open the modal
    const shareButton = screen.getByRole("button", { name: "اشتراک" });
    fireEvent.click(shareButton);

    // Click the clear button to close the modal
    const clearButton = screen.getByRole("button", { name: "clear" });
    fireEvent.click(clearButton);

    // Assert that the modal is closed
    const modalTitle = screen.queryByText("بورد را به اشتراک بگذارید");
    expect(modalTitle).not.toBeInTheDocument();
  });

  test("copies invite link on copy button click", async () => {
    render(<ShareButton />);

    // Click the ShareButton to open the modal
    const shareButton = screen.getByRole("button", { name: "اشتراک" });
    fireEvent.click(shareButton);

    // Click the copy button to copy invite link
    const copyButton = screen.getByRole("button", { name: "کپی لینک" });
    fireEvent.click(copyButton);

    // Wait for the invite link to be copied
    await screen.findByText("لینک کپی شد.");

    // Assert that the invite link is copied
    const inviteLink = screen.getByText(
      "http://localhost:3000/borad_invitation/"
    );
    expect(inviteLink).toBeInTheDocument();
  });

  // Add more tests for other functionalities of the ShareButton component
});
