import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import ButtonComponent from './components/Button/ButtonComponent';
import { useAuthStore } from './store/authStore';


export default function App() {
  // const { token, isAuthenticated, login, logout } = useAuthStore();
  return (

    //  <div style={{ padding: 20 }}>
    //   <h2>Auth Zustand Store Test</h2>
    //   <p><strong>Token:</strong> {token || "No token"}</p>
    //   <p><strong>Authenticated:</strong> {isAuthenticated ? "Yes" : "No"}</p>

    //   {!isAuthenticated ? (
    //     <ButtonComponent
    //       label="Login"
    //       variant="primary"
    //       onClick={() => login("example-jwt-token-123")}
    //     />
    //   ) : (
    //     <ButtonComponent
    //       label="Logout"
    //       variant="secondary"
    //       onClick={logout}
    //     />
    //   )}
    // </div>
                                                        
    <div>                                                           {/*--------demo displaying home page and aboutpage----------*/}
      <nav style={{ display: 'flex', gap: 16, padding: 12 }}>
        <Link to="/">Home</Link>                                    {/*--------------TO BE CHANGED ------------*/}
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
    
  );
}



