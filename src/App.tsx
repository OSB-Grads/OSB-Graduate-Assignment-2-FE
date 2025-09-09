import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";

export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
