import React from "react";
import { render, waitFor } from "@testing-library/react";
import { useParams, useNavigate } from "react-router-dom";
import InvitePage from "./InvitePage";
import apiInstance from "../utilities/axiosConfig";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

jest.mock("../utilities/axiosConfig", () => ({
  get: jest.fn(),
}));

describe("InvitePage", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ token: "dummyToken" });
    useNavigate.mockReturnValue(jest.fn());
  });

  test("renders success message and navigates to dashboard on successful API response", async () => {
    const mockApiResponse = { data: "dummyData" };
    apiInstance.get.mockResolvedValue({ data: mockApiResponse });

    const { getByText } = render(<InvitePage />);

    await waitFor(() => {
      expect(getByText("با موفقیت به فضای کار اضافه شدید!")).toBeInTheDocument();
      expect(getByText("در حال انتقال به صفحه داشبورد")).toBeInTheDocument();
    });
  });

  test("renders failure message on error response from API", async () => {
    const mockError = { response: { data: "dummyError" } };
    apiInstance.get.mockRejectedValue(mockError);

    const { getByText } = render(<InvitePage />);

    await waitFor(() => {
      expect(getByText("متاسفانه به فضای کار اضافه نشدید!")).toBeInTheDocument();
      expect(getByText("متن خطا:")).toBeInTheDocument();
      expect(getByText("dummyError")).toBeInTheDocument();
    });
  });
});
