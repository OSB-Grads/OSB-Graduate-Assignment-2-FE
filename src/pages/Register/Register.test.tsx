import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";
import useAuthStore from "../../store/AuthStore/authStore";
import useUserStore from "../../store/userstore/userstore";

// Mock Zustand stores
jest.mock("../../store/AuthStore/authStore");
jest.mock("../../store/userstore/userstore");

// Mock useNavigate
const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Register Component", () => {
  const signupMock = jest.fn();
  const createUserMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      signup: signupMock,
    });

    (useUserStore as unknown as jest.Mock).mockReturnValue({
      createUser: createUserMock,
    });
  });

  test("renders all input fields and button", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Enter your UserName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm your Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your Email ID")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter your Phone Number")).toBeInTheDocument();

    // Use getElementById as a workaround for unassociated label
    expect(document.getElementById("address")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: /Create User/i })).toBeInTheDocument();
  });

  test("does not call signup if passwords do not match", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your UserName"), {
      target: { value: "myuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your Password"), {
      target: { value: "pass1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your Password"), {
      target: { value: "pass2" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create User/i }));

    await waitFor(() => {
      expect(signupMock).not.toHaveBeenCalled();
      expect(createUserMock).not.toHaveBeenCalled();
    });
  });

  test("calls signup and createUser with correct values when form is submitted", async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your UserName"), {
      target: { value: "myuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your Password"), {
      target: { value: "mypassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm your Password"), {
      target: { value: "mypassword" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your Email ID"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Enter your Phone Number"), {
      target: { value: "1234567890" },
    });

    // Use getElementById for Address input
    const addressInput = document.getElementById("address") as HTMLInputElement;
    fireEvent.change(addressInput, {
      target: { value: "123 Main St" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Create User/i }));

    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledWith("myuser", "mypassword");
      expect(createUserMock).toHaveBeenCalledWith("John Doe", "john@example.com", "1234567890");
    });
  });

  test("navigates to / when already authenticated", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      isAuthenticated: true,
      signup: signupMock,
    });

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });
});
