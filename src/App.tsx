import React, { useEffect } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";

import About from "./pages/About";
import "./App.css";

import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from "./pages/Home/Home";
// import Home from "./pages/Home";


import LoginPage from "./pages/loginPage/loginPage";
import Register from "./pages/Register/Register";
import WebFlow from "./pages/webFlow/WebFlow";
import { setToken } from "./utils/httpClientUtil";
import useAuthStore from "./store/authStore";
import Error404 from "./pages/ErrorPages/Error404";
import TransactionPage from "./pages/TransactionPage/TransactionPage";

export default function App() {
  const {authenticate} = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if(token){
      setToken(token);
      authenticate(true);
    }
  }, [])

  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<WebFlow />}>
        <Route path = "/" element={<Home/>} />

        <Route path="/transactions" element={< TransactionPage />}/>
        <Route path="about" element={<About />} />
        <Route path ="/err" element = {<Error404/>} />

        </Route>
      </Routes>
    
  );
}
