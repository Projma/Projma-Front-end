// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import CreateBoardModal from "./CreateBoardModal";
// import { BrowserRouter as Router } from "react-router-dom";
// import useTheme from "../../../hooks/useTheme";

// vi.mock("../../../hooks/useTheme", () => ({
//   __esModule: true,
//   default: () => ({
//     theme: {
//       name: "sun",
//       mainBg: "#e5e5e5",
//       minorBg: "#fff",
//       secondary: "#f8981c",
//       tertiary: "#f47922",
//       hover: "#f4792280",
//       primary: "#fdb713",
//     },
//     getColor: (bgColor) => "#000000",
//   }),
// }));

// describe("CreateBoardModal", () => {
//   beforeEach(() => {
//     render(
//       <Router>
//         <CreateBoardModal workspace_id={1} />
//       </Router>
//     );
//   });

//   test("renders the create board button", () => {
//     const createBoardButton = screen.getByRole("button", {
//       name: /افزودن بورد/i,
//     });
//     expect(createBoardButton).toBeInTheDocument();
//   });

//   test("opens the modal when create board button is clicked", () => {
//     const createBoardButton = screen.getByRole("button", {
//       name: /افزودن بورد/i,
//     });
//     userEvent.click(createBoardButton);

//     const modalTitle = screen.getByText(/ساخت بورد جدید/i);
//     expect(modalTitle).toBeInTheDocument();
//   });

//   // test("closes the modal when the close button is clicked", () => {
//   //   const createBoardButton = screen.getByRole("button", {
//   //     name: /افزودن بورد/i,
//   //   });
//   //   userEvent.click(createBoardButton);

//   //   const closeButton = screen.getByLabelText(/بستن/i);
//   //   userEvent.click(closeButton);

//   //   const modalTitle = screen.queryByText(/ساخت بورد جدید/i);
//   //   expect(modalTitle).not.toBeInTheDocument();
//   // });

//   test("displays error message if board name is not provided", () => {
//     const createBoardButton = screen.getByRole("button", {
//       name: /افزودن بورد/i,
//     });
//     userEvent.click(createBoardButton);

//     const submitButton = screen.getByRole("button", { name: /بساز/i });
//     userEvent.click(submitButton);

//     const errorMessage = screen.getByText(/نام بورد نمی تواند خالی باشد/i);
//     expect(errorMessage).toBeInTheDocument();
//   });

//   test("submits the form with valid data", () => {
//     const createBoardButton = screen.getByRole("button", {
//       name: /افزودن بورد/i,
//     });
//     userEvent.click(createBoardButton);

//     const boardNameInput = screen.getByLabelText(/نام بورد/i);
//     userEvent.type(boardNameInput, "My Board");

//     const submitButton = screen.getByRole("button", { name: /بساز/i });
//     userEvent.click(submitButton);

//     // Assertions for successful form submission
//     // You can mock the API response and test the resulting behavior if needed
//   });
// });
