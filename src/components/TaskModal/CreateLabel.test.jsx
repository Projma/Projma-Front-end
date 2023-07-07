// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// import user from "@testing-library/user-event";
// import CreateLabel from "./CreateLabel";
// import useTheme from "../../hooks/useTheme";

// vi.mock("../../hooks/useTheme", () => ({
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

// test("it shows a textbox for label name and input color for label color and a button for creating", async () => {
//   render(
//     <CreateLabel setShowCreate={() => {}} params={{}} setAllLabels={() => {}} />
//   );
//   const label_name = screen.getByRole("textbox");
//   expect(label_name).toBeInTheDocument();
//   const color_input = document.querySelector("input[type=color]");
//   expect(color_input).toBeInTheDocument();
//   const create_btn = document.querySelector("#create_label_button");
//   expect(create_btn).toBeInTheDocument();
// });

// test("it closes create label popover after clicking create button", async () => {
//   const setAllLabels = vi.fn();
//   const setShowCreate = vi.fn();
//   render(
//     <CreateLabel
//       setShowCreate={setShowCreate}
//       params={{}}
//       setAllLabels={setAllLabels}
//     />
//   );
//   const label_name = screen.getByRole("textbox");
//   user.click(label_name);
//   user.keyboard("some name");
//   const create_btn = document.querySelector("#create_label_button");
//   user.click(create_btn);
//   await waitFor(() => {
//     expect(setShowCreate).toHaveBeenCalled();
//   });
// });

// // test("it show error toast after clicking create button withuot entering label name", async () => {
// //   const setAllLabels = vi.fn();
// //   const setShowCreate = vi.fn();
// //   render(
// //     <CreateLabel
// //       setShowCreate={setShowCreate}
// //       params={{}}
// //       setAllLabels={setAllLabels}
// //     />
// //   );
// //   const create_btn = document.querySelector("#create_label_button");
// //   user.click(create_btn);

// //   await waitFor(() => {
// //     screen.logTestingPlaygroundURL();
// //     expect(
// //       screen.getByText("عنوان برچسب نمیتواند خالی باشد")
// //     ).toBeInTheDocument();
// //   });
// // });
