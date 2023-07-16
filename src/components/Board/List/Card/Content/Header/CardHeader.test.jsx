import React from "react";
import { render, screen } from "@testing-library/react";
import CardHeader from "./CardHeader";

vi.mock("../../../../../../hooks/useTheme.jsx", () => ({
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

describe("CardHeader", () => {
  test("renders properly", () => {
    // Mock the useBoard hook to provide a default value for setIsReq
    vi.mock("../../../../../../hooks/useBoard", () => ({
      __esModule: true,
      default: () => ({ removeCard: vi.fn() }), // provide a mock removeCard function
    }));

    render(<CardHeader cardId={123} />);

    // Assert that the component renders without errors
    const cardHeaderElement = screen.getByTestId("card-header");
    expect(cardHeaderElement).toBeInTheDocument();

    // You can also perform additional assertions or interaction tests
    // based on your specific requirements
  });
});

