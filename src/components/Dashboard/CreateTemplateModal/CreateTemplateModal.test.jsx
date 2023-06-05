import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import CreateTemplateModal from "./CreateTemplateModal";

describe("CreateTemplateModal", () => {
  test("renders the modal button", () => {
    render(
      <Router>
        <CreateTemplateModal />
      </Router>
    );
    const buttonElement = screen.getByText("افزودن تمپلیت");
    expect(buttonElement).toBeInTheDocument();
  });

  // test("opens the modal when the button is clicked", () => {
  //   render(
  //     <Router>
  //       <CreateTemplateModal />
  //     </Router>
  //   );
  //   const buttonElement = screen.getByText("افزودن تمپلیت");
  //   fireEvent.click(buttonElement);
  //   screen.logTestingPlaygroundURL();
  //   const modalElement = screen.getByRole("dialog");
  //   expect(modalElement).toBeInTheDocument();
  // });

  // test("closes the modal when the close button is clicked", () => {
  //   render(
  //     <Router>
  //       <CreateTemplateModal />
  //     </Router>
  //   );
  //   const buttonElement = screen.getByText("افزودن تمپلیت");
  //   fireEvent.click(buttonElement);
  //   const closeButtonElement = screen.getByLabelText("Close");
  //   fireEvent.click(closeButtonElement);
  //   const modalElement = screen.queryByRole("dialog");
  //   expect(modalElement).not.toBeInTheDocument();
  // });

  test("displays error message when board name is empty", () => {
    render(
      <Router>
        <CreateTemplateModal />
      </Router>
    );
    const buttonElement = screen.getByText("افزودن تمپلیت");
    fireEvent.click(buttonElement);
    const createButtonElement = screen.getByText("بساز");
    fireEvent.click(createButtonElement);
    const errorElement = screen.getByText("نام تمپلیت نمی تواند خالی باشد");
    expect(errorElement).toBeInTheDocument();
  });

  test("displays error message when workspace is not selected", () => {
    render(
      <Router>
        <CreateTemplateModal />
      </Router>
    );
    const buttonElement = screen.getByText("افزودن تمپلیت");
    fireEvent.click(buttonElement);
    const createButtonElement = screen.getByText("بساز");
    fireEvent.click(createButtonElement);
    const errorElement = screen.getByText("نام فضای کاری نمی تواند خالی باشد");
    expect(errorElement).toBeInTheDocument();
  });

  // Add more tests as needed
});
