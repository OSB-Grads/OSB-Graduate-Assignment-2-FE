<<<<<<< HEAD
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DummyAccountPage from './pages/DummyData';
import About from "./pages/About";

import './App.css'
import Transaction from "./pages/Transaction";
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from "./pages/Home/Home";
import ButtonComponent from './components/Button/ButtonComponent';
=======
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from './pages/Home/Home';
import Transaction from "./pages/Transaction";
>>>>>>> 1762d3db1f248cb4c8415e1b6031af8d3c5479fd

export default function App() {
  return (
    <div className="web-window">
      <div>
        <Header></Header>
        <div className="below-window">

          <Leftnavbar></Leftnavbar>
          <main className="main-component">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/transactions" element={<Transaction />} />
            </Routes>
          </main>

        </div>
      </div>
                                                            {/*--------demo displaying home page and aboutpage----------*/}
      <nav style={{ display: 'flex', gap: 16, padding: 12 }}>
        <Link to="//">Home</Link>                                    {/*--------------TO BE CHANGED ------------*/}
        <Link to="/about">About</Link>
      </nav>
      <div style={{padding :'2rem'}}>
      <h1>Button Test</h1> 
      <ButtonComponent 
    label="Click me"
    variant="primary"
    onClick={()=>alert('primary Button Clicked!')}
    />
    <ButtonComponent 
    label="Click me"
    variant="secondary"
    onClick={()=>alert('secondary Button Clicked!')}
    />
    <ButtonComponent 
    label="Disabled"
    variant="primary"
    disabled={true}
    /> 
    </div>
<<<<<<< HEAD
      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="//" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<DummyAccountPage />} />
        </Routes>
      </main>
    </div>
=======
>>>>>>> 1762d3db1f248cb4c8415e1b6031af8d3c5479fd

  );
}
