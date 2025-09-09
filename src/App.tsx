import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Register from './pages/Register.tsx';

export default function App() {
  return (
                                                        
    <div>                                                    {/*--------demo displaying home page and aboutpage----------*/}
      <nav style={{ display: 'flex', gap: 16, padding: 12 }}>
        <Link to="/">Home</Link>                                    {/*--------------TO BE CHANGED ------------*/}
        <Link to="/about">About</Link>
        <Link to="/register">Register</Link>
        {/* <link rel="stylesheet" href="" /> */}
      </nav>

      <main style={{ padding: 12 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path = "/register" element = {<Register />}></Route>
        </Routes>
      </main>
    </div>
  );
}



