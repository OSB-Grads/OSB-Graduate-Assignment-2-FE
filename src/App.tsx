import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import Leftnavbar from "./components/Leftnavbar";

import './App.css'
import Transaction from "./pages/Transaction";

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
