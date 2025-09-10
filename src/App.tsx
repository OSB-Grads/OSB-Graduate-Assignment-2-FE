import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import About from "./pages/About";

import './App.css'
import Transaction from "./pages/Transaction";
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from "./pages/Home/Home";

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
