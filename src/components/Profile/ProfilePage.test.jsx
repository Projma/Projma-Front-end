// import React from "react";
// import { render, screen, fireEvent, getByRole } from "@testing-library/react";

// import Profile from "./ProfilePage";

// test("number of textfield", () => {
//   render(<Profile />);
//   const inputs = screen.getAllByRole("textbox");
//   expect(inputs).toHaveLength(4);
// });

// test("have submit button", () => {
//   render(<Profile />);
//   const submitButton = screen.getByRole("submit-btn");
//   expect(submitButton).toBeInTheDocument();
// });

// test("check textfield type", () => {
//   render(<Profile />);
//   const lastNameInput = screen.getByLabelText(/نام خانوادگی/i);
//   const bioInput = screen.getByLabelText(/درباره/i);
//   expect(lastNameInput).toBeInTheDocument();
//   expect(bioInput).toBeInTheDocument();
//   expect(lastNameInput.tagName).toBe("INPUT");
//   expect(bioInput.tagName).toBe("TEXTAREA");
// });

// test("check have text", () => {
//   render(<Profile />);
//   const text1 = screen.getByText(/اطلاعات حساب/i);
//   const text2 = screen.getByText(/تغییر رمز عبور/i);

//   expect(text1).toBeInTheDocument();
//   expect(text2).toBeInTheDocument();
// });
