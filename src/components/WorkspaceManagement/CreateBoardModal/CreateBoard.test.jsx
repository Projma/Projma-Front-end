import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import user from "@testing-library/user-event";
import CreateBoardModal from "./CreateBoard";
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

test("it shows an input for name, an input for description, another input for choosing file and also a button for creating", async () => {
  const onSubmit = vi.fn();
  render(
    <Router>
      <CreateBoardModal
        params={{}}
        on_submit={onSubmit}
        boards={{}}
        setBoards={() => {}}
      />
    </Router>
  );
  const add = document.querySelector("#add_button");
  user.click(add);
  expect(document.querySelector("#board_name")).toBeInTheDocument();
  expect(document.querySelector("#description")).toBeInTheDocument();
  expect(document.querySelector("input[type=file]")).toBeInTheDocument();
  expect(document.querySelector("input[type=submit]")).toBeInTheDocument();
});

test("it opens the modal after clicking on add board button", async () => {
  const onSubmit = vi.fn();
  render(
    <Router>
      <CreateBoardModal
        params={{}}
        on_submit={onSubmit}
        boards={{}}
        setBoards={() => {}}
      />
    </Router>
  );
  const add = document.querySelector("#add_button");
  user.click(add);
  expect(screen.getByText("ساخت بورد جدید")).toBeInTheDocument();
});

// test("it calls on_submit function after entering the info and then clicking on create button", async () => {
//   const onSubmit = vi.fn();
//   render(
//     <Router>
//       <CreateBoardModal
//         params={{}}
//         on_submit={onSubmit}
//         boards={{}}
//         setBoards={() => {}}
//       />
//     </Router>
//   );
//   const add = document.querySelector("#add_button");
//   user.click(add);
//   const name = document.querySelector("#board_name");
//   const description = document.querySelector("#description");
//   const file_inp = document.querySelector("input[type=file]");
//   const create_button = document.querySelector("input[type=submit]");
//   user.click(name);
//   user.keyboard("test board");
//   user.click(description);
//   user.keyboard("test description");
//   user.click(create_button);
//   expect(onSubmit).toHaveBeenCalled();
// });

// test("it calls on_submit function with correct parameters after entering the info and then clicking on create button", async () => {
//   const onSubmit = vi.fn();
//   render(
//     <CreateBoardModal
//       params={{}}
//       on_submit={onSubmit}
//       boards={{}}
//       setBoards={() => {}}
//     />
//   );
//   const add = document.querySelector("#add_button");
//   user.click(add);
//   const name = document.querySelector("#board_name");
//   const description = document.querySelector("#description");
//   const file_inp = document.querySelector("input[type=file]");
//   const create_button = document.querySelector("input[type=submit]");
//   user.click(name);
//   user.keyboard("test board");
//   user.click(description);
//   user.keyboard("test description");
//   user.click(create_button);
//   expect(onSubmit).toHaveBeenCalledTimes(1);
//   expect(onSubmit).toHaveBeenNthCalledWith(
//     1,
//     expect.objectContaining({
//       name: "test board",
//       description: "test description",
//     })
//   );
// });

test("it gives error when trying to create a new board without specifying name for that", async () => {
  const onSubmit = vi.fn();
  render(
    <Router>
      <CreateBoardModal
        params={{}}
        on_submit={onSubmit}
        boards={{}}
        setBoards={() => {}}
      />
    </Router>
  );
  const add = document.querySelector("#add_button");
  user.click(add);
  const name = document.querySelector("#board_name");
  const description = document.querySelector("#description");
  const file_inp = document.querySelector("input[type=file]");
  const create_button = document.querySelector("input[type=submit]");
  user.click(create_button);
  expect(screen.getByText("نام بورد نمی تواند خالی باشد")).toBeInTheDocument();
});
