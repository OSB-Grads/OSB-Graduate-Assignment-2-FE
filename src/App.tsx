import React, { useEffect } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";

import About from "./pages/About";
import "./App.css";
import Transaction from "./pages/Transaction";
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from "./pages/Home/Home";
// import Home from "./pages/Home";


import LoginPage from "./pages/loginPage/loginPage";
import Register from "./pages/Register/Register";
import WebFlow from "./pages/webFlow/WebFlow";
import { setToken } from "./utils/httpClientUtil";
import useAuthStore from "./store/AuthStore/authStore";
import ProductPage from "./pages/productsPage/ProductPage";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";

export default function App() {
  const {authenticate} = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setToken(token);
      authenticate(true);
    }
  }, [])

  return (
    
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />

              <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
              <Route path = "/" element={<ProtectedRoute><Home/></ProtectedRoute>} />

              <Route path="transactions" element={<Transaction />} />
              <Route path="about" element={<About />} />

              <Route path="/products" element={<ProtectedRoute><ProductPage/></ProtectedRoute>}/>
              </Route>
            </Routes>
         
    
  );
}
