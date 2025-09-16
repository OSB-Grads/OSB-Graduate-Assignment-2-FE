import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import About from "./pages/About";
import Home from "./pages/Home/Home";

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
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import Error404 from "./pages/ErrorPages/Error404";
import GenericError from "./pages/ErrorPages/GenericError";
import Maintenance from "./pages/ErrorPages/Maintenance";
import HelpAndSupport from "./pages/HelpAndSupport/HelpAndSupport";


export default function App() {
  const { authenticate ,isAuthenticated} = useAuthStore();
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

        <Route path="/transactions" element={< TransactionPage />}/>
        
        <Route path="about" element={<About />} />
        <Route path="/products" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}></Route>
        <Route path='/accountsPage' element={<ProtectedRoute><AccountPage/></ProtectedRoute>}></Route>
        <Route path='/account-details/:accountNumber' element={<AccountDetailPage></AccountDetailPage>}></Route>
      </Route>

      <Route path="/help" element={<HelpAndSupport />} />
      <Route path = "/error404" element = {< Error404/>}></Route>
      <Route path = "/genericError" element = {< GenericError/>}></Route>
      <Route path = "/maintenance" element = {< Maintenance/>}></Route>
    </Routes>
    </>


  );
}
