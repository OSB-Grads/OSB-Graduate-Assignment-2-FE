import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom";

jest.mock("../../store/AuthStore/authStore");

jest.mock('../../utils/httpClientUtil', () => ({
  default: {},
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
  setTokens: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));


import useAuthStore from "../../store/AuthStore/authStore";
import { BrowserRouter } from "react-router-dom";

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
    render(
      <BrowserRouter>
    <Header />
    </BrowserRouter>);

    expect(screen.getByAltText(/bell-icon/i)).toBeInTheDocument();


// Or, more specifically, target by DOM hierarchy / class:
 const profileImg = document.querySelector(".profile-info img") as HTMLImageElement;
  expect(profileImg).toBeInTheDocument();
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
