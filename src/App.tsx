import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import DummyAccountPage from './pages/DummyData';
import ButtonComponent from './components/Button/ButtonComponent';
export default function App() {
  return (
    <div>                                                           {/*--------demo displaying home page and aboutpage----------*/}
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
      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="//" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<DummyAccountPage />} />
        </Routes>
      </main>
    </div>

  );
}
