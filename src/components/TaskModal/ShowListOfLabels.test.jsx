import { render, screen } from "@testing-library/react";

import user from "@testing-library/user-event";
import ShowListOfLabels from "./ShowListOfLabels";
import { prettyDOM } from "@testing-library/dom";

// allLabels,
//   change_label_checked,
//   handleEditPage,
test("it shows all the labels in the board", async () => {
  const change_label_checked = vi.fn();
  const handleEditPage = vi.fn();
  const allLabels = [
    {
      id: 1,
      title: "title1",
      color: "#fffa",
      checked: true,
    },
    {
      id: 2,
      title: "title2",
      color: "#fffa",
      checked: false,
    },
    {
      id: 3,
      title: "title3",
      color: "#fffa",
      checked: true,
    },
    {
      id: 4,
      title: "title4",
      color: "#fffa",
      checked: false,
    },
    {
      id: 5,
      title: "title5",
      color: "#fffa",
      checked: true,
    },
  ];
  render(
    <ShowListOfLabels
      change_label_checked={change_label_checked}
      handleEditPage={handleEditPage}
      allLabels={allLabels}
    />
  );
  const inputs = document.querySelectorAll("input[type=checkbox]");
  expect(inputs).toHaveLength(allLabels.length);
});

test("it shows task labels with checkbox checked and other labels with checkbox unchecked", async () => {
  const change_label_checked = vi.fn();
  const handleEditPage = vi.fn();
  const allLabels = [
    {
      id: 1,
      title: "title1",
      color: "#fffa",
      checked: true,
    },
    {
      id: 2,
      title: "title2",
      color: "#fffa",
      checked: false,
    },
    {
      id: 3,
      title: "title3",
      color: "#fffa",
      checked: true,
    },
    {
      id: 4,
      title: "title4",
      color: "#fffa",
      checked: false,
    },
    {
      id: 5,
      title: "title5",
      color: "#fffa",
      checked: true,
    },
  ];
  render(
    <ShowListOfLabels
      change_label_checked={change_label_checked}
      handleEditPage={handleEditPage}
      allLabels={allLabels}
    />
  );
  const inputs = document.querySelectorAll("input[type=checkbox]");
  for (let i = 0; i < inputs.length; i++) {
    expect(inputs[i].checked).toBe(allLabels[i].checked);
  }
});

test("it shows names and colors of labels correctly", async () => {
  const change_label_checked = vi.fn();
  const handleEditPage = vi.fn();
  const allLabels = [
    {
      id: 1,
      title: "title1",
      color: "#fffa",
      checked: true,
    },
    {
      id: 2,
      title: "title2",
      color: "#fcba03",
      checked: false,
    },
    {
      id: 3,
      title: "title3",
      color: "#991c43",
      checked: true,
    },
    {
      id: 4,
      title: "title4",
      color: "#451c99",
      checked: false,
    },
    {
      id: 5,
      title: "title5",
      color: "#1c9933",
      checked: true,
    },
  ];
  render(
    <ShowListOfLabels
      change_label_checked={change_label_checked}
      handleEditPage={handleEditPage}
      allLabels={allLabels}
    />
  );
  // const inputs = document.querySelectorAll("input[type=checkbox]");
  const colors = screen.getAllByRole("color_box");
  console.log(prettyDOM(colors[0]));
  // expect(colors).toHaveLength(5);
  for (let i = 0; i < allLabels.length; i++) {
    expect(screen.getByText(allLabels[i].title)).toBeInTheDocument();
    expect(colors[i]).toHaveStyle(`background-color: ${allLabels[i].color}`);
  }
});
