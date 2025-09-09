import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";



export default function App() {
  return (
    
      <Routes>
  
  

    <Route path="/" element = < LoginPage /> />
  
  
</Routes>

    
  );
}



