import React from "react";
import { render, waitFor } from "@testing-library/react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import BoardInvitation from "./BoardInvitation";
import apiInstance from "../utilities/axiosConfig";

jest.mock("react-helmet", () => ({
  Helmet: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../utilities/axiosConfig", () => ({
  post: jest.fn(),
}));

describe("BoardInvitation", () => {
  beforeEach(() => {
    Helmet.mockImplementation(({ children }) => children);
    useParams.mockReturnValue({ token: "dummyToken", id: "dummyId" });
    useNavigate.mockReturnValue(jest.fn());
  });

  test("renders success message and navigates to board page on successful API response", async () => {
    const { getByText } = render(<BoardInvitation />);
    const mockApiResponse = {};

    apiInstance.post.mockResolvedValue({ data: mockApiResponse });

    await waitFor(() => {
      expect(getByText("با موفقیت به بورد اضافه شدید!")).toBeInTheDocument();
      expect(getByText("در حال انتقال به صفحه بورد")).toBeInTheDocument();
    });
  });

  test("navigates to board page when user is already a member of the board", async () => {
    const navigateMock = jest.fn();
    useNavigate.mockReturnValue(navigateMock);

    const { getByText } = render(<BoardInvitation />);
    const mockError = {
      response: { data: "User is already a member of this board" },
    };

    apiInstance.post.mockRejectedValue(mockError);

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith(`/kanban/dummyId/`);
      expect(getByText("با موفقیت به بورد اضافه شدید!")).not.toBeInTheDocument();
      expect(getByText("در حال انتقال به صفحه بورد")).not.toBeInTheDocument();
    });
  });

  test("renders failure message on error response from API", async () => {
    const { getByText } = render(<BoardInvitation />);
    const mockError = {
      response: { data: "dummyError" },
    };

    apiInstance.post.mockRejectedValue(mockError);

    await waitFor(() => {
      expect(getByText("متاسفانه به بورد اضافه نشدید!")).toBeInTheDocument();
      expect(getByText("لطفا دوباره تلاش کنید")).toBeInTheDocument();
    });
  });
});
