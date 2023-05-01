import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import user from "@testing-library/user-event";
import EditModal from "./EditModal";

test("it shows two textbox inputs for workspace name and description and one select input for workspace type and a button for saving", async () => {
  render(
    <EditModal
      params={{ id: 5 }}
      showToast={() => {}}
      workspace={{}}
      setWorkspace={() => {}}
    />
  );
  const editIcon = screen.getByTestId("EditIcon");
  user.click(editIcon);
  // screen.logTestingPlaygroundURL();
  const inputs = screen.getAllByRole("textbox");
  const select_ws_type = screen.getByRole("select_ws_type");
  const button = screen.getByRole("save_button");
  expect(inputs).toHaveLength(2);
  expect(select_ws_type).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test("it shows the information of workspace correctly", async () => {
  const workspace = {
    id: 1,
    name: "Test Workspace",
    description: "This is a test workspace",
    type: "education",
  };
  render(
    <EditModal
      params={{ id: workspace.id }}
      showToast={() => {}}
      workspace={workspace}
      setWorkspace={() => {}}
    />
  );
  const editIcon = screen.getByTestId("EditIcon");
  user.click(editIcon);
  const nameInput = screen.getByLabelText("نام فضای کاری");
  const descriptionInput = screen.getByLabelText("توضیحات");
  // const typeInput = screen.getByRole("select_ws_type");
  expect(nameInput).toHaveValue(workspace.name);
  expect(descriptionInput).toHaveValue(workspace.description);
});

// test("gggggggggggggggggg", async () => {
//   const spy = vi.spyOn(EditModal.prototype, "edit_workspace");
//   const { getByRole } = render(
//     <EditModal
//       params={{ id: 5 }}
//       showToast={() => {}}
//       workspace={{}}
//       setWorkspace={() => {}}
//     />
//   );
//   const button = getByRole("save_button");
//   fireEvent.click(button);
//   expect(spy).toHaveBeenCalledTimes(1);
//   spy.mockRestore();
//   // const editIcon = screen.getByTestId("EditIcon");
//   // user.click(editIcon);
//   // const inputs = screen.getAllByRole("textbox");
//   // const select_ws_type = screen.getByRole("select_ws_type");
// });
