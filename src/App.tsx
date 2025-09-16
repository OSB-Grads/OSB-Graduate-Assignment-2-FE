import React, { useEffect } from "react";
import ButtonComponent from './components/Button/ButtonComponent';
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import About from "./pages/About";
import "./App.css";
// import Transaction from "./pages/Transaction";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/loginPage/loginPage";
import Register from "./pages/Register/Register";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";
import AccountPage from "./pages/AccountPage/AccountPage";
import AccountDetailPage from './pages/AccountDetailsPage'
import { setToken } from "./utils/httpClientUtil";
import Header from "./components/Header/Header";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";

import ProductPage from "./pages/productsPage/ProductPage";
import AccountDetails from "./pages/accountDetails/accountDetails";
import DummyAccountPage from "./pages/DummyData";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import Error404 from "./pages/ErrorPages/Error404";
import GenericError from "./pages/ErrorPages/GenericError";
import Maintenance from "./pages/ErrorPages/Maintenance";
import HelpAndSupport from "./pages/HelpAndSupport/HelpAndSupport";
import PaymentPage from "./pages/PaymentPage/PaymentPage";


export default function App() {
  const { authenticate, isAuthenticated } = useAuthStore();
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
      <Header></Header>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />


        <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/transactions" element={< TransactionPage />} />
          <Route path="about" element={<About />} />
          <Route path="/products" element={<ProductPage />}></Route>
          <Route path='/accountsPage' element={<AccountPage />}></Route>
          <Route path='/account-details/:accountNumber' element={<AccountDetailPage></AccountDetailPage>}></Route>
          <Route path='/payments' element={<PaymentPage/>}/>
    
        </Route>
        <Route path="/error404" element={< Error404 />}></Route>
        <Route path="/genericError" element={< GenericError />}></Route>
        <Route path="/maintenance" element={< Maintenance />}></Route>
      </Routes>
    </>


  );
}
