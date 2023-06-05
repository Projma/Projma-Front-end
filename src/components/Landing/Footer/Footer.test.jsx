import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import useTheme from "../../../hooks/useTheme";


describe("Footer", () => {
    vi.mock("../../../hooks/useTheme", () => ({
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

    test("renders the footer correctly 3rd part", () => {
        const { getByText } = render(<Footer />);
        expect(getByText("All Rights Reserved © Projma.ir")).toBeInTheDocument();
    });
});
