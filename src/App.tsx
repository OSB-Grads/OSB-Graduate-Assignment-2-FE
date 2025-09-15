import React, { useEffect } from "react";
import ButtonComponent from './components/Button/ButtonComponent';
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import About from "./pages/About";
import "./App.css";
import Transaction from "./pages/Transaction";
// import Home from "./pages/Home";



import LoginPage from "./pages/loginPage/loginPage";
import Register from "./pages/Register/Register";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";
import AccountPage from "./pages/AccountPage/AccountPage";



import AccountDetailPage from './pages/AccountDetailsPage'
import { setToken } from "./utils/httpClientUtil";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";
import Home from "./pages/Home/Home";
import ProductPage from "./pages/productsPage/ProductPage";
import AccountDetails from "./pages/accountDetails/accountDetails";
import DummyAccountPage from "./pages/DummyData";


export default function App() {
  const { authenticate } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      authenticate(true);
    } else {
      authenticate(false);
    }
  }, [])
return (
  <>
    <Header />
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes inside layout */}
      <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
        <Route index element={<Home />} />
        <Route path="transactions" element={<Transaction />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="accountsPage" element={<AccountPage />} />
        <Route path="account-details/:accountNumber" element={<AccountDetails />} />
      </Route>

      {/* Standalone route (outside main layout) */}
      <Route path="/dummy-account-details" element={<DummyAccountPage />} />
    </Routes>
  </>
);

}
