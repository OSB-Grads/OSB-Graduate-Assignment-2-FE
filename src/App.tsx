import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Alerts from './components/Toast/Alerts';
import Home from './pages/Home/Home';
import Transaction from "./pages/Transaction";
import useAuthStore from "./store/authStore";
import { setToken } from "./utils/httpClientUtil";

export default function App() {
  const { authenticate } = useAuthStore();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      authenticate(true);
    }
  }, [])

  return (
    <div className="web-window">
      <div>
        <Header></Header>
        <Alerts />
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
    </div>

  );
}
