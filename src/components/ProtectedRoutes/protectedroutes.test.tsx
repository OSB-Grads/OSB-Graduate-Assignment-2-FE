import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protectedroutes";
//mock
jest.mock("../../store/AuthStoreGetters", () => ({
    isAuthenticated: jest.fn(),
}));
const Dashboard = () => <div>Dashboard Page</div>;
const Login = () => <div>Login Page</div>;
describe("ProtectedRoute", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("redirects to login if not authenticated", async () => {
        const { isAuthenticated } = require("../../store/AuthStoreGetters");
        //mock
        isAuthenticated.mockReturnValue(false);
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Login Page")).toBeInTheDocument();
        });
    });


    it("redirects to dashboard if authenticated", async () => {
        const { isAuthenticated } = require("../../store/AuthStoreGetters");
        //mock
        isAuthenticated.mockReturnValue(true);

        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
        });
    });
});
