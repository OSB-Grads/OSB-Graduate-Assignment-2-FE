import { render } from "@testing-library/react";
import ProtectedRoute from "./protectedroutes";
import useAuthStore from "../../store/AuthStore/authStore";
import { getRole } from "../../utils/httpClientUtil";

const mockedNavigate = jest.fn();

// Mock react-router-dom useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

// Mock Zustand store
jest.mock("../../store/AuthStore/authStore");

// Mock getRole function
jest.mock("../../utils/httpClientUtil", () => ({
  getRole: jest.fn(),
}));

describe("ProtectedRoute", () => {
  const childrenText = "Protected Content";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("navigates to /login if not authenticated", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ isAuthenticated: false });
    (getRole as jest.Mock).mockReturnValue("USER"); // role won't matter

    render(<ProtectedRoute>{childrenText}</ProtectedRoute>);

    expect(mockedNavigate).toHaveBeenCalledWith("/login");
  });

  test("navigates to /adminPage if authenticated and role is ADMIN", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ isAuthenticated: true });
    (getRole as jest.Mock).mockReturnValue("ADMIN");

    render(<ProtectedRoute>{childrenText}</ProtectedRoute>);

    expect(mockedNavigate).toHaveBeenCalledWith("/adminPage");
  });

  test("navigates to /dashboard if authenticated and role is not ADMIN", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ isAuthenticated: true });
    (getRole as jest.Mock).mockReturnValue("USER");

    render(<ProtectedRoute>{childrenText}</ProtectedRoute>);

    expect(mockedNavigate).toHaveBeenCalledWith("/dashboard");
  });

  test("renders children regardless of navigation", () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({ isAuthenticated: true });
    (getRole as jest.Mock).mockReturnValue("USER");

    const { getByText } = render(<ProtectedRoute>{childrenText}</ProtectedRoute>);
    expect(getByText(childrenText)).toBeInTheDocument();
  });
});
