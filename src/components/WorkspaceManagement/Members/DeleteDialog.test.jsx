import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import DeleteDialog from "./DeleteDialog";
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

test("it calls removeMember function after clicking yes button", async () => {
  const go_to_profile = vi.fn();
  const removeMember = vi.fn();
  const user_id = 1;
  render(<DeleteDialog user_id={user_id} removeMember={removeMember} />);
  const open_remove_dialog = document.querySelector("#open_remove_dialog");
  user.click(open_remove_dialog);
  const yes_button = screen.getByText("بله");
  user.click(yes_button);
  expect(removeMember).toHaveBeenCalled();
  expect(removeMember).toHaveBeenCalledWith(expect.any(Object), user_id);
});
