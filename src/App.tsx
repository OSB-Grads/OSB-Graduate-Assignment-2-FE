import { Route, Routes } from "react-router-dom";

import "./App.css";
// import Home from "./pages/Home";


import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoutes/protectedroutes";
import About from "./pages/About";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productsPage/ProductPage";
import UpdateUserProfile from "./pages/ProfilePage/UpdateProfilePage";
import ViewUserProfile from "./pages/ProfilePage/ViewProfilePage";
import Register from "./pages/Register/Register";
// import Transaction from "./pages/Transaction";
import Header from "./components/Header/Header";
import Alerts from "./components/Toast/Alerts";
import AccountPage from "./pages/AccountPage/AccountPage";
import WebFlow from "./pages/webFlow/WebFlow";
import useAuthStore from "./store/AuthStore/authStore";
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
    <>
      <Header></Header>
      <Alerts />
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<ProtectedRoute><WebFlow /></ProtectedRoute>}>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          {/* <Route path="transactions" element={<IDBTransaction />} /> */}
          <Route path="about" element={<About />} />
          <Route path="edit" element={<UpdateUserProfile />} />
          <Route path="profile" element={<ViewUserProfile />} />
          <Route path='/accountsPage' element={<AccountPage />}></Route>
          <Route path="/products" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        </Route>
      </Routes>

    </>
  );
}
