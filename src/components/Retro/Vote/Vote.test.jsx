import React from "react";
import {
  render,
  screen,
  fireEvent,
  getByRole,
  getAllByText,
  getAllByLabelText,
} from "@testing-library/react";
import { Provider } from "react-redux";
import Vote from "./Vote";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
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

test("have some text in page", () => {
  const initialState = {
    user: {
      profile_pic: null,
    },
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);
  const { getByText, getByLabelText } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Vote />
      </MemoryRouter>
    </Provider>
  );
  const text1 = getByText(/چه چیز هایی کار میکند؟/i);
  const text2 = getByText(/در کجا ها به مشکل خوردید؟/i);
  const text3 = getByText(/رای‌های باقیمانده/i);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
  expect(text3).toBeInTheDocument();
  expect(text1.tagName).toBe("P");
  expect(text2.tagName).toBe("P");
  expect(text3.tagName).toBe("DIV");
});
