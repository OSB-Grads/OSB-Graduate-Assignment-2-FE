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
import { setToken } from "./utils/httpClientUtil";
import TransactionPage from "./pages/TransactionPage/TransactionPage";
import Error404 from "./pages/ErrorPages/Error404";
import GenericError from "./pages/ErrorPages/GenericError";
import Header from "./components/Header/Header";
import Maintenance from "./pages/ErrorPages/Maintenance";

export default function App() {
  const { authenticate ,isAuthenticated} = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      authenticate(true);
    }
  }, [])

  return (
    <>
     {!isAuthenticated?<Header></Header>:null}
    <Routes>
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<WebFlow />}>
        <Route path="/" element={<Home />} />

        <Route path="/transactions" element={< TransactionPage />}/>
        
        <Route path="about" element={<About />} />

        <Route path="/products" element={<ProductPage />} />
      </Route>
      <Route path = "/error404" element = {< Error404/>}></Route>
      <Route path = "/genericError" element = {< GenericError/>}></Route>
      <Route path = "/maintenance" element = {< Maintenance/>}></Route>
    </Routes>
    </>


  );
}
