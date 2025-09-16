import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";

jest.mock("../../store/AuthStore/authStore");

import useAuthStore from "../../store/AuthStore/authStore";

const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;

describe("Header component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders logo and company name", () => {
    mockedUseAuthStore.mockReturnValue({ isAuthenticated: false });
    render(<Header />);

    expect(screen.getByAltText(/logo image/i)).toBeInTheDocument();
    expect(screen.getByText(/FinanceFirst/i)).toBeInTheDocument();
  });

  test("shows bell icon and profile image when authenticated", () => {
    mockedUseAuthStore.mockReturnValue({ isAuthenticated: true });
    render(<Header />);

    expect(screen.getByAltText(/bell-icon/i)).toBeInTheDocument();
    expect(screen.getByRole("img",{name:"profile-image"})).toBeInTheDocument();

    expect(screen.queryByRole("button", { name: /help/i })).not.toBeInTheDocument();
  });

  test("shows Help button when not authenticated", () => {
    mockedUseAuthStore.mockReturnValue({ isAuthenticated: false });
    render(<Header />);

    expect(screen.getByRole("button", { name: /help/i })).toBeInTheDocument();
    expect(screen.queryByAltText(/bell-icon/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("img", { name: "bell-icon" })).not.toBeInTheDocument();
  });
});
