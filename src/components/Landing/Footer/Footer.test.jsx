import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";
import useTheme from "../../../hooks/useTheme";

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

describe("Footer", () => {
  test("renders the footer 1st part correctly", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("اجتماعی")).toBeInTheDocument();
    expect(getByText("تلگرام")).toBeInTheDocument();
    expect(getByText("اینستاگرام")).toBeInTheDocument();
    expect(getByText("توییتر")).toBeInTheDocument();
    expect(getByText("لینکدین")).toBeInTheDocument();
  });

  test("renders the footer correctly 2nd part", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("تماس با ما")).toBeInTheDocument();
    expect(getByText("تلفن")).toBeInTheDocument();
    expect(getByText("آدرس")).toBeInTheDocument();
    expect(getByText("ایمیل")).toBeInTheDocument();
  });

  test("renders the footer correctly 3rd part", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("درباره ما")).toBeInTheDocument();
    expect(getByText("خدمات")).toBeInTheDocument();
    expect(getByText("پشتیبانی")).toBeInTheDocument();
    expect(getByText("قیمت گذاری")).toBeInTheDocument();
  });

  test("renders the footer correctly 3rd part", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("All Rights Reserved © Projma.ir")).toBeInTheDocument();
  });
});
