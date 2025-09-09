import {render,screen} from "@testing-library/react";
import { MemoryRouter,Routes,Route } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import ProtectedRoute from "./protectedroutes";

const Dashboard =() =><div>Dashboard Page</div>
const Login = () =><div>Login Page</div>

describe("ProtectedRoute",()=>{
    beforeEach(()=>{
        useAuthStore.setState({token:null,isAuthenticated:false});
    });
    it("redirects to login if not authenticated",()=>{
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText("Login Page")).toBeInTheDocument();
    });
    it("redirects to dashboard if  authenticated",()=>{
        useAuthStore.setState({token:"abc1234",isAuthenticated:true});
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <Routes>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/dashboard" element={ <ProtectedRoute> <Dashboard /></ProtectedRoute>}/>
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText("Dashboard Page")).toBeInTheDocument();
    });

})