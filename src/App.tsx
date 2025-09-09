import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";



export default function App() {
  return (
    
      <Routes>
  
  {/*<Route path="/" element={<DummyAccountPage />} />*/}

    <Route path="/" element = < LoginPage /> />
  
  
</Routes>

    
  );
}



