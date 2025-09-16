import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Leftnavbar from "./Leftnavbar";
import { BrowserRouter } from "react-router-dom";

import useAuthStore from "../../store/AuthStore/authStore";
import { LeftnavItems } from "../../data/LeftnavData";

jest.mock("../../store/AuthStore/authStore");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useLocation: jest.fn(),
}));

describe("Leftnavbar component", () => {
  const mockedUseAuthStore = useAuthStore as jest.MockedFunction<typeof useAuthStore>;
  const mockNavigate = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseAuthStore.mockReturnValue({
      logout: mockLogout,
    });

    const reactRouterDom = require("react-router-dom");
    reactRouterDom.useNavigate.mockReturnValue(mockNavigate);
  });

  function renderComponent() {
    return render(
      <BrowserRouter>
        <Leftnavbar />
      </BrowserRouter>
    );
  }

  test("renders all navigation items", () => {
    const reactRouterDom = require("react-router-dom");
    reactRouterDom.useLocation.mockReturnValue({ pathname: "/" });

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
  ])("path %s highlights %s nav item with active styles", (path, label) => {
    const reactRouterDom = require("react-router-dom");
    reactRouterDom.useLocation.mockReturnValue({ pathname: path });

    renderComponent();

    const navItemText = screen.getByText(label);
    const wrapper = navItemText.closest(".navbar-element");

    expect(wrapper).toHaveStyle({
      backgroundColor: 'var(--color-secondary)',
    });
  });

  test("clicking nav item calls navigate with correct path", () => {
    const reactRouterDom = require("react-router-dom");
    reactRouterDom.useLocation.mockReturnValue({ pathname: "/" });

    renderComponent();

    LeftnavItems.forEach((item) => {
      const navItem = screen.getByText(item.label);
      fireEvent.click(navItem);
      expect(mockNavigate).toHaveBeenCalledWith(item.path);
    });
  });

  test("clicking Logout calls logout function", () => {
    const reactRouterDom = require("react-router-dom");
    reactRouterDom.useLocation.mockReturnValue({ pathname: "/" });

    renderComponent();

    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);

    expect(mockLogout).toHaveBeenCalled();
  });

  test("clicking Help and Support navigates to /help", () => {
    const reactRouterDom = require("react-router-dom");
    reactRouterDom.useLocation.mockReturnValue({ pathname: "/" });

    renderComponent();

    const helpBtn = screen.getByText(/Help and Support/i);
    fireEvent.click(helpBtn);

    expect(mockNavigate).toHaveBeenCalledWith("/help");
  });
});
