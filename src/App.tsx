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
import { initializeTokens } from "./utils/httpClientUtil";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import Error404 from "./pages/ErrorPages/Error404";
import GenericError from "./pages/ErrorPages/GenericError";
import Maintenance from "./pages/ErrorPages/Maintenance";

import HelpAndSupport from "./pages/HelpAndSupport/HelpAndSupport";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ProductPage from "./pages/productsPage/ProductPage";
import AccountDetails from "./pages/accountDetails/accountDetails";
import AdminPage from "./pages/AdminPage/AdminPage";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import SetPassword from "./pages/SetPassword/SetPassword";

export default function App() {
  const { authenticate, isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    // Initialize tokens from localStorage when app starts
    initializeTokens();
    
    // Check if user is authenticated
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      authenticate(true);
    }
  }, [authenticate]);
  
  console.log("VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
  // console.log("VITE_API_BASE_URL:", process.env.VITE_API_BASE_URL);

  return (
    <>
      <Header />
      <Alerts />

      <Routes>
        <Route path="/login" element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/adminPage" element={<AdminPage/>}/> */}
        <Route path="/adminPage"  element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminPage/></ProtectedRoute>}/>
        <Route path = "/forgotPassword" element ={<ForgotPassword />} />
        
        

        <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/transactions" element={<ProtectedRoute>< TransactionPage /></ProtectedRoute>} />
          <Route path="about" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>}></Route>
          <Route path="/profile" element={<ProtectedRoute><ViewUserProfile></ViewUserProfile></ProtectedRoute>}/>
          <Route path='/accountsPage' element={<ProtectedRoute><AccountPage /></ProtectedRoute>}></Route>
          
          <Route path='/account-details/:accountNumber' element={<ProtectedRoute><AccountDetails/></ProtectedRoute>}></Route>
          <Route path='/payments' element={<ProtectedRoute><PaymentPage/></ProtectedRoute>}/>
        </Route>
        
        <Route path="/help" element={<HelpAndSupport />} />
        <Route path="/error404" element={< Error404 />}></Route>
        <Route path="/genericError" element={< GenericError />}></Route>
        <Route path="/maintenance" element={< Maintenance />}></Route>
        <Route path ="/SetPassword" element = {<SetPassword/>}></Route>
      </Routes>
    </>
  );
}