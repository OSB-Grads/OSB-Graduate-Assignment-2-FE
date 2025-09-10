import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from './pages/Home/Home';
import Transaction from "./pages/Transaction";

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
    </div>

  );
}
