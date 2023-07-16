import { render, screen, fireEvent } from "@testing-library/react";
import MultiVote from "./MultiVote";
import apiInstance from "../../../utilities/axiosConfig";

vi.mock("../../../hooks/useTheme.jsx", () => ({
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

vi.mock("../../../utilities/axiosConfig");

describe("MultiVote", () => {
  it("allows users to vote and triggers handleReRender when clicked", async () => {
    const options = [
      { id: 1, poll: 1, text: "Option 1" },
      { id: 2, poll: 1, text: "Option 2" },
      { id: 3, poll: 1, text: "Option 3" },
    ];
    const handleReRender = vi.fn();

    render(
      <MultiVote
        options={options}
        isOpen={true}
        isVoted={false}
        totalVotes={0}
        handleReRender={handleReRender}
      />
    );

    const checkboxes = screen.getAllByRole("checkbox");
    const voteButton = screen.getByRole("button", { name: "ثبت" });

    // Verify that checkboxes are initially unchecked
    checkboxes.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });

    // Simulate checking two options
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);

    // Verify that the checked state of options is updated
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).toBeChecked();
    expect(checkboxes[2]).not.toBeChecked();

    // Mock the apiInstance.post method
    apiInstance.post.mockResolvedValueOnce({});

    // Simulate clicking the vote button
    fireEvent.click(voteButton);

    // Wait for the component to update and handleReRender to be called
    await screen.findByRole("button", { name: "ثبت" });

    // Verify that handleReRender is called
    expect(handleReRender).toHaveBeenCalled();
  });

  it('renders the MultiVoteResult component when isOpen is false or isVoted is true', () => {
    const options = [
      { id: 1, poll: 1, text: 'Option 1' },
      { id: 2, poll: 1, text: 'Option 2' },
      { id: 3, poll: 1, text: 'Option 3' },
    ];
    const totalVotes = 100;
    render(
      <MultiVote
        options={options}
        isOpen={false}
        isVoted={true}
        totalVotes={totalVotes}
      />
    );

    // Verify that the MultiVoteResult component is rendered
    expect(screen.getByTestId('multi-vote-result')).toBeInTheDocument();
  });
  // Add more test cases to cover different scenarios and functionalities
});