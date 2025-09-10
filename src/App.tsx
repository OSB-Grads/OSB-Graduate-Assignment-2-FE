import React, { type ReactNode } from 'react';
import { BrowserRouter ,Routes, Route, Link, Navigate, Router } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About';
import ButtonComponent from './components/Button/ButtonComponent';
import { useAuthStore } from './store/authStore';
import './App.css'
import Transaction from "./pages/Transaction";
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";

export default function App() {
  return (
    <div className="web-window">
      <div>
         <Header></Header>
        <div  className="below-window">

          <Leftnavbar></Leftnavbar>
            <main className="main-component">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transaction/>}/>
            </Routes>
            </main>
          
        </div>
      </div>
    </div>
    
  );
}
