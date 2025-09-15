import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "./loginPage";
import useAuthStore from "../../store/AuthStore/authStore";
import { BrowserRouter } from "react-router-dom";

// Mock Zustand store
jest.mock("../../store/AuthStore/authStore");
// Mock useNavigate from react-router-dom
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("LoginPage", () => {
  const loginMock = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock Zustand return values
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      login: loginMock,
    });
  });

  test("renders username and password input fields with placeholders", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter your username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your password")).toBeInTheDocument();
  });

  test("allows typing in username and password fields", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");

    fireEvent.change(usernameInput, { target: { value: "myuser" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });

    expect(usernameInput).toHaveValue("myuser");
    expect(passwordInput).toHaveValue("mypassword");
  });

  test("toggles remember me checkbox", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("calls login with correct parameters on form submit", async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const usernameInput = screen.getByPlaceholderText("Enter your username");
    const passwordInput = screen.getByPlaceholderText("Enter your password");
    const checkbox = screen.getByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "myuser" } });
    fireEvent.change(passwordInput, { target: { value: "mypassword" } });
    fireEvent.click(checkbox); // rememberMe true

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("myuser", "mypassword", true);
    });
  });
  
  test("shows alert on login failure", async () => {
  // Make loginMock throw an error when called
  loginMock.mockImplementationOnce(() => {
    throw new Error("Login failed");
  });

  // Spy on window.alert
  const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

  render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );

  const submitButton = screen.getByRole("button", { name: /login/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(alertSpy).toHaveBeenCalledWith("Login failed");
  });

  alertSpy.mockRestore();
});


  test("redirects to / when authenticated", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      login: loginMock,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});

