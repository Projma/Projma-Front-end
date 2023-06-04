import React from "react";
import { render, fireEvent } from "@testing-library/react";
import RecipeReviewCard from "./RecipeReviewCard";

describe("RecipeReviewCard", () => {
  test("renders card with provided props and expands/collapses on click", () => {
    const props = {
      title: "Test Recipe",
      image: "test.jpg",
      text: "This is a test recipe",
      detail: "Recipe details",
    };

    const { getByText, getByRole } = render(<RecipeReviewCard {...props} />);

    const titleElement = getByText("Test Recipe");
    const imageElement = getByRole("img");
    const textElement = getByText("This is a test recipe");
    const expandButton = getByRole("button", { name: "show more" });

    expect(titleElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toContain("test.jpg");
    expect(textElement).toBeInTheDocument();
    expect(expandButton).toBeInTheDocument();

    fireEvent.click(expandButton);

    const detailElement = getByText("Recipe details");
    expect(detailElement).toBeInTheDocument();

    fireEvent.click(expandButton);

    expect(detailElement).not.toBeInTheDocument();
  });
});
