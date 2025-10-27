import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import useAuthStore from "../../store/AuthStore/authStore";
import { LeftnavItems } from "../../data/LeftnavData";
import Leftnavbar from "./Leftnavbar";

// Mock store and router utilities
jest.mock("../../store/AuthStore/authStore");

jest.mock('../../utils/httpClientUtil', () => ({
  default: {},
  getAccessToken: jest.fn(),
  getRefreshToken: jest.fn(),
  setTokens: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockUseLocation = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useLocation: () => mockUseLocation(),
}));

describe("Leftnavbar component", () => {
  const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseAuthStore.mockReturnValue({
      logout: mockLogout,
    });
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Leftnavbar />
      </BrowserRouter>
    );

  test("renders all navigation items and bottom options", () => {
    mockUseLocation.mockReturnValue({ pathname: "/" });
    renderComponent();

    LeftnavItems.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    });

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByText(/Help and Support/i)).toBeInTheDocument();
  });

  test.each([
    ["/", "Dashboard"],
    ["/accountsPage", "Accounts"],
    ["/products", "Products"],
  ])("path %s sets %s as active", (path, label) => {
    mockUseLocation.mockReturnValue({ pathname: path });
    renderComponent();

    const navItem = screen.getByText(label);
    expect(navItem).toBeInTheDocument(); // verifies item rendered

    // optional visual check (className or DOM check)
    const wrapper = navItem.closest("a");
    expect(wrapper).toHaveAttribute("href", expect.stringContaining(path));
  });

  test("clicking a nav item calls navigate with correct path", () => {
    mockUseLocation.mockReturnValue({ pathname: "/" });
    renderComponent();

    LeftnavItems.forEach((item) => {
      const navItem = screen.getByText(item.label);
      fireEvent.click(navItem);
      expect(mockNavigate).toHaveBeenCalledWith(item.path);
    });
  });

  test("clicking Logout calls logout()", () => {
    mockUseLocation.mockReturnValue({ pathname: "/" });
    renderComponent();

    const logoutButton = screen.getByText(/Logout/i);
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  test("clicking Help and Support navigates to /help", () => {
    mockUseLocation.mockReturnValue({ pathname: "/" });
    renderComponent();

    const helpButton = screen.getByText(/Help and Support/i);
    fireEvent.click(helpButton);
    expect(mockNavigate).toHaveBeenCalledWith("/help");
  });
});

