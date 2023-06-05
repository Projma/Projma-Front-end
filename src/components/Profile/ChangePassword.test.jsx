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
import ChangePassword from "./ChangePassword";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import useTheme from "../../hooks/useTheme";

vi.mock("../../hooks/useTheme", () => ({
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

test("number of textfield", () => {
  const initialState = {
    user: {
      profile_pic: null,
    },
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);
  const { getAllByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    </Provider>
  );
  const inputs = getAllByRole("textbox");
  expect(inputs).toHaveLength(3);
});

test("have submit button", () => {
  const initialState = {
    user: {
      profile_pic: null,
    },
  };
  const mockStore = configureStore();
  let store = mockStore(initialState);
  const { getAllByRole } = render(
    <Provider store={store}>
      <MemoryRouter>
        <ChangePassword />
      </MemoryRouter>
    </Provider>
  );
  const inputs = getAllByRole("submit-btn");
  expect(inputs).toHaveLength(1);
});

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
        <ChangePassword />
      </MemoryRouter>
    </Provider>
  );
  const text1 = getByLabelText(/رمز عبور فعلی/i);
  const text2 = getByText(/اطلاعات حساب/i);
  const text3 = getByText(/اعمال تغییرات/i);
  expect(text1).toBeInTheDocument();
  expect(text2).toBeInTheDocument();
  expect(text3).toBeInTheDocument();
  expect(text1.tagName).toBe("INPUT");
  expect(text2.tagName).toBe("H4");
  expect(text3.tagName).toBe("BUTTON");
});
