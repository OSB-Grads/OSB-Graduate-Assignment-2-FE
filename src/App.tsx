import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
// import About from "./pages/About";
// import ButtonComponent from "./components/Button/ButtonComponent";
// import LoginPage from "./pages/loginPage/loginPage";
import Register from "./pages/Register";

export default function App() {
  return (
    <div>
      {/* <nav style={{ display: 'flex', gap: 16, padding: 12 }}>
        
      </nav> */}
      {/* <Link to="/">Home</Link>                                  
        <Link to="/about">About</Link>
        <Link to = "/loginPage"> Login</Link> */}
        <Link to = "/register">Register</Link>
      {/* <div style={{ padding: "2rem" }}>
        <h1>Button Test</h1>
        <ButtonComponent
          label="Click me"
          variant="primary"
          onClick={() => alert("primary Button Clicked!")}
        />
        <ButtonComponent
          label="Click me"
          variant="secondary"
          onClick={() => alert("secondary Button Clicked!")}
        />
        <ButtonComponent label="Disabled" variant="primary" disabled={true} />
      </div> */}
      <main style={{ padding: 12 }}>
        <Routes>
          { <Route path="/" element={<Home />} />
          /*<Route path="/about" element={<About />} />
          <Route path="/loginPage" element={<LoginPage />} /> */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}
