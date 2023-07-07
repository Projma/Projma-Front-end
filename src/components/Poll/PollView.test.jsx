import { render, screen } from "@testing-library/react";
import PollView from "./PollView";

vi.mock("../../hooks/useTheme.jsx", () => ({
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

describe("PollView", () => {
  beforeEach(() => {
    // Mock any necessary dependencies or setup needed for the tests
  });

  it("renders the question correctly", () => {
    const question = "What is your favorite color?";
    render(
      <PollView
        Multi={false}
        question={question}
        isOpen={true}
        Anonymous={false}
        pollId={1}
        handleReRender={() => {}}
      />
    );

    const questionElement = screen.getByText(question);
    expect(questionElement).toBeInTheDocument();
  });
});