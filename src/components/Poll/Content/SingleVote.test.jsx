import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SingleVote from './SingleVote';
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

describe('SingleVote', () => {
  const options = [
    { id: 1, poll: 1, text: 'Option 1' },
    { id: 2, poll: 1, text: 'Option 2' },
    { id: 3, poll: 1, text: 'Option 3' },
  ];
  const totalVotes = 100;

  it('renders the SingleVoted component when isOpen is true and isVoted is false', () => {
    const handleReRender = vi.fn();
    render(
      <SingleVote
        options={options}
        isOpen={true}
        isVoted={false}
        totalVotes={totalVotes}
        handleReRender={handleReRender}
      />
    );

    // Verify that the SingleVoted component is rendered
    expect(screen.getByTestId('single-vote-voted')).toBeInTheDocument();
  });

  it('renders the SingleVoteResult component when isOpen is false or isVoted is true', () => {
    render(
      <SingleVote
        options={options}
        isOpen={false}
        isVoted={true}
        totalVotes={totalVotes}
      />
    );

    // Verify that the SingleVoteResult component is rendered
    expect(screen.getByTestId('single-vote-result')).toBeInTheDocument();
  });
});