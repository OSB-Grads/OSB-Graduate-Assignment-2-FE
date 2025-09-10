import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import Leftnavbar from "./components/Leftnavbar/Leftnavbar";
import Home from './pages/Home/Home';
import Transaction from "./pages/Transaction";
import ProductPage from "./pages/productsPage/ProductPage";
import { useEffect } from 'react';
import { getAuthStore } from './store/AuthStoreGetters';
import { setToken } from './utils/httpClientUtil';

export default function App() {
  const {authenticate} = getAuthStore();

  useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        setToken(token);
        authenticate(true);
      }
    }, [])

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
              <Route path="/products" element={<ProductPage/>}/>
            </Routes>
          </main>

        </div>
      </div>
    </div>

  );
}
