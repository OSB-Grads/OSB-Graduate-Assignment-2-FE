import { Route, Routes } from "react-router-dom";

import "./App.css";
// import Home from "./pages/Home";


import UpdateUserProfile from "./pages/ProfilePage/UpdateProfilePage";
import ViewUserProfile from "./pages/ProfilePage/ViewProfilePage";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";
import { setToken } from "./utils/httpClientUtil";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";
import LoginPage from "./pages/loginPage/loginPage";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Transaction from "./pages/Transaction";
import About from "./pages/About";
import ProductPage from "./pages/productsPage/ProductPage";

export default function App() {
  const { authenticate } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      authenticate(true);
    }
  }, [])

  return (
   

    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        <Route path="transactions" element={<Transaction />} />
        <Route path="about" element={<About />} />
        <Route path="Edit" element={<UpdateUserProfile />} />
        <Route path="Profile" element={<ViewUserProfile />} />

        <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
      </Route>
    </Routes>


  );
}
