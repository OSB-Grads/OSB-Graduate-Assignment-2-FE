import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";
import LoginPage from "./pages/loginPage/loginPage";
import ViewUserProfile from "./pages/ProfilePage/ViewProfilePage";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import Alerts from "./components/Toast/Alerts";
import AccountPage from "./pages/AccountPage/AccountPage";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";



import AccountDetailPage from './pages/AccountDetailsPage'
import { setToken } from "./utils/httpClientUtil";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import Error404 from "./pages/ErrorPages/Error404";
import GenericError from "./pages/ErrorPages/GenericError";
import Maintenance from "./pages/ErrorPages/Maintenance";

import HelpAndSupport from "./pages/HelpAndSupport/HelpAndSupport";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ProductPage from "./pages/productsPage/ProductPage";
import AccountDetails from "./pages/accountDetails/accountDetails";


export default function App() {
  const { authenticate, isAuthenticated } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      authenticate(true);
    }
  }, [])

  return (
    <>
      <Header />
      <Alerts />
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path="/transactions" element={<ProtectedRoute>< TransactionPage /></ProtectedRoute>} />
          <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><ViewUserProfile></ViewUserProfile></ProtectedRoute>}/>
          <Route path='/accountsPage' element={<ProtectedRoute><AccountPage /></ProtectedRoute>}></Route>
          <Route path='/account-details/:accountNumber' element={<ProtectedRoute><AccountDetails/></ProtectedRoute>}></Route>
          <Route path='/payments' element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}/>
    <Route path="/help" element={<HelpAndSupport />} />
        </Route>
           <Route path="/help" element={<HelpAndSupport />} />
        <Route path="/error404" element={< Error404 />}></Route>
        <Route path="/genericError" element={< GenericError />}></Route>
        <Route path="/maintenance" element={< Maintenance />}></Route>
      </Routes>
    </>

  );
}
