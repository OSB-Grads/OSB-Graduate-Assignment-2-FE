import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";

import DummyAccountPage from "./pages/dummyaccount";


export default function App() {
  return (
    
      <Routes>
  
  {/*<Route path="/" element={<DummyAccountPage />} />*/}

    <Route path="/" element = < LoginPage /> />
  
  
</Routes>

    
  );
}



