import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import CardBody from "./CardBody";
import CardLabel from "./Content/CardLabel";

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

describe("CardBody component", () => {
  let container = null;

  beforeEach(() => {
    // Set up a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // Clean up on exiting
    unmountComponentAtNode(container);
    container.remove();
  });

  it("renders without crashing", () => {
    act(() => {
      render(<CardBody title="" labels={[]} cardId="" />, container);
    });
  });

  it("displays the card title", () => {
    act(() => {
      render(<CardBody title="Test Title" labels={[]} cardId="" />, container);
    });

    const cardTitle = container.querySelector(".card_title");
    expect(cardTitle.textContent).toBe("Test Title");
  });

});