import { render, fireEvent } from "@testing-library/react";
import PollOptions from "./PollOptions";

describe("PollOptions", () => {
  it("renders without errors", () => {
    const { queryByRole } = render(<PollOptions id={1} op="" onChangeOp={() => {}} />);
    expect(queryByRole("textbox")).toBeInTheDocument();
  });

  it("calls onChangeOp with the correct arguments when input text changes", () => {
    const mockOnChangeOp = vi.fn();
    const { getByRole } = render(<PollOptions id={1} op="" onChangeOp={mockOnChangeOp} />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "New option" } });
    expect(mockOnChangeOp).toHaveBeenCalledWith(1, "New option");
  });
});