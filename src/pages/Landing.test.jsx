import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landing from "../components/Landing/Landing";

describe("Landing", () => {
    it("renders a title in the document head", () => {
        render(<Landing />);
        expect(document.title).toEqual("پروجما");
    });

    it("renders the header component", () => {
        render(<Landing />);
        expect(screen.getByRole("banner")).toBeInTheDocument();
    });

    it("renders the first paragraph of text", () => {
        render(<Landing />);
        const paragraph = screen.getByText(
            /از ابزارهای مدیریت موجود استفاده/i
        );
        expect(paragraph).toBeInTheDocument();
    });

    it("renders the first top image", () => {
        render(<Landing />);
        const image = screen.getByRole("img", { name: /good team/i });
        expect(image).toBeInTheDocument();
    });

    it("renders the second paragraph of text", () => {
        render(<Landing />);
        const paragraph = screen.getByText(
            /از ابزارهای مدیریت موجود استفاده/i,
            { selector: "div > div > div > div > div > div > div > div > p" }
        );
        expect(paragraph).toBeInTheDocument();
    });

    it("renders the second top image", () => {
        render(<Landing />);
        const image = screen.getByRole("img", { name: /software engineer/i });
        expect(image).toBeInTheDocument();
    });

    it("renders the first card", () => {
        render(<Landing />);
        expect(screen.getByText(/Card 1 Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Card 1 Detail/i)).toBeInTheDocument();
        expect(screen.getByText(/Card 1 Text/i)).toBeInTheDocument();
    });

    it("renders the second card", () => {
        render(<Landing />);
        expect(screen.getByText(/Card 2 Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Card 2 Detail/i)).toBeInTheDocument();
        expect(screen.getByText(/Card 2 Text/i)).toBeInTheDocument();
    });

    it("renders the third card", () => {
        render(<Landing />);
        expect(screen.getByText(/Card 3 Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Card 3 Detail/i)).toBeInTheDocument();
        expect(screen.getByText(/Card 3 Text/i)).toBeInTheDocument();
    });

    it("renders the footer component", () => {
        render(<Landing />);
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
