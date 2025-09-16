import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import Transaction from "./pages/Transaction";
// import Home from "./pages/Home";


import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productsPage/ProductPage";
import Register from "./pages/Register/Register";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";
import AccountPage from "./pages/AccountPage/AccountPage";



import AccountDetailPage from './pages/AccountDetailsPage'
import { setToken } from "./utils/httpClientUtil";
import Header from "./components/Header/Header";
import HelpAndSupport from "./pages/HelpAndSupport/HelpAndSupport";


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
      <Header></Header>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

        <Route path="/transactions" element={<Transaction />} />
        <Route path="/products" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}></Route>
        <Route path='/accountsPage' element={<ProtectedRoute><AccountPage/></ProtectedRoute>}></Route>
        <Route path='/account-details/:accountNumber' element={<AccountDetailPage></AccountDetailPage>}></Route>
      </Route>

      <Route path="/help" element={<HelpAndSupport />} />

      </Routes>
      </>
    
  );
}
